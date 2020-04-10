// inicialize socket
var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('connected to server')
})

socket.on('disconnect', () => {
    console.log('disconnected')
})

socket.on('currentTicket', (res) => {
    label.text(res.current)
})

$('button').on('click', () => {
    socket.emit('nextTicket', (res) => {
        console.log(res)
    }, function(res){
        console.log('resServer', res)
        label.text(res)
    })
})