const mongoose = require('mongoose');

const PatientSymptomsSchema = new mongoose.Schema({
    painLocation:{
        type: String,
        required:[true, 'Must complete field'],
        minLength:[3, 'Must be at least 3 characters'],
    },
    painDuration:{
        type: String,
        required:[true, 'Must complete field'],
        minLength:[3, 'Must be at least 3 characters']
        
    },
    painLevel:{
        type: Number,
        required:[true, 'Must complete field'],
        min:[1, 'Pain level must be at least 1'],
        max:[10, 'Pain level must not exceed 10']
        
    },
    currentMeds:{
        type: String,
        
    },
    appointmentDate:{
        type: Date,
        required:[true, 'Must complete field'],
        min: ['2023-03-30', 'Date must be in the future!']
        
    }
},  {timestamps: true})

const PatientSymptoms = mongoose.model('PatientSymptoms' , PatientSymptomsSchema);

module.exports = PatientSymptoms;