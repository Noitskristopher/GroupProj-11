import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/styles.css';


const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [errorsEmail, setErrorsEmail] = useState({})
    const [userReg, setUserReg] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onChangeHandler = (e) => {
        setUserReg({ ...userReg, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', userReg, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err);
                console.log('^^USED EMAIL^^^', err.response.data.message)
                if (err.response.data.error) {
                    setErrors(err.response.data.error.errors)
                    console.log('^^Errors^^', errors)

                }
                if (err.response.data.message) {
                    setErrorsEmail(err.response.data)
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
            <h3 className='pt-1 text-dark fw-bold'>Sign Up</h3>
            <div className='col-5 mx-auto review'>
                <form onSubmit={submitHandler}>
                    <div className="form-floating mb-3">
                        {
                            errors.firstName ?
                                <p className='text-danger'>{errors.firstName.message}</p> :
                                null
                        }
                        <input type="text" className="form-control" placeholder="First Name" name='firstName' value={userReg.firstName} onChange={onChangeHandler} />
                        <label>First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        {
                            errors.lastName ?
                                <p className='text-danger'>{errors.lastName.message}</p> :
                                null
                        }
                        <input type="text" className="form-control" placeholder='Last Name' name='lastName' value={userReg.lastName} onChange={onChangeHandler} />
                        <label>Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        {
                            errors.email ?
                                <p className='text-danger'>{errors.email.message}</p> :
                                null
                        }
                        {
                            errorsEmail ?
                                <p className='text-danger'>{errorsEmail.message}</p> :
                                null
                        }
                        <input type="email" className="form-control" placeholder='name@example.com' name='email' value={userReg.email} onChange={onChangeHandler} />
                        <label>Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        {
                            errors.password ?
                                <p className='text-danger'>{errors.password.message}</p> :
                                null
                        }
                        <input type="password" className="form-control" placeholder='password' name='password' value={userReg.password} onChange={onChangeHandler} />
                        <label>Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        {
                            errors.confirmPassword ?
                                <p className='text-danger'>{errors.confirmPassword.message}</p> :
                                null
                        }
                        <input type="password" className="form-control" placeholder='confirm password' name='confirmPassword' value={userReg.confirmPassword} onChange={onChangeHandler} />
                        <label>Confirm Password</label>
                    </div>
                    <div>
                        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                    </div>
                    <button className='btn btn-primary'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
