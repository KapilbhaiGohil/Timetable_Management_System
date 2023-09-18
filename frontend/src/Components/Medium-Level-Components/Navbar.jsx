import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png"
import "../../Css/Medium-Level-Css/Navbar.scss"
function Navbar({navData}) {

    return (
        <nav className={"Navbar"}>
            <div>
                <img src={logo} width={"2%"} alt={"this is "}/>
                <h1>TimePlanner Plus</h1>
            </div>
            <main>
                {navData.map((nav,index)=><Link key={index} to={nav.to}>{nav.name}</Link>)}
            </main>
        </nav>
    );
}  
export default Navbar;