import React, {useState} from 'react'
import axios from 'axios'
import {link} from 'react-router-dom'
import Nav from '../components/Nav'

const Home = () => {
    const [painLocation, setPainLocation] = useState("")
    const [painDuration, setPainDuration] = useState("")
    const [painLevel, setPainLevel] = useState("")
    const [currentMeds, setCurrentMeds] = useState("")
    const [appointmentDate, setAppointmentDate] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/ticket/new",{
            painLocation,
            painDuration,
            painLevel,
            currentMeds,
            appointmentDate
        })
        .then((res) => {
            console.log(res)
            console.log(res.data)
            setPainLocation(""),
            setPainDuration(""),
            setPainLevel(""),
            setCurrentMeds(""),
            setAppointmentDate("")
        })
        .catch((err)=>{
            console.log(err)
        })
}

    return (
    <div>
        <div>
            <Nav/>
        </div>
        <form onSubmit={submitHandler}>
            <div>
                <label>What's hurting?</label>
                <input onChange={(e) = setPainLocation(e.target.value)}
                value={painLocation}
                type="text"></input>
            </div>
            <div>
                <label>How long has it been hurting?</label>
                <input onChange={(e) = setPainLocation(e.target.value)}
                value={painDuration}
                type="text"></input>
            </div>    <div>
                <label>Pain level?</label>
                <input onChange={(e) = setPainLocation(e.target.value)}
                value={painLevel}
                type="text"></input>
            </div>    <div>
                <label>Any current medications?</label>
                <input onChange={(e) = setPainLocation(e.target.value)}
                value={currentMeds}
                type="text"></input>
            </div>
            <div>
                <label>Appointment date</label>
                <input onChange={(e) = setPainLocation(e.target.value)}
                value={appointmentDate}
                type="date"></input>
            </div>
        </form>
    </div>
    )
}

export default Home