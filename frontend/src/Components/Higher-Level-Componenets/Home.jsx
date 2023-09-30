import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/Home.scss"
import {Navigate, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../AuthContext";
export  default  function Home(){
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext)
    return (
        <div className={"home-outer"}>
            <div className={"home-main"}>
                <div className={"home-head"}>
                    <h1>Organize your work</h1>
                    <h1>and life, finally.</h1>
                    <p>Become focused, organized, and calm with</p>
                    <p style={{color:"#3399ff",filter:"none",fontWeight:"bold"}}>Timeplanner Plus.</p>
                </div>
                <div className={"home-btn"}>
                    <Button label={isLoggedIn? "1st Timetable": "Start For Free"} onclick={()=>isLoggedIn?navigate("/design"):navigate("/register")}></Button>
                </div>
            </div>
        </div>
    )
}