import React, {Component} from 'react';
import star from "../img/star.avif";
import UserService from "../Services/UserService";
import CarouselComponent from "./CarouselComponent";

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
            UserService.getBookings().then((res) => {
                this.setState({
                    orders: res.data
                });
            });
        }
    render() {
        return (
            <div>
                <div style={{ backgroundImage: `url(${star})`, backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center' ,fontFamily:'Montserrat', minHeight: '90vh'}}>
                    <div className="container custom-container" >
                        <center>
                            <h1 style={{ fontSize: '50px' }}>Bookings</h1>
                            <div className="row">
                                <table className='table table-striped table-bordered' style={{width: '100%', background: 'whitesmoke' }} >
                                    <thead className='table-dark'>
                                    <tr>
                                        <th style={{fontSize:'20px'}}><b>Name</b></th>
                                        <th style={{fontSize:'20px'}}><b>Age</b></th>
                                        <th style={{fontSize:'20px'}}><b>Berth</b></th>
                                        <th style={{fontSize:'20px'}}><b>Gender</b></th>
                                        <th style={{fontSize:'20px'}}><b>MobileNo</b></th>
                                        <th style={{fontSize:'20px'}}><b>EmailId</b></th>
                                        <th style={{fontSize:'20px'}}><b>Quantity</b></th>
                                        <th style={{fontSize:'20px'}}><b>Price</b></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.orders.map(
                                        order =>
                                            <tr key={order.id} >
                                                <td style={{fontSize:'20px'}}>{order.name}</td>
                                                <td style={{fontSize:'20px'}}>{order.age}</td>
                                                <td style={{fontSize:'20px'}}>{order.berth}</td>
                                                <td style={{fontSize:'20px'}}>{order.gender}</td>
                                                <td style={{fontSize:'20px'}}>{order.mobileNo}</td>
                                                <td style={{fontSize:'20px'}}>{order.emailId}</td>
                                                <td style={{fontSize:'20px'}}>{order.quantity}</td>
                                                <td style={{fontSize:'20px'}}>{order.price}</td>
                                            </tr>
                                    )}
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

export default Bookings;