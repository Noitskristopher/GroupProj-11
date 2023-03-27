import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <h2 className='my-3'>Login</h2>
            <form className='w-50 mx-auto'>
                <div class="form-floating mb-3">
                    <input type="email" className="form-control" placeholder='name@example.com' />
                    <label>Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" className="form-control" placeholder='password' />
                    <label>Password</label>
                </div>
                <div>
                    <p>Don't have an account? <Link to={'/'}>Sign Up</Link></p>
                </div>
                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
}

export default Login;
