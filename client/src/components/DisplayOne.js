import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


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
        <div>
            <h4 className='mt-2'>What's hurting?</h4>
            <p>{oneTicket.painLocation}</p>
            <h4>How long has this been hurting?</h4>
            <p>{oneTicket.painDuration}</p>
            <h4>Pain level</h4>
            <p>{oneTicket.painLevel}</p>
            <h4>Current Medication(s)?</h4>
            <p>{oneTicket.currentMeds}</p>
            <h4>Appointment Date:</h4>
            <h3 className='fw-bold'>{moment(oneTicket.appointmentDate).utc().format("dddd, MMMM Do YYYY")}</h3>
            <Link to={`/myPortal/${oneTicket._id}/edit`} className='mx-2'><button className='btn btn-dark'>Edit</button></Link>
            <button onClick={deleteHandler} className='btn btn-danger'>Delete</button>
        </div>
    );
}
export default DisplayOne;