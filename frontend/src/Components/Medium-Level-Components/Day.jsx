import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";

export default function Day({day_name,sendDataToParent,timeTableData}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const [semDeptBatchArr,setSemDeptBatchArr]=useState([]);
    const [semRowsInfo,setSemRowsInfo]=useState([]);
    useEffect(() => {
        if(timeTableData){
            console.log("received time table data")
            console.log(timeTableData)
            if(timeTableData.semRowsInfo)setSemRowsInfo(timeTableData.semRowsInfo);
            if(timeTableData.semDeptBatchArr)setSemDeptBatchArr(timeTableData.semDeptBatchArr);
        }
    }, []);
    useEffect(() => {
        console.log("semRowInfo Data")
        console.log(semRowsInfo);
    }, [semRowsInfo]);
    console.log(day_name)
    useEffect(() => {
        console.log("semDeptBatchArr Data")
        console.log(semDeptBatchArr);
    }, [semDeptBatchArr]);

    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromSemForm=(semDeptBatch)=>{
        const ind = semDeptBatchArr.findIndex((arr)=>(
            arr.batch._id === semDeptBatch.batch._id &&
            arr.dept._id === semDeptBatch.dept._id &&
            arr.sem._id === semDeptBatch.sem._id
        ))
        if(ind !== -1){
            const updateArr = [...semDeptBatchArr];
            updateArr[ind] = semDeptBatch;
            setSemDeptBatchArr(updateArr);
        }else{
            const updateArr = [...semDeptBatchArr]
            updateArr.push(semDeptBatch)
            setSemDeptBatchArr(updateArr)
        }
        setLec(false);
        setBtnMsg("Add Semester")
    }
    const handleDay = (event)=>{
        event.preventDefault();
    }
    const receiveDataFromSemRow=(index,dataObj,sem)=>{
        const updateSemRow = [...semRowsInfo];
        updateSemRow[index] = {dataObj,sem};
        setSemRowsInfo(updateSemRow);
    }
    const handleSave=(event)=>{
        event.preventDefault();
        console.log("hello world")
        sendDataToParent({day:day_name,semRowsInfo,semDeptBatchArr});
    }
    return(
    <div className={"day"}>
        <div className={"day-outer"}>
            <div className={"day-name"}>
                <label>{day_name}</label>
                <div>
                    <Button label={"Save"} onclick={handleSave} />
                </div>
            </div>
            <div className={"day-sem"}>
                {semDeptBatchArr && semDeptBatchArr.length>0 && semDeptBatchArr.map(
                    (sdp,index)=><SemRow  sendDataToDay={(newdata)=>receiveDataFromSemRow(index,newdata,sdp)} semRowInfo={semRowsInfo[index]} key={v4()} sem={sdp}/>
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