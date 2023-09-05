import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from "react-bootstrap";
import {useState} from "react";
import React,{useContext} from "react";



import {useHistory} from "react-router-dom";
function Header(){
   // const history=useHistory();
    const handleDropdownClick = (dropdown) => {
        if (openDropdown === dropdown) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(dropdown);
        }
    };
    const [openDropdown, setOpenDropdown] = useState(null);

        return(
            <nav className="navbar navbar-dark bg-dark justify-content-between" style={{fontFamily:'Montserrat'}}>
                <span className="navbar-brand">Railway Ticket Booking System</span>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">Guest</Dropdown.Toggle>
                    <Dropdown.Menu className="my-dropdown-menu" >
                        <Dropdown.Item onClick={() => handleDropdownClick('signin')}
                                       className={openDropdown === 'signin' ? 'active' : ''}>Sign In</Dropdown.Item>

                        <Dropdown.Item onClick={() => handleDropdownClick('signup')}
                                       className={openDropdown === 'signup' ? 'active' : ''}>Sign Up</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
                {openDropdown === 'signin' &&  window.location.replace("/login")}
                {openDropdown === 'signup' && window.location.replace("/register")}
            </nav>

        );
}
export default Header;