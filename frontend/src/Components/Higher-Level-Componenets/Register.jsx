import Input from "../Small-Level-Componenets/Input";
import Button from "../Small-Level-Componenets/Button";
import  register_image from "../../Assets/Register.svg"
import {AiOutlineMail} from "react-icons/ai"
import {VscUnlock} from "react-icons/vsc"
import {BsPerson} from "react-icons/bs"
import "../../Css/Higher-Level-Css/Register.scss"
export  default  function Register(){
    const handleSubmit=(event)=>{
        event.preventDefault();
        const {name,value} = event.target;
        console.log(name)
        console.log(event.target);
    };
    return (
        <div className={"outer"}>
            <div className={"heading"}>
                <h1>Register</h1>
            </div>
            <div className={"register-container"}>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"inputs-container"}>
                            <div><Input label={"Name"} type={"text"} icon={<BsPerson size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input label={"E-mail"} type={"email"} icon={<AiOutlineMail size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input label={"Password"} type={"password"} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input label={"Confirm Password"} type={"password"} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div className={"btn-container"}><Button label={"Register"} type={"submit"}/></div>
                        </div>
                    </form>
                </div>
                <div className={"image-container"}>
                    <img src={register_image} width={"500vw"} alt={"register"}/>
                </div>
            </div>
        </div>
    )
}