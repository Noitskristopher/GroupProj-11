import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h2 className='my-3'>Sign Up</h2>
            <form className='w-50 mx-auto'>
                <div class="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="First Name" />
                    <label>First Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" className="form-control" placeholder='Last Name' />
                    <label>Last Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" className="form-control" placeholder='name@example.com' />
                    <label>Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" className="form-control" placeholder='password' />
                    <label>Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" className="form-control" placeholder='confirm password' />
                    <label>Confirm Password</label>
                </div>
                <div>
                    <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                </div>
                <button className='btn btn-primary'>Sign Up</button>
            </form>
        </div>
    );
}

export default Register;
