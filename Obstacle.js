/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 19/09/13
 * Time: 09:49
 * To change this template use File | Settings | File Templates.
 */

function Obstacle(x , y , c )
{

    this.x = x ;
    this.y = y  ;
    this.context = c ;
    this.vitesseX = 4 ;
    this.vitesseY = 0 ;
    this.width = 20 ;
    this.height = 20 ;
    this.afficher = afficher ;
    this.toucher = toucher ;
    this.setVitesseX = setVitesseX ;
    this.blocsquare = new blocsquare(c) ;

    function afficher()
    {

        this.blocsquare.makeSquare(this.x , this.y , this.width , this.height , "black")  ;
     //   square = new Geometrique(this.context) ;
     //   square.square(this.x , this.y , this.width ,this.height , "black") ;
    }
    function toucher()
    {
        square = new Geometrique(this.context) ;
        square.square(this.x , this.y , this.width ,this.height , "red") ;
    }


    function setVitesseX(v)
    {
        this.vitesseX = v ;
    }
}