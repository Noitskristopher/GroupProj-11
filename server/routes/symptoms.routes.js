const symptomController = require('../controllers/symptom.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    //Create
    app.post('/api/ticket/new', symptomController.createTicket)
    app.get('/api/albumsByLoggedInUser', authenticate, symptomController.allTicketsbByLoggedInUser)
    //Read
    app.get('/api/tickets', authenticate, symptomController.allTickets)
    app.get('/api/ticket/:id', symptomController.oneTicket)
    //Update
    app.put('/api/ticket/:id/edit', symptomController.updateTicket)
    //Delete
    app.delete('/api/ticket/:id', symptomController.deleteTicket)

}