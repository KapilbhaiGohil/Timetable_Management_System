import Dropdown from "../Small-Level-Componenets/Dropdown";
import Button from "../Small-Level-Componenets/Button";
import {useState} from "react";
import "../../Css/Medium-Level-Css/SemForm.scss"

export default function SemForm({sendDataToParent}){
    const [sem,setSem] = useState({dept:"",sem:"",batch:""})
    const handleSelectionChange = (event)=>{
        event.preventDefault();
        setSem({
            ...sem,
            [event.target.name] : event.target.value,
        });
    }
    const handleSubmit=()=>{
        sendDataToParent(sem);
    }
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>SEMESTER DETAILS</h1>
                <form className={"sem-form-form"}>
                    <Dropdown name={"dept"} label={"Select Department"} onSelectionChange={handleSelectionChange} options={['CE','IT','CHEMICAL','ICT']}/>
                    <Dropdown name={"sem"} label={"Select Semester"} onSelectionChange={handleSelectionChange} options={[1,2,3,4,5,6,7,8]}/>
                    <Dropdown name={"batch"} label={"Select Batch"} options={['A','B']} onSelectionChange={handleSelectionChange} />
                    <Button label={"Add Semester"} onclick={handleSubmit}/>
                </form>
            </div>
        </>
    )
}