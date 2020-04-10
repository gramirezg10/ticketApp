// inicialize socket
var socket = io();

var searchParams = new URLSearchParams(window.location.search)
var lblSmall = $('small')
if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('Desktop is required')
}

var desktop = searchParams.get('escritorio')
$('h1').text('Escritorio ' + desktop)

$('button').on('click', function () {
    socket.emit('attendTicket', { desktop: desktop }, function (res) {
        if (res.message === 'No tickets to attend') {
            lblSmall.text(res.message)
            alert(res.message)
            return;
        }
        lblSmall.text('ticket ' + res.number)
    })
})