import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png"
import "../../Css/Medium-Level-Css/Navbar.scss"
function Navbar({navData,isloggedin}) {
    return (
        <nav className={"Navbar"}>
            <div>
                <img src={logo} width={"2%"} alt={"this is "}/>
                <h1>TimePlanner Plus</h1>
            </div>
            {
                isloggedin &&
                <main>
                    {navData.map((nav,index)=><Link key={index} to={nav.to}>{nav.name}</Link>)}
                </main>
            }
            {
                !isloggedin &&
                <main>
                    {navData.map((nav,index)=><Link key={index} to={nav.to}>{nav.name}</Link>)}
                    {/*<Link to={"/logout"}>Logout</Link>*/}
                </main>
            }
        </nav>
    );
}  
export default Navbar;