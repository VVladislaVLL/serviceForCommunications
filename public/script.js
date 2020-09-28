const videoGrid = document.getElementById('video-grid')
const peerPort = videoGrid.dataset.port
const ROOM_ID = videoGrid.dataset.roomid
const socket = io('/')
const myPeer = new Peer(undefined, {
    host: '/',
    port: peerPort
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
}).catch()

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


// socket.on('user-connected', userId => {
//     // console.log('User: ' + userId)
// })

socket.on('user-disconnected', userId => {
    if (peers[userId]) {
        peers[userId].close()
    }
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}