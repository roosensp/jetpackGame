/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 24/09/13
 * Time: 10:09
 * To change this template use File | Settings | File Templates.
 */
function blocsquare( c )
{


    this.NX = 0 ;
    this.NY = 0 ;
    this.NWidth = 0 ;
    this.NHeight = 0 ;
    this.out = false ;
    this.makeSquare = makeSquare ;
    this.context =  c ;


    // X

    function makeSquare(positionX , positionY ,width   , height , colorIn , refDepartX , refDepartY)
    {
       //  console.log( colorIn) ;
        this.out = false ;

        this.NX = positionX - refDepartX ;

        if(this.NX == 0)
        {
            this.NWidth =  width ;
        }
        if(this.NX < 0 )
        {
            this.NWidth  = width + this.NX ;
            this.NX = 0 ;
        }
        if(this.NX>0)
        {
            this.NWidth = width ;
        }
        if(this.NX>this.screenW || this.NWidth <= 0)
        {
            this.out = true ;
        }
        // Y
        if(!this.out)
        {
            this.NY = positionY - refDepartY ;

            if(this.NY == 0)
            {
                this.NHeight = height ;
            }
            if(this.NY<0)
            {

                this.NHeight = height + this.NY  ;
                this.NY = 0 ;
            }
            if(this.NY > 0 )
            {

                this.NHeight = height ;
            }
            if(this.NY>this.screenH  || this.NHeight<=0 )
            {
                this.out = true ;

            }

        }

        if(!this.out)
        {
            //  alert(this.blocs);

            var  s = new Geometrique( this.context) ;
            if(this.NWidth>0 && this.NHeight>0)
            {

                s.square(this.NX   ,this.NY , this.NWidth , this.NHeight , colorIn)  ;

            }

        }
    }

}