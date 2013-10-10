/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 19/09/13
 * Time: 10:21
 * To change this template use File | Settings | File Templates.
 */
function Geometrique(c)
{
    this.context = c ;
    this.square = square ;
    this.cercle = cercle ;
    function square(positionX , positionY ,width   , height , colorIn)
    {
        this.context.beginPath();
        this.context.fillStyle=colorIn ;
        this.context.fillRect(positionX , positionY , width ,height) ;
        this.context.stroke() ;
    }

    function cercle(centerX , centerY , radian , colorIn , colorOut )
    {
        this.context.beginPath();
        this.context.arc(centerX , centerY , radian , 0 , 2*Math.PI , false) ;
        this.context.fillStyle=colorIn ;
        this.context.fill() ;
        this.context.strokeStyle = colorOut ;
        this.context.stroke() ;

    }
}


