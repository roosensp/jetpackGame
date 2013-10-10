

/*
Lancer la partie
 */

// on connection to server, ask for user's name with an anonymous callback
var socket = io.connect();
socket.on('connect', function(){
    socket.emit('adduser', prompt("What's your name?"));
});

socket.on('NameNotAvailable', function(username){
    alert("the name "+username+" is not available ") ;
});
   //
socket.on('allPlayers', function(data){


    party.updateAllPlayers(data) ;

    party.choixEquipe() ;
    party.start () ;
});

socket.on('giveMeYourPlayers' , function(username){
    party.sendAllThePlayers(username) ;
} ) ;
socket.on('validation', function(username){
    // call the server-side function 'adduser' and send one parameter (value of prompt)

   party.p.name = username ;

  // party.socket.emit ('needAllPlayersPosition' ,  party.p.name) ;
});
// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {


    $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});
socket.on('start', function (e) {
    alert("START ") ;
    party.start() ;
});
socket.on('updatePlayersPosition', function (username, data) {

    if(username != 4242)
    {
        party.updatePlayers(username , data.x , data.y , data.team ) ;
    }


});
socket.on('updateShoot', function (username, data) {


    party.addShoot(data.x , data.y , data.vitesseX , data.vitesseY , username) ;


});
// listener, whenever the server emits 'updateusers', this updates the username list
socket.on('updateusers', function(data) {


});

party = new PartyLocal(socket) ;
//party.start();

 // we might pass the URL of the WS server as parameter here



// on load of page
$(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});


/*
Events
 */
document.onkeydown=pressKey;
document.onkeyup=stopPressDown;
document.onclick = click;
document.onmousemove = mouseMove ;


// click pour tirer
function click()
{
    b =  party.p.shoot( party.mousePositionX , party.mousePositionY ) ;
  //  party.shoots.push(b) ;
    party.sendYourShoot(b) ;

}


/*
Mouvement tirer pour diriger le tir
 */
 function mouseMove(evt) {

    var mousePos = getMousePos(party, evt);
     party.mousePositionX   = mousePos.x ;
     party.mousePositionY = mousePos.y ;
}

/*
Recuper la position de la souris
 */
function getMousePos(canvas, evt) {
    // get canvas position
    var obj = party.canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x:mouseX,
        y:mouseY
    };
}


/*
Toucher events
Pour faire bouger le joueur
 */
function pressKey(e){

    var arrs= [], key= window.event? event.keyCode: e.keyCode;
    arrs[37]= 'left';
    arrs[38]= 'up';
    arrs[39]= 'right';
    arrs[40]= 'down';
    arrs[32]= 'espace' ;
    arrs[81]= 'left';
    arrs[90]= 'up';
    arrs[68]= 'right';
    arrs[83]= 'down';

   // alert(key) ;


    if(arrs[key] == 'left') {
        party.p.vitesseX = -6 ;
    }
    if(arrs[key] == 'right') {
        party.p.vitesseX = 6 ;
    }
    if(arrs[key] == 'up') {
        party.p.vitesseY = -6 ;
    }
    if(arrs[key] == 'down') {
        party.p.vitesseY = 6 ;
    }
    if(arrs[key] == 'espace') {
        party.shoots.push(party.p.shoot()) ;
    }
 //   alert('<b> Joueur 1  X=> '+party.p.x + ' Y=> '+ party.p.y +' <br>') ;

      //  $('#conversation').append('<b> Joueur 1  X=> '+party.p.mapX + ' Y=> '+ party.p.mapY +' <br>');
 //   socket.emit('sendchat', '<b> Joueur 1  X=> '+party.p.mapX + ' Y=> '+ party.p.mapY +' <br>');
}


/*
 Toucher events
  quand on lache la touche
 */
function stopPressDown()
{
    var arrs= [], key= window.event? event.keyCode: e.keyCode;
    arrs[37]= 'left';
    arrs[38]= 'up';
    arrs[39]= 'right';
    arrs[40]= 'down';
    arrs[81]= 'left';
    arrs[90]= 'up';
    arrs[68]= 'right';
    arrs[83]= 'down';


    if(arrs[key] == 'left') {
        party.p.vitesseX = 0 ;
    }
    if(arrs[key] == 'right') {
        party.p.vitesseX = 0 ;
    }
    if(arrs[key] == 'up') {
        party.p.vitesseY = 0 ;
        party.p.vitesseY = 4 ;
    }
    if(arrs[key] == 'down') {
        party.p.vitesseY = 4 ;
    }
}






        