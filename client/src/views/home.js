import React, { useState } from 'react'
import axios from 'axios'
import { link, useNavigate } from 'react-router-dom'
import '../components/styles.css';

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
        <div className='background'>
            <h3 className='pt-3 text-dark fw-bold'>PATIENT FORM</h3>
            <div className='mx-auto col-5 review'>
                <form onSubmit={submitHandler}>
                    <div>
                        <label className='form-label'>What's hurting?</label>
                        {
                            errors.painLocation ?
                                <p className='text-danger'>{errors.painLocation.message}</p> :
                                null
                        }
                        <div>
                            <input
                                className='form-control'
                                onChange={(e) => setPainLocation(e.target.value)}
                                value={painLocation}
                                type="text" />
                        </div>
                    </div>
                    <div>
                        <label className='form-label'>How long has it been hurting?</label>
                        {
                            errors.painDuration ?
                                <p className='text-danger'>{errors.painDuration.message}</p> :
                                null
                        }
                        <div>
                            <input className='form-control' onChange={(e) => setPainDuration(e.target.value)}
                                value={painDuration}
                                type="text" />
                        </div>
                    </div>
                    <div className='my-1'>
                        <label className='form-label'>Pain level?</label>
                        {
                            errors.painLevel ?
                                <p className='text-danger'>{errors.painLevel.message}</p> :
                                null
                        }
                        <div>
                            <input className='form-control' onChange={(e) => setPainLevel(e.target.value)}
                                value={painLevel}
                                type="number" />
                        </div>
                    </div>
                    <div className='my-1'>
                        <label className='form-label'>Any current medications?</label>
                        <div>
                            <input className='form-control' onChange={(e) => setCurrentMeds(e.target.value)}
                                value={currentMeds}
                                type="text" />
                        </div>
                    </div>
                    <div className='my-1'>
                        <label className='form-label'>Appointment date</label>
                        {
                            errors.appointmentDate ?
                                <p className='text-danger'>{errors.appointmentDate.message}</p> :
                                null
                        }
                        <div>
                            <input className='form-control' onChange={(e) => setAppointmentDate(e.target.value)}
                                value={appointmentDate}
                                type="date" />
                        </div>
                    </div>
                    <button className='btn btn-primary my-1' image='submit'> Submit</button>
                </form>
            </div >
        </div >
    )
}

export default Home