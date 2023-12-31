import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import { useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";

export default function Day({dayData,dayIndex,setTimeTableInfo,setWorkload,setLabAvailability,setRoomAvailability,setTeacherAvailability}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromSemForm=(semDeptBatch)=>{
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState];
            const isPresent = updated[dayIndex].semRowsInfo.find((data)=>data.sem.sem._id===semDeptBatch.sem._id && data.sem.dept._id===semDeptBatch.dept._id && data.sem.batch._id===semDeptBatch.batch._id);
            if(isPresent){
                window.alert("Selected Sem Row Already Exist");
                return prevState;
            }else{
                updated[dayIndex].semRowsInfo.push({sem:semDeptBatch,dataobj:{labsInfo:[],lecInfo:[]}})
                return updated;
            }
        })
        setLec(false);
        setBtnMsg("Add Semester")
    }
    return(
    <div className={"day"}>
        <div className={"day-outer"}>
            <div className={"day-name"}>
                <label>{dayData.day}</label>
            </div>
            <div className={"day-sem"}>
                {dayData.semRowsInfo.length>0 && dayData.semRowsInfo.map(
                        (e,semRowIndex)=><SemRow key={v4()} dataobj={e.dataobj} sem={e.sem} semRowIndex={semRowIndex} setTimeTableInfo={setTimeTableInfo} setWorkload={setWorkload} dayIndex={dayIndex} setTeacherAvailability={setTeacherAvailability} setLabAvailability={setLabAvailability} setRoomAvailability={setRoomAvailability}/>
                    )
                }
                <Button label={btnMsg} onclick={handleSem}/>
            </div>
            <div>
                {showLec && <SemForm  sendDataToParent={receiveDataFromSemForm} />}
            </div>
        </div>
        <hr style={{width:"95.6vw"}}/>
    </div>
    );
}