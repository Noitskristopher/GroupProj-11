import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
// make a seperate useState that changes date
const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [patientTicket, setPatientTicket] = useState({
        painLocation: '',
        painDuration: '',
        painLevel: 1,
        currentMeds: '',
        appointmentDate: ''
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ticket/${id}`)
            .then((res) => {
                console.log(res.data)
                setPatientTicket(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const changeHandler = (e) => {
        setPatientTicket({ ...patientTicket, [e.target.name]: e.target.value })
    }

    const editHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/ticket/${id}/edit`, patientTicket)
            .then((res) => {
                navigate('/myPortal')
            })
            .catch((err) => {
                // console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
            })
    }

    return (
        <div className='mx-auto w-50'>
            <h3 className='mt-2'>EDIT FORM</h3>
            <form onSubmit={editHandler}>
                <label className='form-label my-2'>What's hurting?</label>
                {
                    errors.painLocation ?
                        <p className='text-danger'>{errors.painLocation.message}</p> :
                        null
                }
                <input className='form-control' type='text' name='painLocation' value={patientTicket.painLocation} onChange={changeHandler}></input>
                <label className='form-label my-2'>How long has it been hurting?</label>
                {
                    errors.painDuration ?
                        <p className='text-danger'>{errors.painDuration.message}</p> :
                        null
                }
                <input className='form-control' type='text' name='painDuration' value={patientTicket.painDuration} onChange={changeHandler}></input>
                <label className='form-label my-2'>Pain level?</label>
                {
                    errors.painLevel ?
                        <p className='text-danger'>{errors.painLevel.message}</p> :
                        null
                }
                <input className='form-control' type='number' name='painLevel' value={patientTicket.painLevel} onChange={changeHandler}></input>
                <label className='form-label my-2'>Any current medications?</label>
                <input className='form-control' type='text' name='currentMeds' value={patientTicket.currentMeds} onChange={changeHandler}></input>
                <label className='form-label my-2'>Appointment date</label>
                {
                    errors.appointmentDate ?
                        <p className='text-danger'>{errors.appointmentDate.message}</p> :
                        null
                }
                <input className='form-control' type='date' name='appointmentDate' value={moment(patientTicket.appointmentDate).utc().format("yyyy-MM-DD")} onChange={changeHandler}></input>
                <button className='btn btn-primary my-2'> Submit</button>
            </form>
        </div >
    );
}

export default EditForm;
