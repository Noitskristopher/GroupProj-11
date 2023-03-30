import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../components/styles.css';

const DisplayAll = () => {
    const [allTickets, setAllTickets] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/tickets', { withCredentials: true })
            .then((allTickets) => {
                console.log(allTickets.data)
                setAllTickets(allTickets.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='background'>
            <h3 className='pt-2 fw-bold'>You have {allTickets.length} upcoming appointments</h3>
            <table className='table table-hover table-light table-striped mx-auto w-75 border border-dark'>
                <thead className='table-dark'>
                    <tr>
                        <th>What's Hurting?</th>
                        <th>How long has it been hurting?</th>
                        <th>Pain Level?</th>
                        <th>Any Current Medications?</th>
                        <th>Appointment Date?</th>
                        <th>More Information</th>
                    </tr>
                </thead>
                {
                    allTickets.map((ticket) => (
                        <tbody key={ticket._id}>
                            <tr>
                                <td>{ticket.painLocation}</td>
                                <td>{ticket.painDuration}</td>
                                <td>{ticket.painLevel}</td>
                                <td>{ticket.currentMeds}</td>
                                <td>{moment(ticket.appointmentDate).utc().format("MMM Do YYYY")}</td>
                                <td><Link to={`/myPortal/${ticket._id}`}>Details</Link></td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    );
}

export default DisplayAll;