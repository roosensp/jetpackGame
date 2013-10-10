
function personnage(positionX , positionY , c)
 {
     this.name = "4242" ;
     this.context = c ;
     this.x = positionX ;
     this.y = positionY ;
     this.mapX =  positionX - 200 ;
     this.mapY = positionY ;
     this.score = 0 ;
     this.vitesseX = 0 ;
     this.vitesseY = 4  ;
     this.width = 20 ;
     this.height = 50 ;
     this.gun = new Gun();
     this.life = 5 ;
     this.team = "blue" ;

     // methodes
     this.afficher = afficher ;
     this.supprimer = supprimer ;
     this.shoot = shoot ;
     this.aie = aie ;

     function supprimer()
     {
         this.context.clearRect(this.x, this.y , this.width , this.height);
     }

     function aie()
     {
         this.life += -1 ;
     }

     function afficher()
     {
         square = new Geometrique(this.context) ;
         square.square(this.x, this.y, this.width, this.height, "green") ;
     }
     function shoot(mouseX , mouseY )
     {
         var puissance = 15 ;
         var angle = Math.atan2(this.x-mouseX, this.y-mouseY)   ;
         var dx    = puissance*Math.sin(angle);
         var dy    = puissance*Math.cos(angle);


         var o = new Bullet(this.mapX , (this.mapY +2)  , this.context  )  ;
         o.width = 10 ;
         o.height = 10 ;
         o.vitesseX = dx ;
         o.vitesseY = dy ;

        return o ;
     }
}
