import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png';
import axios from 'axios';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                // console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='d-flex justify-content-between align-items-center p-3 border-bottom'>
            <h2 className='fw-bold'>DocConnect <img src={logo} alt='logo' /></h2>
            <div className='d-flex justify-content-evenly align-items-center'>
                <Link to={'/home'} className='mx-2 text-decoration-none text-black'>Home</Link>
                <Link to={'/myPortal'} className='mx-2 text-decoration-none text-black'>My Portal</Link>
                <button onClick={logout} className='mx-2 btn btn-dark'>Logout</button>
            </div>
        </div>
    );
}

export default Nav;
