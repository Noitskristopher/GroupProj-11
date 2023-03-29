import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DisplayAll = () => {
    const [allTickets, setAllTickets] = useState([])
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
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
        <div>
            <h3 className='my-3'>You have {allTickets.length} upcoming appointments</h3>
            <table className='table table-hover table-striped mx-auto w-75 border'>
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
                                <td>{formatter.format(Date.parse(ticket.appointmentDate))}</td>
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