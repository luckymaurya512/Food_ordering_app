import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header=()=>{
    const [btnNameReact, setBtnNameReact]=useState("Login");
    return(
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li className="nav-home">
                    <Link to="/">Home</Link>
                    </li>
                    <li className="nav-about"> 
                        <Link to="/about"> About Us</Link>
                    </li>
                    <li className="nav-contact-us">
                    <Link to="/contact"> Contact Us</Link>
                    </li>
                    <li className="nav-cart">Cart</li>
                    <button className="login"
                    onClick={()=>{
                        btnNameReact==="Login"?setBtnNameReact("Logout"):
                        setBtnNameReact("Login");
                        }
                    }>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    );
}

export default Header;