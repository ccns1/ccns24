var getUserMedia = require('getusermedia')
var Peer = require('simple-peer')

getUserMedia({
    video: true,
    audio: true
}, function(err, stream) {
    if (err) return console.error(err)



    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })

    peer.on('signal', function(data) {
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function() {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })
    document.getElementById('disconnect').addEventListener('click', function() {
        peer.destroy()
    })
    peer.on('close', function() {
        document.getElementById('messages').textContent += '*CONNECTION TERMINATED*' + '\n'
    })

    document.getElementById('send').addEventListener('click', function() {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
        document.getElementById('messages').textContent += 'you: ' + yourMessage + '\n'
    })

    peer.on('data', function(data) {
        document.getElementById('messages').textContent += 'friend: ' + data + '\n'
    })

    peer.on('stream', function(stream) {
        console.log('usao u stream jebemu leba')
        var video = document.createElement('video')
        document.body.appendChild(video)
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play()
        }
    })
})