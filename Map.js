/**
 * Created with JetBrains WebStorm.
 * User: paulroosens
 * Date: 19/09/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
function Map(x , y ,c)
{
    /*
     Attributes
     */
    this.context = c ;
    this.viewX ;
    this.viewY ;
    this.refDepartX = x ;
    this.refDepartY = y ;
    this.screenW = 600 ;
    this.screenH = 600 ;
    this.blocs = new Array();



    /*
    Functions
     */
    this.blocsquare = blocsquare ;



    // blocs depart equipe bleu
    this.blocsquare(0    , 400 , 200 , 600 , "brown" )  ;

    // blocs depart equipe rouge
    this.blocsquare(2800 , 400 , 200 , 600 , "brown" )  ;

    // pti blocs au millieu
    this.blocsquare( 400 ,  700 , 50  , 100 , "brown" )  ;
    this.blocsquare( 600 ,  700 , 50  , 100 , "brown" )  ;
    this.blocsquare( 800 ,  700 , 50  , 100 , "brown" )  ;
    this.blocsquare( 1000 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 1200 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 1400 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 1600 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 1800 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 2000 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 2200 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 2400 , 700 , 50 , 100 , "brown" )  ;
    this.blocsquare( 2600 , 700 , 50 , 100 , "brown" )  ;

    // bloc au millieu
    this.blocsquare(1000 , 400 , 1000 , 100  , "brown" )  ;

    //pti bloc sur le bloc du millieu
    this.blocsquare(1000 , 350 , 30 , 50  , "brown" )  ;
    this.blocsquare(1400 , 350 , 30 , 50  , "brown" )  ;
    this.blocsquare(1600 , 350 , 30 , 50  , "brown" )  ;
    this.blocsquare(1970 , 350 , 30 , 50  , "brown" )  ;

    //staltique millieu
    this.blocsquare(1485 , 0 , 30 , 200  , "brown" )  ;


   /*
   Conteneurs
    */
    //dalle
    this.blocsquare(0    , 800 , 3000 , 200 , "brown" ) ;

    // plafond
    this.blocsquare(0    , 0 , 3000   , 20 , "brown" ) ;
    // mur gauche
    this.blocsquare(0    , 0 , 20     , 800 , "brown" ) ;
    // mur droite
    this.blocsquare(2980    , 0 , 20  , 800 , "brown" ) ;



    function blocsquare(positionX , positionY ,width   , height , colorIn  )
    {
        this.blocs.push({NX:positionX , NY:positionY , NWidth:width , NHeight:height})   ;

        var NX = 0 ;
        var NY = 0 ;
        var NWidth = 0 ;
        var NHeight = 0 ;
        var out = false ;

        // X

        NX = positionX - this.refDepartX ;

        if(NX == 0)
        {
            NWidth =  width ;
        }
        if(NX < 0 )
        {

            NWidth  = width + NX ;
            NX = 0 ;
        }
        if(NX>0)
        {
            NWidth = width ;
        }
        if(NX>this.screenW || NWidth <= 0)
        {
            out = true ;

        }
        // Y
        if(!out)
        {
            NY = positionY - this.refDepartY ;

            if(NY == 0)
            {

                NHeight = height ;
            }
            if(NY<0)
            {

                NHeight = height + NY  ;
                NY = 0 ;
            }
            if(NY > 0 )
            {

                NHeight = height ;
            }
            if(NY>this.screenH  || NHeight<=0 )
            {
                out = true ;

            }

        }

        if(!out)
        {
          //  this.blocs.push({NX:NX , NY:NY , NWidth:NWidth , NHeight:NHeight})   ;
            //  alert(this.blocs);
            s = new Geometrique( this.context) ;
            s.square(NX   ,NY , NWidth , NHeight , "brown")  ;
        }
    }



}


/////////////////
////////////////