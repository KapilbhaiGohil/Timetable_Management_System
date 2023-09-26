import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/Home.scss"
import {Navigate, useNavigate} from "react-router-dom";
export  default  function Home(){
    const navigate = useNavigate();
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
                    <Button label={"Start For Free"} onclick={()=>navigate("/register")}></Button>
                </div>
            </div>

        </div>
    )
}