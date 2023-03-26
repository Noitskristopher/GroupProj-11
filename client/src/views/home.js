import React, { useState } from 'react'
import axios from 'axios'
import { link } from 'react-router-dom'

const Home = (props) => {
    const [painLocation, setPainLocation] = useState("");
    const [painDuration, setPainDuration] = useState("");
    const [painLevel, setPainLevel] = useState("");
    const [currentMeds, setCurrentMeds] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/ticket/new", {
            painLocation,
            painDuration,
            painLevel,
            currentMeds,
            appointmentDate,
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setPainLocation("");
                setPainDuration("");
                setPainLevel("");
                setCurrentMeds("");
                setAppointmentDate("");
            })
            .catch((err) => {
                console.log(err)
                if (err.response.data.error) {
                    setErrors(err.response.data.error.errors)
                    console.log('^^Errors^^', errors)
                }
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>What's hurting?</label>
                    <div>
                        <input
                            onChange={(e) => setPainLocation(e.target.value)}
                            value={painLocation}
                            type="text" />
                        {
                            errors.painLocation ?
                                <p className='text-danger'>{errors.painLocation.message}</p> :
                                null
                        }
                    </div>
                </div>
                <div>
                    <label>How long has it been hurting?</label>
                    <div>
                        <input onChange={(e) => setPainDuration(e.target.value)}
                            value={painDuration}
                            type="text" />
                        {
                            errors.painDuration ?
                                <p className='text-danger'>{errors.painDuration.message}</p> :
                                null
                        }
                    </div>
                </div>
                <div>
                    <label>Pain level?</label>
                    <div>
                        <input onChange={(e) => setPainLevel(e.target.value)}
                            value={painLevel}
                            type="number" />
                        {
                            errors.painLevel ?
                                <p className='text-danger'>{errors.painLevel.message}</p> :
                                null
                        }
                    </div>
                </div>
                <div>
                    <label>Any current medications?</label>
                    <div>
                        <input onChange={(e) => setCurrentMeds(e.target.value)}
                            value={currentMeds}
                            type="text" />
                    </div>
                </div>
                <div>
                    <label>Appointment date</label>
                    <div>
                        <input onChange={(e) => setAppointmentDate(e.target.value)}
                            value={appointmentDate}
                            type="date" />
                        {
                            errors.appointmentDate ?
                                <p className='text-danger'>{errors.appointmentDate.message}</p> :
                                null
                        }
                    </div>
                </div>
                <button image='submit'> Submit</button>
            </form>
        </div>
    )
}

export default Home