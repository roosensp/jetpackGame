    /**
     * Created with JetBrains WebStorm.
     * User: paulroosens
     * Date: 03/10/13
     * Time: 13:52
     * To change this template use File | Settings | File Templates.
     */
    // We need to use the express framework: have a real web server that knows how to send mime types etc.
    var express=require('express');

    // Init globals variables for each module required
    var app = express()
        , http = require('http')
        , server = http.createServer(app)
        , io = require('socket.io').listen(server);

    // Indicate where static files are located
    app.configure(function () {
        app.use(express.static(__dirname + '/'));
    });

    // launch the http server on given port
    server.listen(8080);

    // routing
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/simpleChat.html');
    });

    // usernames which are currently connected to the chat
    var usernames = {};
    var premierJoueur = true ;
    var allSockets = new Array() ;

    io.sockets.on('connection', function (socket) {

        // when the client emits 'sendchat', this listens and executes
        socket.on('sendPlayersPosition', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters

          //  io.sockets.broadcast.emit('updatePlayersPosition', socket.username, data);
            io.sockets.emit('updatePlayersPosition', socket.username, data);
        });

        socket.on('sendShoot', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters

            io.sockets.emit('updateShoot', socket.username, data);
        });


        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters

            io.sockets.emit('updatechat', socket.username, data);
        });



        socket.on('adduser', function(username){

            var allreadyTake = false ;

            for( var name in usernames)
            {
               if(name == username)
               {
                   allreadyTake = true ;
                   break ;
               }
            }
            if(allreadyTake)
            {
                socket.emit("NameNotAvailable" , username);
            }else
            {

                if(premierJoueur)
                {
                    socket.username = username;
                    io.sockets.sockets[username] =  socket.id ;
                    //  allSockets[username] = socket.id ;

                    usernames[username] = username;
                    premierJoueur = false ;
                    socket.emit("validation" , username ) ;

                    socket.emit("start" , "") ;
                }else
                {
                    console.log("NON SERIEUX ?? " + usernames.length) ;
                    socket.username = username;
                    io.sockets.sockets[username] =  socket.id ;
                    usernames[username] = username;
                    socket.emit("validation" , username ) ;
                    needAllPlayerPosition(username) ;

                }

//                // echo to client they've connected
//                socket.emit('updatechat', 'SERVER', 'you have connected');
//                // echo globally (all clients) that a person has connected
//                socket.emit('updatechat', 'SERVER', username + ' has connected');
//                // update the list of users in chat, client-side
//                io.sockets.emit('updateusers', usernames);
            }

        });
        socket.on('needAllPlayersPosition' , function(username)
        {
            // envoyer que a un ancien
            needAllPlayerPosition(username) ;
            /*
            A CHANGER amélioration <= envoyer au MASTER
             */
         //  io.sockets.emit('giveMeYourPlayers' , username) ;

        });
        socket.on('sendAllPlayer' , function(username , data)
        {
            for(var n in usernames)
            {
                if(n == username)
                {
                    var sock_id = io.sockets.sockets[n] ;
                    io.sockets.sockets[sock_id].emit('allPlayers'  , data) ;
                    break ;
                }
            }


        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function(){
            // remove the username from global usernames list
            delete usernames[socket.username];
            // update list of users in chat, client-side
            io.sockets.emit('updateusers', usernames);
            // echo globally that this client has left
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        });
    });

    function needAllPlayerPosition(username)
    {
        for( var s in usernames)
        {

            var sock_id = io.sockets.sockets[s] ;
            console.log(" USERNAME => " + username + " ID SOCKET => "+sock_id) ;
            io.sockets.sockets[sock_id].emit("giveMeYourPlayers", username);
            break ;
        }
    }