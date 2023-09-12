import React, {useEffect, useState} from "react";
import UserService from "../Services/UserService";
import {MDBCard, MDBCardBody, MDBContainer, MDBInput} from "mdb-react-ui-kit";
import {MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import star from "../img/star.avif";

function BookTicket(){
    const urlParams = new URLSearchParams(window.location.search);
    const train = JSON.parse(urlParams.get('train'));

    const [formData, setFormData] = useState({
        name:'',
        age:'',
        berth:'',
        gender:'',
        mobileNo:'',
        emailId:'',
        price:train.price,
    });

    const [showForm, setShowForm] = useState(true);
    /*const [ticketPrice, setTicketPrice] = useState(null);
    const [ticketQuantity, setTicketQuantity] = useState(null);*/
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [passengers, setPassengers] = useState([]);

    const mobileNumberPattern = /^[0-9]{10}$/;

    const Book = async (e) => {
        e.preventDefault();
        //Validations

        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (!/^\d+$/.test(formData.age)) {
            newErrors.age = "Invalid Age format";
        }

        if (!formData.emailId) {
            newErrors.emailId = "Email Id is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            newErrors.emailId = "Invalid Email format";
        }

        if (!mobileNumberPattern.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Invalid Mobile Number (10 digits required)';
        }


        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            setPassengers([...passengers, formData]);
            setShowPaymentModal(true);
            setShowForm(false);
        }
    }
    const handlePayment = async () => {
        const newErrors = {};

        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0) {
            const uptrain={
                trainName: train.trainName,
                trainNo: train.trainNo,
                source: train.source,
                destination: train.destination,
                date: train.date,
                seat:train.seat-passengers.length,
                price:train.price,
            };

            try {
                setLoading(true);
                const response = await UserService.addTicket(passengers);
                console.log(response.data)
                const res= await UserService.updateTrain(train.id,uptrain);

                setLoading(false);
                setShowPaymentModal(false);
                setShowSuccessModal(true);
            } catch (error) {
                console.error('Error placing order:', error);
                setLoading(false);
                // Handle the error and show an error message to the user
            }
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        window.location.replace("/UserHome")
    };
    const cancelPayment=()=>{
        setShowPaymentModal(false);
        window.location.replace("/UserHome")
    }
    /*useEffect(() => {
        const fetchTicketPrice = async () => {
            try {
                const response = await UserService.getTrainById(train.id);
                //console.log(response)
                setTicketPrice(response.data.price);
                setTicketQuantity(response.data.seat);
            } catch (error) {
                console.error("Error fetching ticket price:", error);
                setTicketPrice(null);
            }
        };
        fetchTicketPrice();

    }, []);*/
    const handlegenderchange=(e)=>{
        e.preventDefault();
        setFormData({ ...formData, gender: e.target.value })
    }
    const handleberthchange=(e)=>{
        e.preventDefault();
        setFormData({ ...formData, berth: e.target.value })
    }
    const addAnotherPassenger = () => {
        if (formData.name && formData.age) {
            setPassengers([...passengers, formData]);
            setFormData({
                name: "",
                age: "",
                berth: "",
                gender: "",
                mobileNo: "",
                emailId: "",
                price: train.price,
            });
        }
        console.log(passengers);
    };


    return (
        <div style={{ backgroundImage: `url(${star})`, backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center' ,fontFamily:'Montserrat', minHeight: '90vh'}}>
            <div >
                {showForm &&(
                    <MDBContainer fluid className='d-flex align-items-center justify-content-center ' >
                        <div className='mask gradient-custom-3'></div>
                        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                            <MDBCardBody className='px-5'>
                                <h2 className="text-uppercase text-center mb-5">Book Ticket</h2>

                                <label>Name</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className={errors.name && "is-invalid"}
                                />
                                {errors.name && (
                                    <div className="text-danger">{errors.name}</div>
                                )}
                                <label>Age</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) =>
                                        setFormData({ ...formData, age: e.target.value })
                                    }
                                    className={errors.age && "is-invalid"}
                                />
                                {errors.age && (
                                    <div className="text-danger">{errors.age}</div>
                                )}
                                <label>Berth</label>
                                <select  className="form-control"
                                         size="lg"
                                         id="berth"
                                         value={formData.berth}
                                         onChange={handleberthchange}
                                required={true}>
                                    <option value="" disabled> Select Berth</option>
                                    <option value={"Lower"}>Lower</option>
                                    <option value={"Middle"}>Middle</option>
                                    <option value={"Upper"}>Upper</option>
                                </select>
                                <br/>
                                <label>Gender</label>
                                <select
                                    className="form-control"
                                    size="lg"
                                    id="berth"
                                    value={formData.gender}
                                    onChange={handlegenderchange}
                                    required={true} >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                                    <option value={"Others"}>Others</option>
                                </select>

                                <br/>
                                <label>Mobile No</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="mobileNo"
                                    type="text"
                                    value={formData.mobileNo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, mobileNo: e.target.value })
                                    }
                                    className={errors.mobileNo && "is-invalid"}
                                />
                                {errors.mobileNo && (
                                    <div className="text-danger">{errors.mobileNo}</div>
                                )}

                                <label>Email Id</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="emailId"
                                    type="text"
                                    value={formData.emailId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, emailId: e.target.value })
                                    }
                                    className={errors.emailId && "is-invalid"}
                                />
                                {errors.emailId && (
                                    <div className="text-danger">{errors.emailId}</div>
                                )}
                                <p>Seats available: {train.seat}</p>
                                <p>Price per ticket: ₹ {train.price}</p>

                                <button onClick={addAnotherPassenger} className="mb-4 w-100 btn btn-dark">Add Another Passenger</button>

                                <button onClick={Book} className='mb-4 w-100 btn btn-dark'>Book</button>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                )}
            </div>
            <div style={{ backgroundImage: `url(${star})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center' ,fontFamily:'Montserrat', minHeight: '90vh'}}>
                <MDBModal isOpen={showPaymentModal} toggle={() => setShowPaymentModal(false)}>
                    <MDBModalHeader toggle={() => setShowPaymentModal(false)}>Confirm Payment</MDBModalHeader>
                    <MDBModalBody>
                        <p>Total Price: ₹{train.price * passengers.length}</p>
                        <p>No of passengers: {passengers.length}</p>
                        <br/>
                        <label>Debit Card Number</label>
                        <MDBInput wrapperClass='mb-1' size='lg' id='cardno' type='number' value={formData.cardno}
                                  onChange={(e) => setFormData({ ...formData, cardno: e.target.value })}
                                  className={errors.cardno && 'is-invalid'}
                        />{errors.cardno && <div className='invalid-feedback'>{errors.cardno}</div>}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <button className='btn btn-secondary' onClick={cancelPayment}>
                            Cancel
                        </button>
                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading}>
                            {loading ? 'Processing...' : 'Pay'}
                        </button>
                    </MDBModalFooter>
                </MDBModal>

                <MDBModal isOpen={showSuccessModal} toggle={handleSuccessModalClose}>
                    <MDBModalHeader toggle={handleSuccessModalClose}>Payment Successful</MDBModalHeader>
                    <MDBModalBody>
                        <p>Total Price: {train.price  * passengers.length}</p>
                        <p>Quantity: {passengers.length}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <button className='btn btn-primary' onClick={handleSuccessModalClose}>
                            OK
                        </button>
                    </MDBModalFooter>
                </MDBModal>
            </div>

        </div>
    );
}
export default BookTicket;










