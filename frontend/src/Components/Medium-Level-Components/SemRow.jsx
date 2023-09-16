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
    const [showForm,setShowForm] = useState(false);
    const toggleForm=(event)=>{
        event.preventDefault();
        setShowForm(!showForm);
    }
    const receiveDataFromLec = (lec_data)=>{
        console.log(lec_data)
        setLectures([
            ...lectures,
            <LectureDetails  key={v4()} lec_data={lec_data}/>
        ]);
        setShowLecForm(false);
    }
    const receiveDataFromLab = (lab_data)=>{
        console.log(lab_data)
        setLabs([
            ...labs,
            <LabDetails key={v4()} lab_data={lab_data}/>
        ]);
        setShowLabForm(false);
    }
    return(
        <div className={"sem-row"}>
            {showForm && <div className={"sem-row-forms"}>
                <div className={"sem-row-forms-div"}>
                     <LabForm sendDataToParent={receiveDataFromLab}/>
                </div>
                <div className={"sem-row-forms-div"}>
                    <LectureForm sendDataToParent={receiveDataFromLec}/>
                </div>
            </div>}
            <div className={"sem-row-outer"}>
                <div className={"sem-row-info"}>
                    <div className={"sem-row-dept"}>
                        <label>{sem.dept}</label>
                    </div>
                    <hr/>
                    <div className={"sem-row-sem"}>
                        <label>{sem.sem} - {sem.batch}</label>
                    </div>
                    <div className={"sem-row-info-btn"}>
                        <Button label={"Show Forms"} onclick={toggleForm}/>
                    </div>
                </div>
                {lectures.length>0 && lectures.map((lec)=>lec)}
                {labs.length > 0 && labs.map((lab)=>lab)}
            </div>
        </div>
    )
}