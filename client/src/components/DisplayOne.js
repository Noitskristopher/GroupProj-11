import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const DisplayOne = (props) => {
    const [oneTicket, setOneTicket] = useState([])
    const {id} = useParams();
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    useEffect(() => {
        axios.get(`http://localhost:8000/api/ticket/${id}`, {withCredentials: true})
            .then((oneTicket) => {
                console.log(oneTicket.data)
                setOneTicket(oneTicket.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[id]);

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
            <h4>Appointment Date</h4>
            <h3>{formatter.format(Date.parse(oneTicket.appointmentDate))}</h3>
            <Link><button>edit</button></Link> 
            <Link><button>Delete</button></Link>
        </div>
    );
}
export default DisplayOne;