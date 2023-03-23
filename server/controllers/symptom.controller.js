const { response } = require('express')

const Symptoms = require('../models/PatientSymptoms')

module.exports = {
    //Create
        createTicket: (req,res) => {
            Symptoms.create(req.body)
                .then((newTicket) => {
                    res.json(newTicket)
                })
                .catch((err) => {
                    res.status(500).json({message: 'Something went wrong creating', error: err})
                })
        },
        
    //Read
        allTickets: (req,res) => {
            Symptoms.find()
                .then((allTickets) => {
                    res.json(allTickets)
                    
                })
                .catch((err) => {
                    res.status(500).json({message: 'Something went wrong reading', error: err})
                })
        },
        oneTicket: (req,res) => {
            Symptoms.findOne({_id: req.params.id})
                .then((oneTicket) => {
                    res.json(oneTicket)
                })
                .catch((err) => {
                    res.status(500).json({message: 'Something went wrong reading', error: err})
                })
        },
    //Update
        updateTicket:(req,res) => {
            Symptoms.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then(updatedTicket => {
                res.json(updatedTicket)
            })
            .catch((err) => {
                res.status(500).json({message: 'Something went wrong updating', error: err})
            })
        },
    //Delete
        deleteTicket:(req,res) => {
            Symptoms.deleteOne({_id: req.params.id})
                .then((response) => {
                    res.json(response)
                })
                .catch((err) => {
                    res.status(500).json({message: 'Something went wrong deleting', error: err})
                })
        }
    }