import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const DisplayOne = (props) => {
    const [oneTicket, setOneTicket] = useState([])
    const { id } = useParams();
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
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

    const date = new Date(oneTicket.appointmentDate);
    const fixedDate = date.toLocaleDateString('en-ca');
    return (
        <div>
            <h4>What's hurting?</h4>
            <p>{oneTicket.painLocation}</p>
            <h4>How long has this been hurting?</h4>
            <p>{oneTicket.painDuration}</p>
            <h4>Pain level</h4>
            <p>{oneTicket.painLevel}</p>
            <h4>Current Medication(s)?</h4>
            <p>{oneTicket.currentMeds}</p>
            <h4>Appointment Date:</h4>
            <h3>{fixedDate}</h3>
            <Link to={`/myPortal/${oneTicket._id}/edit`} className='mx-2'><button className='btn btn-dark'>Edit</button></Link>
            <Link className='btn btn-danger'>Delete</Link>
        </div>
    );
}
export default DisplayOne;