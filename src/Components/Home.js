import train from '../img/train.avif';
import train4 from '../img/train4.avif';
import track7 from '../img/track7.webp';
import Carousel from 'react-bootstrap/Carousel';
import color from "../img/color.jpg";
function Home(){
    return(
        <div style={{
            backgroundImage: `url(${color})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
        }}>
            <div style={{ marginTop: '20px'}}>
            <div className="container">
                <center>
            <Carousel style={{fontFamily:'Montserrat', width: '1000px', // Adjust the width as per your requirements
                margin: '0 auto'}} >
                <Carousel.Item>
                    <img className="d-block w-100" src={train} alt="First slide" height='500px' width='600px'/>
                    <Carousel.Caption>
                        <h1>Welcome to Railway Ticket Booking System</h1>
                        <p style={{fontSize:'25px'}}>Dare to Travel,Care to Book</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={train4} alt="Second slide" height='500px' width='600px'/>
                    <Carousel.Caption>
                        <h1>Welcome to Railway Ticket Booking System</h1>
                        <p style={{fontSize:'25px'}}>Dare to Travel,Care to Book</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={track7} alt="Third slide" height='500px' width='600px' />
                    <Carousel.Caption>
                        <h1>Welcome to Railway Ticket Booking System</h1>
                        <p style={{fontSize:'25px'}}>Dare to Travel,Care to Book</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
                </center>
        </div>
                <br/>

        </div>
        </div>
            );
        }
export default Home;