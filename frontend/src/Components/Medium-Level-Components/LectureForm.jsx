import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import "../../Css/Medium-Level-Css/LectureForm.scss"
import Button from "../Small-Level-Componenets/Button";
import {useState} from "react";


export default function LectureForm({sendDataToParent,allDataInfo}){
    const [lec,setLec]=useState({sub:"",teacher:"",classroom:"",lecfrom:"",lecto:""});
    const handleSelectionChange = (event)=>{
        event.preventDefault();
        setLec({
            ...lec,
            [event.target.name] : event.target.value,
        });
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const obj={
            sub:allDataInfo.subjects.find((s)=>s.subCode===lec.sub),
            teacher:allDataInfo.teachers.find((t)=>t.shortName===lec.teacher),
            classroom:allDataInfo.classrooms.find((c)=>c.classroom===parseInt(lec.classroom)),
            lecfrom:lec.lecfrom,
            lecto:lec.lecto
        }
        console.log("final lecture obj : ",obj);
        sendDataToParent(obj);
    }
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LECTURE DETAILS</h1>
                <form onSubmit={handleSubmit}>
                    <Dropdown name={"sub"} onSelectionChange={handleSelectionChange} label={"Select Subject"} options={allDataInfo.subjects.map((sub)=>sub.subCode)}/>
                    <Dropdown name={"teacher"} onSelectionChange={handleSelectionChange} label={"Select Teacher"} options={allDataInfo.teachers.map((teacher)=>teacher.shortName)}/>
                    <Dropdown name={"classroom"} onSelectionChange={handleSelectionChange} label={"Select Classroom"} options={allDataInfo.classrooms.map((c)=>c.classroom)}/>
                    <TimeInput name={"lec"} onChange={handleSelectionChange} label={"Selet Duration"}/>
                    <Button type={"submit"} label={"Add Lecture"}/>
                </form>
            </div>
        </>
    )
}