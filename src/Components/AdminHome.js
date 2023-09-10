import UserService from "../Services/UserService";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import fan from "../img/fan.jpg";
import "../App.css";


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trains: []
        }
        //this.delete = this.delete.bind(this);
        this.create_ticket = this.create_ticket.bind(this);
        //this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        UserService.getTrains().then((res) => {
            this.setState({
               trains: res.data
            });
        });
    }


    /*delete(event) {
        UserService.delEvent(event.id).then(res => {
            if(res.data==="success"){
                this.setState({ events: this.state.events.filter(Event => Event !== event) });
                window.location.replace('/UserHome')
            }
            else {
                toast.error("Event Cannot be deleted because tickets are issued.")
            }
        });
    }

    edit(event) {
        const queryParams = new URLSearchParams({ event: JSON.stringify(event) });
        window.location.replace(`/update?${queryParams.toString()}`);
    } */

    create_ticket(train) {
        const queryParams = new URLSearchParams({ event: JSON.stringify(train) });
        window.location.replace(`/Createticket?${queryParams.toString()}`);
    }

    render() {
        return (
            <div  style={{ backgroundImage: `url(${fan})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' ,display: 'flex',marginBottom:'40px'}}>
                <div className="container" style={{fontFamily:'Montserrat'}}>
                    <center>
                        <h1 style={{ fontSize: '50px'}}>Trains</h1>
                        <div className="row">
                            <table className='table table-striped table-bordered' style={{width: '100%', background: 'whitesmoke' }} >
                                <thead className='table-dark'>
                                <tr>
                                    <th style={{fontSize:'20px'}}><b>Train Name</b></th>
                                    <th style={{fontSize:'20px'}}><b>Train No</b></th>
                                    <th style={{fontSize:'20px'}}><b>Source</b></th>
                                    <th style={{fontSize:'20px'}}><b>Destination</b></th>
                                    <th style={{fontSize:'20px'}}><b>Date</b></th>
                                    <th style={{fontSize:'20px'}}><b>No of Seat</b></th>
                                    <th style={{fontSize:'20px'}}><b>Price</b></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.trains.map(
                                    train =>
                                        <tr key={train.id} >
                                            <td style={{fontSize:'20px'}}>{train.trainName}</td>
                                            <td style={{fontSize:'20px'}}>{train.trainNo}</td>
                                            <td style={{fontSize:'20px'}}>{train.source}</td>
                                            <td style={{fontSize:'20px'}}>{train.destination}</td>
                                            <td style={{fontSize:'20px'}}>{train.date}</td>
                                            <td style={{fontSize:'20px'}}>{train.seat}</td>
                                            <td style={{fontSize:'20px'}}>{train.price}</td>
                                            <td>
                                                </td>
                                        </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>

            </div>
        );
    }
}

export default withRouter(AdminHome);
