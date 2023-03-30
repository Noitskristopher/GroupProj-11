import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../components/styles.css';
import Nav from '../components/Nav';

const Home = (props) => {
    const [patientTicket, setPatientTicket] = useState({
        painLocation: '',
        painDuration: '',
        painLevel: 1,
        currentMeds: '',
        appointmentDate: ''
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setPatientTicket({ ...patientTicket, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/ticket/new", patientTicket, { withCredentials: true })
            .then((res) => {
                console.log(res);
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
        <>
            <Nav />
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
                                    name='painLocation'
                                    onChange={onChangeHandler}
                                    value={patientTicket.painLocation}
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
                                <input className='form-control' onChange={onChangeHandler}
                                    name='painDuration'
                                    value={patientTicket.painDuration}
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
                                <input className='form-control' onChange={onChangeHandler}
                                    name='painLevel'
                                    value={patientTicket.painLevel}
                                    type="number" />
                            </div>
                        </div>
                        <div className='my-1'>
                            <label className='form-label'>Any current medications?</label>
                            <div>
                                <input className='form-control' onChange={onChangeHandler}
                                    name='currentMeds'
                                    value={patientTicket.currentMeds}
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
                                <input className='form-control' onChange={onChangeHandler}
                                    name='appointmentDate'
                                    value={patientTicket.appointmentDate}
                                    type="date" />
                            </div>
                        </div>
                        <button className='btn btn-primary my-1' image='submit'> Submit</button>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Home