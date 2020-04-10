const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl()

io.on('connection', (client) => {
    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket()
        console.log(nextTicket)
        callback(nextTicket)
    });

    //emit current ticket
    client.emit('currentTicket', {
        current: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    })

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return {
                ok: false,
                message: 'desktop is required!'
            }
        }
        let attendTicket = ticketControl.attendTicket(data.desktop)

        callback(attendTicket)

        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        })
    })
});