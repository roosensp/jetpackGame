/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 04/10/13
 * Time: 15:47
 * To change this template use File | Settings | File Templates.
 */
function Bullet(x , y ,c)
{

    this.tireur ;
    this.x = x ;
    this.y = y  ;
    this.context = c ;
    this.vitesseX = 4 ;
    this.vitesseY = 0 ;
    this.width = 20 ;
    this.height = 20 ;
    this.afficher = afficher ;
    this.toucher = toucher ;


    this.blocsquare = new blocsquare(this.context) ;

    function afficher(viewX, viewY)
    {

        this.blocsquare.makeSquare(this.x , this.y , this.width , this.height , "black" , viewX , viewY)  ;
    }
    function toucher()
    {
        square = new Geometrique(this.context) ;
        square.square(this.x , this.y , this.width ,this.height , "red") ;
    }


}