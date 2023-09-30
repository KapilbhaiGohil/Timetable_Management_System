import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useContext, useEffect, useState} from "react";
import {v4} from "uuid";
import Button from "../Small-Level-Componenets/Button";
import {AuthContext} from "../../AuthContext";
import Input from "../Small-Level-Componenets/Input";

export default function TimeTableView({timeTableInfo,setWorkload,saveTimeTableInfo,workload,labAvailability,roomAvailability,teacherAvailability,setTimeTableInfo,setLabAvailability,setRoomAvailability,setTeacherAvailability}){
    const [show,setShow] = useState(false);
    const[saveshow,setsaveshow] = useState(false);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const {setIsLoading} = useContext(AuthContext)
    useEffect(() => {
        console.log("This is final time table info ------------------------------------");
        console.log("Time Table Info",timeTableInfo);
        console.log("teacher info",teacherAvailability)
        console.log("Roome info",roomAvailability)
        console.log("Lab info",labAvailability)
        console.log("workload info ",workload)
    }, []);
    const handleDay = (event)=>{
        event.preventDefault();
        setTimeTableInfo(
            [
                ...timeTableInfo,
                {day:week_days[timeTableInfo.length],semRowsInfo:[]}
            ]
        );
        if(timeTableInfo.length>=5){
            setShow(false);
        }
    }
    return(
        <div className={"time-table-outer"}>
            {timeTableInfo.map((data,index)=>(<Day key={v4()} setTimeTableInfo={setTimeTableInfo} dayIndex={index}
                                                   dayData={timeTableInfo[index]} timeTableInfo={timeTableInfo}  day_name={data.day}
                                                   setWorkload={setWorkload} setLabAvailability={setLabAvailability}
                                                   setRoomAvailability={setRoomAvailability} setTeacherAvailability={setTeacherAvailability}/>))}
            {show && (
                <div className={"time-table-btn"}>
                    <Button onclick={handleDay} label={"Add Day"} />
                </div>
            )}
            <div className={"time-table-btn"}><Button label={"Save"} onclick={saveTimeTableInfo}/></div>
        </div>
    )
}