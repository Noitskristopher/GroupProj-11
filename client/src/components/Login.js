import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles.css';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })
    const onChangeHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }
    const loginHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                if (err.response.data.message) {
                    setErrors(err.response.data)
                    console.log(errors)
                }
            })
    }

    return (
        <div className='background'>
            <div>
                <h1 className='pt-2 fw-bold'>DocConnect</h1>
                <p className='fst-italic'>"Connecting patients with the care they deserve"</p>
            </div>
            <h3 className='pt-1 text-dark fw-bold'>Login</h3>
            <div className='col-3 mx-auto review'>
                <form onSubmit={loginHandler}>
                    <div className="form-floating mb-3">
                        {
                            errors ?
                                <p className='text-danger'>{errors.message}</p> :
                                null
                        }
                        <input type="email" className="form-control" placeholder='name@example.com' name='email' value={userLogin.email} onChange={onChangeHandler} />
                        <label>Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder='password' name='password' value={userLogin.password} onChange={onChangeHandler} />
                        <label>Password</label>
                    </div>
                    <div>
                        <p>Don't have an account? <Link to={'/'}>Sign Up</Link></p>
                    </div>
                    <button className='btn btn-primary'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
