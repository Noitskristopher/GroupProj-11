import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='d-flex justify-content-between align-items-center p-3 border-bottom'>
            <h2 className='fw-bold'>DocConnect</h2>
            <div className='d-flex justify-content-evenly align-items-center'>
                <Link to={'/home'} className='mx-2 text-decoration-none text-black'>Home</Link>
                <Link to={'/home'} className='mx-2 text-decoration-none text-black'>My Portal</Link>
                <Link className='mx-2 text-decoration-none text-black'>Logout</Link>
            </div>
        </div>

    );
}

export default Nav;
