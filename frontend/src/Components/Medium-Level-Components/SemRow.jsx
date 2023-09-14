import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureLabDetails from "./LectureLabDetails";
import Button from "../Small-Level-Componenets/Button"
import {useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
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
    const handleLecArr=(event)=>{
        event.preventDefault();
        console.log(event.target)

    }
    const handleLabArr =(event)=>{
        event.preventDefault();
        console.log(event.target)
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
            <div>
                <Button label={"Add Lab"} onclick={handleLabOnclick}/>
                <Button label={"Add Lecture"} onclick={handleLecOnclick}/>
            </div>
            {showLabForm && <LabForm  onSubmit={handleLabArr}/>}
            {showLecForm && <LectureForm onSubmit={handleLecArr}/>}
            {/*<LectureLabDetails/>*/}
        </div>
    )
}