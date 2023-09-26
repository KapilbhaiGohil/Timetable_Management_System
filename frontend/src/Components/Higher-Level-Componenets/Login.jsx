import { FaGrinAlt } from "react-icons/fa";
import {AiOutlineMail} from "react-icons/ai"
import {VscUnlock} from "react-icons/vsc"
import image from "../../Assets/login.svg"
import Input from "../Small-Level-Componenets/Input";
import Button from "../Small-Level-Componenets/Button"
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthContext";
import LoadingScreen from "../Small-Level-Componenets/LoadingScreen";
export  default  function Login(){
    const Navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const {setIsLoggedIn,setIsLoading} = useContext(AuthContext)
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePass = (e)=>{
        setPass(e.target.value);
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setIsLoading(true)
            const res =await fetch("auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email:email,pass:pass}),
            });
            const data = await  res.json();
            if(res.status === 201){
                setIsLoggedIn(true)
                Navigate("/home");
            }else{
                window.alert(data.message);
                // Navigate("/register");
            }
        }catch (e){
            window.alert(e.message);
            // console.log(e);
        }finally {
            setIsLoading(false)
        }
    }
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
                            <form onSubmit={handleSubmit}>
                                <div><Input label={"E-mail"} name={"email"} onchange={handleEmail} type={"email"} icon={<AiOutlineMail size={"2rem"}  color={"#1976d2"}/>} required={true}/></div>
                                <div><Input label={"Password"} name={"password"} onchange={handlePass} type={"password"} icon={<VscUnlock size={"2rem"} color={"#1976d2"}/>} required={true}/></div>
                                <div className={"btn-container"}><Button label={"Log in"} type={"submit"}/></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}