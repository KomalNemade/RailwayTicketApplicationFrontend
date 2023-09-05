import React, { useState } from 'react';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import Home from "./Home";
import {MDBCard, MDBCardBody, MDBContainer, MDBInput, MDBRadio} from "mdb-react-ui-kit";
import UserService from "../Services/UserService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import CryptoJS from 'crypto-js';



function Signup() {
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role:''
    });

    const [errors, setErrors] = useState({});

    /*async function hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }*/

    async function handleRegister(e) {
        e.preventDefault();
        setErrors({}); // Clear existing errors
        const newErrors = {};

        // Validate name
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validator.isEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Validate phone
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!validator.isMobilePhone(formData.phone)) {
            newErrors.phone = 'Invalid phone number';
        } else if (formData.phone.length !== 10) {
            newErrors.phone = 'Phone number should be 10 digits';
        }

        // Validate password strength
        const passwordStrength = zxcvbn(formData.password).score;
        if (passwordStrength < 3) {
            newErrors.password = 'Password is too weak';
        }

        // Validate password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        // Submit the form if there are no errors
        if (Object.keys(newErrors).length === 0) {
            const userData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role:formData.role
            };
        }
    }


    return (
        <div>
            <div className="carousel-wrapper">
                <Home/>
            </div>
            <div className='signup-overlay'>
                {showForm &&(
                    <MDBContainer fluid className='d-flex align-items-center justify-content-center ' >

                        <MDBCard className='m-5' style={{maxWidth: '600px'}}>

                            <MDBCardBody className='px-5'>
                                <h2 className="text-uppercase text-center mb-5">Register</h2>
                                <p>Role: </p>
                                <MDBRadio label='Admin' name='role' value='Admin' checked={formData.role==='Admin'}
                                          onChange={(e)=>setFormData({ ...formData, role: e.target.value })} inline/>

                                <MDBRadio label='User' name='role' value='User' checked={formData.role==='User'}
                                          onChange={(e)=>setFormData({ ...formData, role: e.target.value })} inline/>
                                <br/>
                                <br/>
                                <label>Name</label>
                                <MDBInput  size='lg' id='name' type='text' value={formData.name}
                                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          className={errors.name && 'is-invalid'}
                                />
                                {errors.name && (<div className='text-danger'>{errors.name}</div>)}
                                <label>Email Address</label>
                                <MDBInput  size='lg' id='email' type='email' value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={errors.email && 'is-invalid'}
                                />
                                {errors.email && <div className='text-danger'>{errors.email}</div>}
                                <label>Phone</label>
                                <MDBInput  size='lg' id='phone' type='text' value={formData.phone}
                                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                          className={errors.phone && 'is-invalid'}
                                />
                                {errors.phone && <div className='text-danger'>{errors.phone}</div>}
                                <label>Password</label>
                                <MDBInput  size='lg' id='password' type='password' value={formData.password}
                                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                          className={errors.password && 'is-invalid'}
                                />
                                {errors.password && <div className='text-danger'>{errors.password}</div>}
                                <label>Confirm Password</label>
                                <MDBInput  size='lg' id='confirmPassword' type='password' value={formData.confirmPassword}
                                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                          className={errors.confirmPassword && 'is-invalid'}
                                />
                                {errors.confirmPassword && <div className='text-danger'>{errors.confirmPassword}</div>}
                                <br/>
                                <button className='mb-4 w-100 btn btn-dark' onClick={handleRegister}>Register</button>
                                <div className={'d-flex flex-row justify-content-center mb-4'} >
                                    <p className="mb-0">Already have an account? <a href='/login' className="fw-bold">Sign In</a></p>

                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                )}
            </div>

<ToastContainer/>
        </div>
    );
}
export default Signup;