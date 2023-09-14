import Input from "../Small-Level-Componenets/Input";
import Button from "../Small-Level-Componenets/Button";
import  register_image from "../../Assets/Register.svg"
import {AiOutlineMail} from "react-icons/ai"
import {VscUnlock} from "react-icons/vsc"
import {BsPerson} from "react-icons/bs"
import "../../Css/Higher-Level-Css/Register.scss"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export  default  function Register(){
    const Navigate = useNavigate();
    const [user,setUser]=useState({name:"",email:"",password:"",cpassword:""});
    const handleSubmit=async (event)=>{
        event.preventDefault();
        const {name,email,password,cpassword} = user;
        if(password!==cpassword){
            window.alert("Password and confirm password didn't match")
        }else {
            try {
                const res = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: name, email: email, password: password})
                });
                const data = await res.json();
                console.log(data);
                if(res.status===201){
                    window.alert("data saved succesfully");
                    Navigate("/login");
                }else{
                    window.alert(data.message);
                }
            } catch (e) {
                window.alert(e.message);
                // console.log(e);
            }
        }
    }
    const handleInputs=(event)=>{
        setUser({
            ...user,
            [event.target.name]:event.target.value,
        });
    }
    return (
        <div className={"outer"}>
            <div className={"heading"}>
                <h1>Register</h1>
            </div>
            <div className={"register-container"}>
                <div className={"form-container"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"inputs-container"}>
                            <div><Input required={true} label={"Name"} name={"name"} onchange={handleInputs} type={"text"} icon={<BsPerson size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input required={true} label={"E-mail"} name={"email"} type={"email"} onchange={handleInputs} icon={<AiOutlineMail size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input required={true} label={"Password"} name={"password"} type={"password"} onchange={handleInputs} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div><Input required={true} label={"Confirm Password"} name={"cpassword"} type={"password"} onchange={handleInputs} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>}/></div>
                            <div className={"btn-container"}><Button label={"Register"} type={"submit"}/></div>
                        </div>
                    </form>
                </div>
                <div className={"image-container"}>
                    <img src={register_image} width={"500vw"} alt={"register"}/>
                </div>
            </div>
        </div>
    );
}