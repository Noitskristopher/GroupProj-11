const { response } = require('express')

const Symptoms = require('../models/PatientSymptoms')

const jwt = require('jsonwebtoken')

module.exports = {
    //Create with User
    createTicket: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            const user_id = decodedJwt.payload._id
            console.log('USER_ID', user_id);
            const ticket = req.body
            ticket['user_id'] = user_id
            const completedTicket = await Symptoms.create(ticket)
            console.log(completedTicket)
            res.json(completedTicket)
        }
        catch (err) {
            res.status(500).json({ message: 'Something went wrong updating', error: err })
        }
    },

    //Read
    allTickets: (req, res) => {
        Symptoms.find()
            .then((allTickets) => {
                res.json(allTickets)

            })
            .catch((err) => {
                res.status(500).json({ message: 'Something went wrong reading', error: err })
            })
    },
    // Read all for particular user
    allTicketsbByLoggedInUser: async (req, res) => {
        try {
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true })
            const user_id = decodedJwt.payload._id
            const allTicketsbByLoggedInUser = await Symptoms.find({ user_id: user_id })
            console.log(allTicketsbByLoggedInUser)
            res.json(allTicketsbByLoggedInUser)
        }
        catch (err) {
            res.status(500).json({ message: 'Something went wrong reading', error: err })
        }
    },
    oneTicket: (req, res) => {
        Symptoms.findOne({ _id: req.params.id })
            .then((oneTicket) => {
                res.json(oneTicket)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Something went wrong reading', error: err })
            })
    },
    //Update
    updateTicket: (req, res) => {
        Symptoms.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(updatedTicket => {
                res.json(updatedTicket)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Something went wrong updating', error: err })
            })
    },
    //Delete
    deleteTicket: (req, res) => {
        Symptoms.deleteOne({ _id: req.params.id })
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Something went wrong deleting', error: err })
            })
    }
}