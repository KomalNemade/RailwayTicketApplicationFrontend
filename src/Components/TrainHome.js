import React, { Component } from 'react';
import star from "../img/star.avif";
import UserService from "../Services/UserService";
import "../App.css";
import CarouselComponent from "./CarouselComponent";

class TrainHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trains: []
        };
        this.Book = this.Book.bind(this);
    }

    componentDidMount() {
        UserService.getTrains().then((res) => {
            this.setState({
                trains: res.data
            });
        });
    }

    Book(train) {
        const queryParams = new URLSearchParams({ train: JSON.stringify(train) });
        window.location.replace(`/BookTicket?${queryParams.toString()}`);
    }

    render() {
        const currentDate = new Date();

        return (
            <div>
                <div
                    style={{
                        backgroundImage: `url(${star})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        fontFamily: 'Montserrat',
                        minHeight: '100vh',
                        display: 'flex'
                    }}
                >
                    <div className="container custom-container">
                        <center>
                            <h1 style={{ fontSize: '50px' }}>Trains</h1>
                            <div className="row">
                                <table
                                    className="table table-striped table-bordered"
                                    style={{ width: '100%', background: 'whitesmoke' }}
                                >
                                    <thead className="table-dark">
                                    <tr>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Train Name</b>
                                        </th>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Train No</b>
                                        </th>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Source</b>
                                        </th>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Destination</b>
                                        </th>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Date</b>
                                        </th>
                                        <th style={{ fontSize: '20px' }}>
                                            <b>Actions</b>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.trains.map((train) => (
                                        <tr key={train.id}>
                                            <td style={{ fontSize: '20px' }}>{train.trainName}</td>
                                            <td style={{ fontSize: '20px' }}>{train.trainNo}</td>
                                            <td style={{ fontSize: '20px' }}>{train.source}</td>
                                            <td style={{ fontSize: '20px' }}>{train.destination}</td>
                                            <td style={{ fontSize: '20px' }}>{train.date}</td>
                                            <td>
                                                <div className="button-container">
                                                    <button
                                                        onClick={() => this.Book(train)}
                                                        className="btn btn-info"
                                                        style={{
                                                            fontFamily: 'Montserrat',
                                                            marginLeft: '10px',
                                                            marginTop: '10px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
                                                        BOOK TICKET
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </center>

                    </div>
                </div>
            </div>
        );
    }
}

export default TrainHome;
