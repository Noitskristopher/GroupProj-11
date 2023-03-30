import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import '../components/styles.css';


const DisplayOne = (props) => {
    const [oneTicket, setOneTicket] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/ticket/${id}`, { withCredentials: true })
            .then((oneTicket) => {
                console.log(oneTicket.data)
                setOneTicket(oneTicket.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id]);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/ticket/${id}`)
            .then((res) => {
                navigate('/myPortal')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='border background'>
            <h3 className='pt-2 fw-bold'>Patient Information</h3>
            <div className='review mx-auto col-4 text-start'>
                <h3 className='fw-bold'>What's hurting?</h3>
                <h5>{oneTicket.painLocation}</h5>
                <h3 className='fw-bold'>How long has this been hurting?</h3>
                <h5>{oneTicket.painDuration}</h5>
                <h3 className='fw-bold'>Pain level</h3>
                <h5>{oneTicket.painLevel}</h5>
                <h3 className='fw-bold'>Current Medication(s)?</h3>
                <h5>{oneTicket.currentMeds}</h5>
                <h3 className='fw-bold'>Appointment Date:</h3>
                <h2>{moment(oneTicket.appointmentDate).utc().format("dddd, MMMM Do YYYY")}</h2>
                <div className='text-end'>
                    <Link to={`/myPortal/${oneTicket._id}/edit`} className='me-2'><button className='btn btn-dark'>Edit</button></Link>
                    <button onClick={deleteHandler} className='btn btn-danger'>Delete</button>
                </div>
            </div>
        </div>
    );
}
export default DisplayOne;