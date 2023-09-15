import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import "../../Css/Medium-Level-Css/LectureForm.scss"
import Button from "../Small-Level-Componenets/Button";
import {useState} from "react";

export default function LectureForm({batches,sendDataToParent}){
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
        // console.log(lec);
        sendDataToParent(lec);
    }
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LECTURE DETAILS</h1>
                <form onSubmit={handleSubmit}>
                    <Dropdown name={"sub"} onSelectionChange={handleSelectionChange} label={"Select Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                    <Dropdown name={"teacher"} onSelectionChange={handleSelectionChange} label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                    <Dropdown name={"classroom"} onSelectionChange={handleSelectionChange} label={"Select Classroom"} options={[0,1,2,3]}/>
                    <TimeInput name={"lec"} onChange={handleSelectionChange} label={"Selet Duration"}/>
                    <Button type={"submit"} label={"Add Lecture"}/>
                </form>
            </div>
        </>
    )
}