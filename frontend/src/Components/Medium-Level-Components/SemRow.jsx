import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
export default function SemRow({sem}){
    const [lectures,setLectures] = useState([]);
    const [labs,setLabs] = useState([]);
    const [showLabForm,setShowLabForm] = useState(false);
    const [showLecForm,setShowLecForm] = useState(false);
    const handleLabOnclick=(event)=>{
        event.preventDefault();
        setShowLabForm(!showLabForm);
        setShowLecForm(false);
    }
    const handleLecOnclick=(event)=>{
        event.preventDefault();
        setShowLecForm(!showLecForm);
        setShowLabForm(false);
    }
    const receiveDataFromLec = (lec_data)=>{
        console.log(lec_data)
        setLectures([
            ...lectures,
            <LectureDetails key={v4()} lec_data={lec_data}/>
        ]);
        // setShowLecForm(false);
    }
    const receiveDataFromLab = (lab_data)=>{
        console.log(lab_data)
        setLectures([
            ...lectures,
            <LabDetails key={v4()} lab_data={lab_data}/>
        ]);
        // setShowLecForm(false);
    }
    return(
        <div className={"sem-row-outer"}>
            <div className={"sem-row-info"}>
                <div className={"sem-row-dept"}>
                    <label>{sem.dept}</label>
                </div>
                <hr/>
                <div className={"sem-row-sem"}>
                    <label>{sem.sem} - {sem.batch}</label>
                </div>
            </div>
            {lectures.length>0 && lectures.map((lec)=>lec)}
            <div>
                <Button label={"Add Lab"} onclick={handleLabOnclick}/>
                <Button label={"Add Lecture"} onclick={handleLecOnclick}/>
            </div>
            {showLabForm && <LabForm sendDataToParent={receiveDataFromLab}/>}
            {showLecForm && <LectureForm sendDataToParent={receiveDataFromLec}/>}
            {/*<LectureDetails/>*/}
        </div>
    )
}