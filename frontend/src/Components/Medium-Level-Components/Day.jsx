import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";

export default function Day({day_name,sendDataToParent}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const [semDeptBatchArr,setSemDeptBatchArr]=useState([])
    const [semRowsInfo,setSemRowsInfo]=useState([]);
    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromSemForm=(sem,semDeptBatch)=>{
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
    const receiveDataFromSemRow=(dataObj)=>{
        const ind = semRowsInfo.findIndex(
            (sem)=>sem.sdb.batch._id===dataObj.sdb.batch._id &&
                sem.sdb.dept._id===dataObj.sdb.dept._id &&
                sem.sdb.sem._id===dataObj.sdb.sem._id
        )
        console.log("Index is ",ind)
        if(ind===-1){
            setSemRowsInfo([
                ...semRowsInfo,
                dataObj
            ])
        }else{
            setSemRowsInfo((prevState)=>{
                const updatedSemRow = [...prevState];
                updatedSemRow[ind]=dataObj;
                return updatedSemRow;
            })
        }
    }
    useEffect(() => {
        console.log("THIS IS THE ROW INFOS OBJECT",semRowsInfo)
    }, [semRowsInfo]);
    const handleSave=(event)=>{
        event.preventDefault();
        sendDataToParent({day_name,semRowsInfo})
    }
    return(
    <div className={"day"}>
        <div className={"day-outer"}>
            <div className={"day-name"}>
                <label>{day_name}</label>
                <div>
                    <Button label={"Save"} onclick={handleSave}/>
                </div>
            </div>
            <div className={"day-sem"}>
                {semDeptBatchArr.length>0 && semDeptBatchArr.map(
                    (sdp,index)=><SemRow prevSavedData={semRowsInfo[index]} sendRowInfoToParent={receiveDataFromSemRow} key={v4()} sem={sdp}/>
                )}
                <Button label={btnMsg} onclick={handleSem}/>
            </div>
            <div>
                {showLec && <SemForm sendDataToParent={receiveDataFromSemForm} />}
            </div>
        </div>
        <hr style={{width:"100%"}}/>
    </div>
    );
}