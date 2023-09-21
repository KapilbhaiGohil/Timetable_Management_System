import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";

export default function Day({dayData,dayIndex,setTimeTableInfo}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const [semRowsInfo,setSemRowsInfo]=useState([]);
    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromSemForm=(semDeptBatch)=>{
        setTimeTableInfo((prevState)=>{
            console.log("received prevstate from timetable view for each day : -------------------",prevState)
            const updated = [...prevState];
            updated[dayIndex].semRowsInfo.push({sem:semDeptBatch,dataobj:{labsInfo:[],lecInfo:[]}})
            return updated;
        })
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
    useEffect(() => {
        console.log("---------------------------------------------------")
        console.log("this is a day data");
        console.log(dayData)
    }, [dayData]);
    return(
    <div className={"day"}>
        <div className={"day-outer"}>
            <div className={"day-name"}>
                <label>{dayData.day}</label>
                <div>
                    <Button label={"Save"}  />
                </div>
            </div>
            <div className={"day-sem"}>
                {dayData.semRowsInfo.length>0 && dayData.semRowsInfo.map(
                        (e,semRowIndex)=><SemRow dataobj={e.dataobj} sem={e.sem} semRowIndex={semRowIndex} setTimeTableInfo={setTimeTableInfo} dayIndex={dayIndex}/>
                    )
                }
                <Button label={btnMsg} onclick={handleSem}/>
            </div>
            <div>
                {showLec && <SemForm  sendDataToParent={receiveDataFromSemForm} />}
            </div>
        </div>
        <hr style={{width:"100%"}}/>
    </div>
    );
}