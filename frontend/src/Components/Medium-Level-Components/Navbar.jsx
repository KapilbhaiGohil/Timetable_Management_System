import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png"
import "../../Css/Medium-Level-Css/Navbar.scss"
function Navbar() {

    return (
        <nav className={"Navbar"}>
            <div>
                <img src={logo} width={"2%"} alt={"this is "}/>
                <h1>TimePlanner Plus</h1>
            </div>
            <main>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/contact"}>Contact Us</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
            </main>
        </nav>
    );
}  
export default Navbar;