const symptomController = require('../controllers/symptom.controller')

module.exports = app => {
    //Create
    app.post('/api/ticket/new',symptomController.createTicket)
    //Read
    app.get('/api/tickets', symptomController.allTickets)
    app.get('/api/ticket/:id', symptomController.oneTicket)
    //Update
    app.put('/api/ticket/:id/edit',symptomController.updateTicket)
    //Delete
    app.delete('/api/ticket/:id',symptomController.deleteTicket)

}