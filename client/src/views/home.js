import React, { useState } from 'react'
import axios from 'axios'
import { link, useNavigate } from 'react-router-dom'

const Home = (props) => {
    const [painLocation, setPainLocation] = useState("");
    const [painDuration, setPainDuration] = useState("");
    const [painLevel, setPainLevel] = useState("");
    const [currentMeds, setCurrentMeds] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
                navigate('/myPortal')
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
        <div className='mx-auto w-50'>
            <h3 className='my-2'>PATIENT FORM</h3>
            <form onSubmit={submitHandler}>
                <div className='my-2'>
                    <label className='form-label'>What's hurting?</label>
                    <div>
                        <input
                            className='form-control'
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
                <div className='my-2'>
                    <label className='form-label'>How long has it been hurting?</label>
                    <div>
                        <input className='form-control' onChange={(e) => setPainDuration(e.target.value)}
                            value={painDuration}
                            type="text" />
                        {
                            errors.painDuration ?
                                <p className='text-danger'>{errors.painDuration.message}</p> :
                                null
                        }
                    </div>
                </div>
                <div className='my-2'>
                    <label className='form-label'>Pain level?</label>
                    <div>
                        <input className='form-control' onChange={(e) => setPainLevel(e.target.value)}
                            value={painLevel}
                            type="number" />
                        {
                            errors.painLevel ?
                                <p className='text-danger'>{errors.painLevel.message}</p> :
                                null
                        }
                    </div>
                </div>
                <div className='my-2'>
                    <label className='form-label'>Any current medications?</label>
                    <div>
                        <input className='form-control' onChange={(e) => setCurrentMeds(e.target.value)}
                            value={currentMeds}
                            type="text" />
                    </div>
                </div>
                <div className='my-2'>
                    <label className='form-label'>Appointment date</label>
                    <div>
                        <input className='form-control' onChange={(e) => setAppointmentDate(e.target.value)}
                            value={appointmentDate}
                            type="date" />
                        {
                            errors.appointmentDate ?
                                <p className='text-danger'>{errors.appointmentDate.message}</p> :
                                null
                        }
                    </div>
                </div>
                <button className='btn btn-primary my-2' image='submit'> Submit</button>
            </form>
        </div>
    )
}

export default Home