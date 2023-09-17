import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import Button from "../Small-Level-Componenets/Button";
import {useState} from "react";

export default function LabForm({onClick,sendDataToParent}){
    const [lab,setLab]=useState({sub_batch:"",sub:"",teacher:"",lab_no:"",labfrom:"",labto:""});
    const handleSelectionChange = (event)=>{
        event.preventDefault();
        setLab({
            ...lab,
            [event.target.name] : event.target.value,
        });
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        sendDataToParent(lab);
    }
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LAB DETAILS</h1>
                <form onSubmit={handleSubmit}>
                    <Dropdown name={"sub_batch"} onSelectionChange={handleSelectionChange} label={"Select Sub-Batch"} options={['A1','A2','A3','A4']}/>
                    <Dropdown name={"sub"} onSelectionChange={handleSelectionChange} label={"Select Lab-Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                    <Dropdown name={"teacher"} onSelectionChange={handleSelectionChange} label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                    <Dropdown name={"lab_no"} onSelectionChange={handleSelectionChange} label={"Select Lab"} options={[0,1,2,3]}/>
                    <TimeInput name={"lab"} onChange={handleSelectionChange} label={"Selet Duration"}/>
                    <Button type={"submit"} label={"Add Lab"}/>
                </form>
            </div>
        </>
    )
}