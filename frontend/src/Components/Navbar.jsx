import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className={"Navbar"}>
            <main>
                <div className={"heading"}>
                    <h1>TimePlanner Plus</h1>
                </div>
                <div className={"links"}>
                    <Link to={"/"}>Dashboard</Link>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/logout"}>Logout</Link>
                    <Link to={"demo"}>Courses</Link>
                </div>
            </main>
        </nav>
    );
}  
export default Navbar;