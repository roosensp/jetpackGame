/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 24/09/13
 * Time: 20:53
 * To change this template use File | Settings | File Templates.
 */

function PartyLocal( socket)
{
    this.canvas = document.getElementById('myCanvas') ;
    this.context = this.canvas.getContext('2d') ;
    this.p = new personnage(300, 300 , this.context) ;
    this.joueurs = new Array() ;
    this.shoots = new Array() ;
    this.viewX = -200 ;
    this.viewY = 0 ;
    this.map = new Map(this.viewX , this.viewY , this.context) ;
    this.mousePositionX = 0 ;
    this.mousePositionY = 0 ;
    this.socket = socket ;

    // methodes
    this.start = start ;
    this.gestionPersonnage = gestionPersonnage ;
    this.limiterMouvementY  = limiterMouvementY ;
    this.gestionShoot = gestionShoot ;
    this.updatePositionPerso = updatePositionPerso ;
    this.updatePlayers = updatePlayers ;
    this.gestionAutreJoueur = gestionAutreJoueur ;
    this.sendYourShoot = sendYourShoot ;
    this.addShoot = addShoot ;
    this.sendAllThePlayers = sendAllThePlayers ;
    this.updateAllPlayers = updateAllPlayers ;

    this.choixEquipe  = choixEquipe ;

    Array.prototype.unset = function(index){
        if(index > -1){
            this.splice(index,1)
        }
    }


    function start()
    {
          this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
          this.map = new Map(this.viewX , this.viewY , this.context ) ;
          this.gestionPersonnage() ;
          this.gestionShoot() ;
        //  this.p.afficher() ;
          this.gestionAutreJoueur() ;
          window.requestAnimationFrame($.proxy(function() {this.start()}, this) )  ;
    }



    function gestionPersonnage()
    {

        limitM =  this.limiterMouvementY((this.viewX +this.p.vitesseX) ,this.viewY + this.p.vitesseY  ) ;

        // mise a jours position perso sur Serveur
        if(this.p.vitesseX > 0 )
        {

        }
        if (limitM == 1)
        {

            this.viewY  += this.p.vitesseY ;
            this.p.mapY += this.p.vitesseY ;
            if(this.p.vitesseY != 0 )
            {
                this.updatePositionPerso();
            }
        }
        if (limitM == 2)
        {


            this.viewX += this.p.vitesseX ;
            this.p.mapX +=  this.p.vitesseX  ;
            if(this.p.vitesseX != 0 )
            {
                this.updatePositionPerso() ;
            }
        }
        if (limitM == 0)
        {



            this.viewY   += this.p.vitesseY ;
            this.p.mapY  += this.p.vitesseY ;
            this.viewX   += this.p.vitesseX ;
            this.p.mapX  += this.p.vitesseX  ;
            if(this.p.vitesseY != 0 || this.p.vitesseX != 0 )
            {
                this.updatePositionPerso();
            }
        }

        if (limitM == 3)
        {

           // this.p.vitesseY = 0 ;
           // this.p.vitesseX = 0 ;

        }
    }

    function limiterMouvementY(potentielX , potentielY)
    {
          var rep = 0 ;
          for(var i = 0 ; i< this.map.blocs.length ; i++)
          {
              if((this.map.blocs[i].NY < (this.p.mapY + this.p.vitesseY + this.p.height) &&  (this.map.blocs[i].NY + this.map.blocs[i].NHeight)> (this.p.mapY +  this.p.vitesseY) ) &&
                (this.map.blocs[i].NX < (this.p.mapX + this.p.vitesseX + this.p.width) &&  (this.map.blocs[i].NX + this.map.blocs[i].NWidth)> (this.p.mapX +this.p.vitesseX))  )
             {

                 if((this.map.blocs[i].NY < (this.p.mapY  + this.p.height) &&  (this.map.blocs[i].NY + this.map.blocs[i].NHeight)> (this.p.mapY) ) &&
                     (this.map.blocs[i].NX < (this.p.mapX + this.p.vitesseX + this.p.width) &&  (this.map.blocs[i].NX + this.map.blocs[i].NWidth)> (this.p.mapX +this.p.vitesseX))  )
                 {
                        // no Y vitess
                         rep =  1 ;
                 }
                 if((this.map.blocs[i].NY < (this.p.mapY + this.p.vitesseY + this.p.height) &&  (this.map.blocs[i].NY + this.map.blocs[i].NHeight)> (this.p.mapY +  this.p.vitesseY) ) &&
                     (this.map.blocs[i].NX < (this.p.mapX  + this.p.width) &&  (this.map.blocs[i].NX + this.map.blocs[i].NWidth)> (this.p.mapX ))  )
                 {
                     if(rep == 1)
                     {
                         return 3 ;
                     }
                     rep =  2 ;
                 }
             }
          }
        return rep ;

    }
    function gestionShoot()
    {
        // gestion SHoot
        for (var i = 0 ; i<this.shoots.length ; i++)
        {
            var shootDel = false ;
            for(var j = 0 ; j < this.map.blocs.length ; j++)
            {
                if((this.map.blocs[j].NY < (this.shoots[i].y + this.shoots[i].vitesseY + this.shoots[i].height) &&  (this.map.blocs[j].NY + this.map.blocs[j].NHeight)> (this.shoots[i].y +  this.shoots[i].vitesseY) ) &&
                    (this.map.blocs[j].NX < (this.shoots[i].x + this.shoots[i].vitesseX + this.shoots[i].width) &&  (this.map.blocs[j].NX + this.map.blocs[j].NWidth)> (this.shoots[i].x +this.shoots[i].vitesseX))  )
                {
                    shootDel = true ;
                    break ;
                }
            }

            for(var j = 0 ; j < this.joueurs.length ; j++)
            {

                if((this.joueurs[j].mapY < (this.shoots[i].y + this.shoots[i].vitesseY + this.shoots[i].height) &&  (this.joueurs[j].mapY + this.joueurs[j].height)> (this.shoots[i].y +  this.shoots[i].vitesseY) ) &&
                    (this.joueurs[j].mapX < (this.shoots[i].x + this.shoots[i].vitesseX + this.shoots[i].width) &&  (this.joueurs[j].mapX + this.joueurs[j].width)> (this.shoots[i].x +this.shoots[i].vitesseX))  )
                {

                    if(this.joueurs[j].name != this.shoots[i].tireur.name)
                    {
                        this.joueurs[j].aie() ;

                        if(this.joueurs[j].life <= 0 )
                        {
                            if(this.joueurs[j].name == this.p.name)
                            {
                                alert(" BOUUUU t'es mort ") ;
                            }else
                            {
                                alert(this.joueurs[j].name + " is dead ") ;
                            }

                            this.joueurs.unset(j) ;
                            j += -1 ;
                        }
                        shootDel = true ;
                        break ;
                    }

                }


            }


            if(!shootDel)
            {
                this.shoots[i].x =  this.shoots[i].x -     this.shoots[i].vitesseX ;
                this.shoots[i].y =  this.shoots[i].y -     this.shoots[i].vitesseY ;
                this.shoots[i].afficher(this.viewX , this.viewY) ;
            }else
            {
                this.shoots.unset(i) ;
                i = i -1 ;
            }

        }
    }

    function gestionAutreJoueur()
    {
        bloc = new blocsquare(this.context) ;
        for(var i = 0 ; i< this.joueurs.length ; i++)
        {
            // verifier joueur visibilité map
         //   this.map.blocsquare( this.joueurs[i].mapX   , this.joueurs[i].mapY, this.joueurs[i].width , this.joueurs[i].height ) ;
            console.log("COLOR => " +this.joueurs[i].team  )
            bloc.makeSquare(this.joueurs[i].mapX   , this.joueurs[i].mapY, this.joueurs[i].width , this.joueurs[i].height , this.joueurs[i].team , this.viewX , this.viewY) ;
        }
    }
    function updatePositionPerso()
    {
        //  console.log(" JOUEUR POSITION X => " + this.joueurs[0].mapX + " JOUEUR POSITION Y => "  + this.joueurs[0].mapY )
        var data ;
        data = { x: this.p.mapX , y: this.p.mapY , team: this.p.team} ;

        this.socket.emit('sendPlayersPosition', data);
    }
    function sendYourShoot(bullet)
    {
        var data ;
        data = {  vitesseX: bullet.vitesseX , vitesseY: bullet.vitesseY , x: bullet.x , y:bullet.y }        ;
        this.socket.emit('sendShoot' , data ) ;
    }

    function addShoot(x , y , vX , vY , username)
    {
        var o = new Bullet(x ,  y+2  , this.context  )  ;
        for(var i = 0 ;  i< this.joueurs.length ; i++)
        {
            if(this.joueurs[i].name == username )
            {
                o.tireur =    this.joueurs[i] ;
            }
        }


        o.width = 10 ;
        o.height = 10 ;
        o.vitesseX = vX ;
        o.vitesseY = vY ;
        this.shoots.push(o) ;

    }
    function sendAllThePlayers( playerWhoAsking)
    {

        var data =  new Array() ;

        for(var i = 0 ; i< this.joueurs.length ; i++)
        {
            data.push({name: this.joueurs[i].name  , x: this.joueurs[i].mapX  , y: this.joueurs[i].mapY , team: this.joueurs[i].team})

        }

        this.socket.emit ('sendAllPlayer' , playerWhoAsking , data) ;

    }

    function updateAllPlayers(data)
    {

         for(  var i = 0 ; i<data.length ; i++)
         {

             this.updatePlayers(data[i].name , data[i].x , data[i].y , data[i].team) ;
         }
    }
    function updatePlayers(namePlayer , x , y ,team)
      {
          if(namePlayer != null)
          {
              trouver = false ;
             for(var i = 0 ; i < this.joueurs.length ; i++)
             {
                if(namePlayer == this.joueurs[i].name )
                {
                    this.joueurs[i].mapX = x ;
                    this.joueurs[i].mapY = y ;
                    this.joueurs[i].team = team ;
                    trouver = true ;
                }
             }
              if(!trouver)
              {
                 var player = new personnage(300 , 300 , this.context) ;
                  player.name = namePlayer ;
                  player.mapX = x ;
                  player.mapY = y ;
                  player.team = team ;

                 this.joueurs.push(player) ;

              }
          }


      }
    function choixEquipe()
    {
           if (this.joueurs.length == 1 || this.joueurs.length == 3 )
           {
               this.p.mapX = 2900 ;
               this.p.mapY = 300 ;
               this.viewX = 2600 ;
               this.p.team = "yellow" ;
           }
    }

}