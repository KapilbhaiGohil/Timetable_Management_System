import { FaGrinAlt } from "react-icons/fa";
import {AiOutlineMail} from "react-icons/ai"
import {VscUnlock} from "react-icons/vsc"
import image from "../../Assets/login.svg"
import Input from "../Small-Level-Componenets/Input";
import Button from "../Small-Level-Componenets/Button"
export  default  function Login(){
    return (
        <div className={"outer"}>
            <div className={"heading"}>
                <h1>Login</h1>
            </div>
            <div className={"login-container"}>
                <div className={"image-container"}>
                    <img src={image} width={"500vw"} alt={"Login"}/>
                </div>
                <div className={"form-container"}>
                    <div className={"icon-container"}>
                        <FaGrinAlt size={"4rem"} color={"#1976d2"}/>
                        <div className={"label-container"}>
                            <label>Hello Again</label>
                            <label>You Are One Step Closer To Your Goals</label>
                        </div>
                    </div>
                    <div className={"inputs-container"}>
                        <div><Input label={"E-mail"} type={"email"} icon={<AiOutlineMail size={"2rem"}  color={"#1976d2"}/>}/></div>
                        <div><Input label={"Password"} type={"password"} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>}/></div>
                        <div className={"btn-container"}><Button label={"Log in"} type={"submit"}/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}