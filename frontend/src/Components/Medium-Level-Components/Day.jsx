import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";

export default function Day({day_name}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const [semDeptBatchArr,setSemDeptBatchArr]=useState([])
    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromChild=(sem,semDeptBatch)=>{
        console.log("from day.jsx line 20 semDeptBatch",semDeptBatch)
        const updateArr = [...semDeptBatchArr]
        updateArr.push(semDeptBatch)
        setSemDeptBatchArr(updateArr)
        setLec(false);
        setBtnMsg("Add Semester")
    }
    useEffect(()=>{
        console.log("This is sem dept batch arr",semDeptBatchArr)
    },[semDeptBatchArr])
    const handleDay = (event)=>{
        event.preventDefault();
    }
    return(
    <div className={"day"}>
        <div className={"day-outer"}>
            <div className={"day-name"}>
                <label>{day_name}</label>
            </div>
            <div className={"day-sem"}>
                {/*{semesters.length >0 && semesters.map(*/}
                {/*    (sem_component,index)=><SemRow key={v4()} sem={sem_component.sem}/>*/}
                {/*)}*/}
                {semDeptBatchArr.length>0 && semDeptBatchArr.map(
                    (sdp)=><SemRow key={v4()} sem={sdp}/>
                )}
                <Button label={btnMsg} onclick={handleSem}/>
            </div>
            <div>
                {showLec && <SemForm sendDataToParent={receiveDataFromChild} />}
            </div>
        </div>
        <hr style={{width:"100%"}}/>
    </div>
    );
}