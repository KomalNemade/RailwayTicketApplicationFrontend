import React, {Component, useState} from 'react';
import star from "../../img/star.avif";
import {MDBCard, MDBCardBody, MDBContainer, MDBInput} from "mdb-react-ui-kit";
import UserService from "../../Services/UserService";
import CarouselComponent from "../CarouselComponent";
import Home from "../Home";
import * as trains from "react-bootstrap/ElementChildren";

function TrainDate(){
    const[sdate,setDate]=useState('');
    const[src,setSrc]=useState('');
    const[dest,setDest]=useState('');

    const [showForm, setShowForm] = useState(true);
    const [showTable, setShowTable] = useState(false);
    //const today = new Date().toISOString().substr(0, 10);
    const[events,settrain]=useState([]);
    const Search = async (e) => {
        e.preventDefault();
            try {
                const response = await UserService.getEventBydate(sdate);
                settrain(response.data);

                console.log(trains);

            } catch (error) {
                console.error("Error fetching trains:", error);
            }
            setShowForm(false);
            setShowTable(true);
        };
    const Close=()=>{
        setShowTable(false);
        window.location.replace("/UserHome");
    }
    const Book=(train)=>{
        const queryParams = new URLSearchParams({ event: JSON.stringify(train) });
        window.location.replace(`/BookTicket?${queryParams.toString()}`);

    }
    //Date


    let date;
    return (
            <div style={{ backgroundImage: `url(${star})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh',fontFamily:'Montserrat' }}>
                <div>
                    {showForm &&(
                        <MDBContainer fluid className='d-flex align-items-center justify-content-center ' >
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                                <MDBCardBody className='px-5'>
                                    <h2 className="text-uppercase text-center mb-5">Where is my Train</h2>
                                    <label>Date</label>
                                    <MDBInput
                                        wrapperClass='mb-1'
                                        size='lg'
                                        id='sdate'
                                        type='date'
                                        value={sdate}
                                        min={new Date().toISOString().split('T')[0]} // Set the minimum date to today
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <label>Enter Source</label>

                                    <MDBInput wrapperClass='mb-1'  size='lg' id='src' type='text'  value={src}
                                              onChange={(e) => setSrc(e.target.value )}
                                    />

                                    <label>Enter Destination</label>
                                    <MDBInput wrapperClass='mb-1'  size='lg' id='dest' type='text'  value={dest}
                                              onChange={(e) => setDest(e.target.value )}
                                    />
                                    <br/>
                                    <button onClick={Search} className='mb-4 w-100 btn btn-dark'>Search Train</button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    )}
                </div>
                {showTable&&(
                    <div className="container custom-container" >
                        <center>
                            <h1 style={{ fontSize: '50px' ,fontFamily:'Montserrat'}}>Trains Scheduled On {date}</h1>
                            <div className="row">
                                <table className='table table-striped table-bordered' style={{width: '100%', background: 'whitesmoke',fontFamily:'Montserrat' }} >
                                    <thead className='table-dark'>
                                    <tr>
                                        <th style={{fontSize:'20px'}}><b>Train Name</b></th>
                                        <th style={{fontSize:'20px'}}><b>Train No</b></th>
                                        <th style={{fontSize:'20px'}}><b>Source</b></th>
                                        <th style={{fontSize:'20px'}}><b>Destination</b></th>
                                        <th style={{fontSize:'20px'}}><b>Date</b></th>
                                        <th style={{fontSize:'20px'}}><b>seat</b></th>
                                        <th style={{fontSize:'20px'}}><b>price</b></th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {trains.map( train =>(
                                            <tr key={train.id} >
                                                <td style={{fontSize:'20px'}}>{train.trainName}</td>
                                                <td style={{fontSize:'20px'}}>{train.trainNo}</td>
                                                <td style={{fontSize:'20px'}}>{train.source}</td>
                                                <td style={{fontSize:'20px'}}>{train.destination}</td>
                                                <td style={{fontSize:'20px'}}>{train.date}</td>
                                                <td style={{fontSize:'20px'}}>{train.seat}</td>
                                                <td style={{fontSize:'20px'}}>{train.price}</td>
                                                <td>
                                                    <div className="button-container">
                                                        <button onClick={() =>Book(train)} className="btn btn-info" style={{ fontFamily: 'Montserrat', marginLeft: "10px", marginTop: "10px", whiteSpace: "nowrap" }}>BOOK TICKET</button>
                                                    </div>
                                                </td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <button style={{ marginLeft: "10px" , marginTop:"10px",fontFamily:'Montserrat'}} onClick={() => Close()} className="btn btn-danger">CLOSE</button>
                            </div>
                        </center>
                    </div>
                )}
                <br/>

            </div>
        );
}

export default TrainDate;