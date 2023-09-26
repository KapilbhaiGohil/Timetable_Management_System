import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../Assets/logo.png"
import "../../Css/Medium-Level-Css/Navbar.scss"
import {AuthContext} from "../../AuthContext";
function Navbar({navData}) {
    const {isLoggedIn,setIsLoggedIn,setIsLoading} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogout=async (event)=>{
        try{
            setIsLoading(true)
            event.preventDefault();
            const res = await fetch("/auth/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(res.ok){
                setIsLoggedIn(false);
                navigate("/login")
            }else{
                window.alert(res.statusMessage)
            }
        }catch (e) {
            window.alert(e);
        }finally {
            setIsLoading(false)
        }

    }
    return (
        <nav className={"Navbar"}>
            <div>
                <img src={logo} width={"2%"} alt={"this is "}/>
                <h1>TimePlanner Plus</h1>
            </div>
            {
                isLoggedIn &&
                <main>
                    {navData.map((nav,index)=><Link key={index} to={nav.to}>{nav.name}</Link>)}
                    <Link to={"/logout"} onClick={handleLogout}>Logout</Link>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    {navData.map((nav,index)=><Link key={index} to={nav.to}>{nav.name}</Link>)}
                </main>
            }

        </nav>
    );
}  
export default Navbar;