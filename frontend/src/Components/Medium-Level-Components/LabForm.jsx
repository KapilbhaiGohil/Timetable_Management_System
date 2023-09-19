import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import Button from "../Small-Level-Componenets/Button";
import {useState} from "react";

export default function LabForm({sendDataToParent,allDataInfo}){
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
        let obj = {
            sub_batch:lab.sub_batch,
            sub:allDataInfo.subjects.find((sub)=>sub.subCode===lab.sub),
            teacher:allDataInfo.teachers.find((teacher)=>teacher.shortName===lab.teacher),
            labInfo:allDataInfo.labs.find((ilab)=>ilab.lab===parseInt(lab.lab_no)),
            labfrom:lab.labfrom,
            labto:lab.labto
        }
        console.log("This is labform final object : ",obj);
        sendDataToParent(obj);
    }
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LAB DETAILS</h1>
                <form onSubmit={handleSubmit}>
                    <Dropdown name={"sub_batch"} onSelectionChange={handleSelectionChange} label={"Select Sub-Batch"} options={allDataInfo.batch.subBatch}/>
                    <Dropdown name={"sub"} onSelectionChange={handleSelectionChange} label={"Select Lab-Subject"} options={allDataInfo.subjects.map((sub)=>sub.subCode)}/>
                    <Dropdown name={"teacher"} onSelectionChange={handleSelectionChange} label={"Select Teacher"} options={allDataInfo.teachers.map((teacher)=>teacher.shortName)}/>
                    <Dropdown name={"lab_no"} onSelectionChange={handleSelectionChange} label={"Select Lab"} options={allDataInfo.labs.map((lab)=>lab.lab)}/>
                    <TimeInput name={"lab"} onChange={handleSelectionChange} label={"Selet Duration"}/>
                    <Button type={"submit"} label={"Add Lab"}/>
                </form>
            </div>
        </>
    )
}