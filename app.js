var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static('public'))

var ipList = [];

io.on('connection', function (socket) {

    var newIp = checkIfIpAlreadyExist(socket.handshake.address)

    if (newIp) {

        //Send to all listners except this
        socket.broadcast.emit('new_ip', {new_ip: newIp});

        //send message only to sender-client
        socket.emit('ip_list', {list : ipList});

        //io.emit('new_ip', {new_ip: newIp});
    }

    //if it is new all
    //then
    //this new ip should get full ipList
    //and
    //all others except this ip shoule get single new ip add

    socket.on('disconnect', function () {
        removeDisconnectedIps(socket.handshake.address)
        io.emit('remove_disconnected_ip', {removed: socket.handshake.address});
    });

});


function checkIfIpAlreadyExist(ip) {

    function isItThere(value) {
        return value == ip;
    }

    var filtered = ipList.filter(isItThere);
    if (filtered.length == 0) {
        ipList.push(ip)
        return ip;
    }
}

function removeDisconnectedIps(ip) {
    ipList.forEach(function (listip, index) {
        if (listip == ip) {
            ipList.splice(index, 1);
        }
    })

    console.log('Final list ' + JSON.stringify(ipList))
}
