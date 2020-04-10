const fs = require('fs')


class Ticket {
    constructor(ticketNumber, desktop) {
        this.number = ticketNumber
        this.desktop = desktop
    }
}


class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = []
        this.last4 = []

        let data = require('../data/data')

        if (this.today === data.today) {
            this.lastTicket = data.lastTicket
            this.tickets = data.tickets
            this.last4 = data.last4
        } else {
            this.restartCount()
        }
    }

    nextTicket() {
        this.lastTicket += 1
        let ticket = new Ticket(this.lastTicket, null)
        this.tickets.push(ticket)
        this.updateFile()
        return `Ticket ${this.lastTicket}`
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`
    }

    getLast4(){
        return this.last4
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return {
                ok: false,
                message: 'No tickets to attend'
            }
        }
        let ticketNumber = this.tickets[0].number
        this.tickets.shift()
        
        let attend = new Ticket(ticketNumber, desktop)

        this.last4.unshift(attend)
        if (this.last4.length > 4) {
            this.last4.splice(-1, 1)
        }
        console.log('last 4 --> ', this.last4)

        this.updateFile()
        return attend
    }

    restartCount() {
        this.lastTicket = 0
        this.tickets = []
        this.last4 = []
        this.updateFile()
        console.log('started a new day')
    }

    updateFile() {
        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4

        }
        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }
}

module.exports = {
    TicketControl
}