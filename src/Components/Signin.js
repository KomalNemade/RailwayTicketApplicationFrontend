import React, {useState} from 'react';
import '../App.css';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput, MDBRadio
}
    from 'mdb-react-ui-kit';
import UserService from "../Services/UserService";
import Home from "./Home";
import CryptoJS from "crypto-js";
import {toast, ToastContainer} from "react-toastify";


function Signin(props) {
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({
        email:'',
        password : ''
    });
    const handleLogin = async (event) => {
        event.preventDefault();
        const user={
            email:formData.email,
            password:formData.password,
        }
        const response = await UserService.login(user);
        if (response.data === 'success') {
            localStorage.setItem('userRole', formData.role);
            localStorage.setItem('email',formData.email);
            props.setUserRole(formData.role);
            window.location.replace('/UserHome')
            setShowForm(false);
        } else {
            toast.error("Wrong Credentials");
        }
    };

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
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                                    <p className="mb-5">Please enter your login and password!</p>
                                    <p>Role: </p>
                                    <MDBRadio label='Admin' name='role' value='Admin' checked={formData.role==='Admin'}
                                              onChange={(e)=>setFormData({ ...formData, role: e.target.value })} inline/>

                                    <MDBRadio label='User' name='role' value='User' checked={formData.role==='User'}
                                              onChange={(e)=>setFormData({ ...formData, role: e.target.value })} inline/>
                                    <br/>
                                    <br/>
                                    <label>Email Address</label>
                                    <MDBInput wrapperClass='mb-2' size='lg' id='email' type='email'value={formData.email}
                                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                                    <label>Password</label>
                                    <MDBInput wrapperClass='mb-2'  size='lg' id='password' type='password'value={formData.password}
                                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>

                                    <button className='mb-4 w-100 btn btn-dark' onClick={handleLogin}>Login</button>
                                    <div className={'d-flex flex-row justify-content-center mb-4'} >
                                        <p className="mb-0">Don't have an account? <a href='/register' className="fw-bold">Sign Up</a></p>

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

export default Signin;