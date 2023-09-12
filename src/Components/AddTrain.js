import { MDBCard, MDBCardBody, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import UserService from "../Services/UserService";
import fan from "../img/fan.jpg";

function AddTrain() {
    const [formData, setFormData] = useState({
        trainName: "",
        trainNo: "",
        source: "",
        destination: "",
        date: "",
        seat:"",
        price:"",
    });
    const [showForm, setShowForm] = useState(true);
    const [errors, setErrors] = useState({});

    //Date
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    async function Create(e) {
        e.preventDefault();
        setErrors({});
        const newErrors = {};

        if (!formData.source) {
            newErrors.source = "Source is required";
        }
        if (!formData.destination) {
            newErrors.destination = "End Date is required";
        }
        if (!formData.trainName) {
            newErrors.trainName = "Train Name is required";
        }
        if (!formData.trainNo) {
            newErrors.trainNo = "Train No is required";
        }
        if (!formData.date) {
            newErrors.date = "Date is required";
        }
        if (!formData.seat) {
            newErrors.seat = "Seat is required";
        }
        if (!formData.price) {
            newErrors.price = "Price is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const trainData = {
                trainName: formData.trainName,
                trainNo: formData.trainNo,
                source: formData.source,
                destination: formData.destination,
                date: formData.date,
                seat:formData.seat,
                price:formData.price,
            };
            await UserService.addTrain(trainData);
            setShowForm(false);
            window.location.replace("/UserHome");
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${fan})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "80vh",
            }}
        >
            <div>
                {showForm && (
                    <MDBContainer
                        fluid
                        className="d-flex align-items-center justify-content-center "
                    >
                        <div className="mask gradient-custom-3"></div>
                        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
                            <MDBCardBody className="px-5">
                                <h2 className="text-uppercase text-center mb-5">Add Trains</h2>
                                <br />
                                <label>Train Name</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="name"
                                    type="text"
                                    value={formData.trainName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, trainName: e.target.value })
                                    }
                                    className={errors.trainName && "is-invalid"}
                                />
                                {errors.trainName && (
                                    <div className="text-danger">{errors.trainName}</div>
                                )}
                                <label>Train No</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="no"
                                    type="number"
                                    value={formData.trainNo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, trainNo: e.target.value })
                                    }
                                    className={errors.trainNo && "is-invalid"}
                                />
                                {errors.trainNo && (
                                    <div className="text-danger">{errors.trainNo}</div>
                                )}
                                <label>Source</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="source"
                                    type="text"
                                    value={formData.source}
                                    onChange={(e) =>
                                        setFormData({ ...formData, source: e.target.value })
                                    }
                                    className={errors.source && "is-invalid"}
                                />
                                {errors.source && (
                                    <div className="text-danger">{errors.source}</div>
                                )}
                                <label>Destination</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="destination"
                                    type="text"
                                    value={formData.destination}
                                    onChange={(e) =>
                                        setFormData({ ...formData, destination: e.target.value })
                                    }
                                    className={errors.destination && "is-invalid"}
                                />
                                {errors.destination && (
                                    <div className="text-danger">{errors.destination}</div>
                                )}
                                <label>Date</label>
                                <input
                                    className={`form-control mb-1 ${errors.date && "is-invalid"}`}
                                    type="date" value={formData.date} onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                    }
                                    min={getTodayDate()}
                                />
                                {errors.date && <div className="text-danger">{errors.date}</div>}
                                <label>No of Seat</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="seat"
                                    type="text"
                                    value={formData.seat}
                                    onChange={(e) =>
                                        setFormData({ ...formData, seat: e.target.value })
                                    }
                                    className={errors.seat && "is-invalid"}
                                />
                                {errors.seat && (
                                    <div className="text-danger">{errors.seat}</div>
                                )}

                                <label>Price</label>
                                <MDBInput
                                    wrapperClass="mb-1"
                                    size="lg"
                                    id="price"
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value})
                                    }
                                    className={errors.price && "is-invalid"}
                                />
                                {errors.price && (
                                    <div className="text-danger">{errors.price}</div>
                                )}

                                <div className="form-outline mb-4"></div>
                                <button
                                    onClick={Create}
                                    className="mb-4 w-100 btn btn-dark"
                                >
                                    Add Train
                                </button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                )}
            </div>
        </div>
    );
}

export default AddTrain;
