import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useEffect, useState} from "react";
import {v4} from "uuid";
import Button from "../Small-Level-Componenets/Button";
const saveTimeTableInfo=async function (timeTableInfo){
    try{
        const response = await fetch("/timetable/add",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({timeTableInfo}),
        });
        const data = await response.json();
        if(response.status === 200){
            window.alert(data.message);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
        console.log(e);
    }
}
export default function TimeTableView({data}){
    const [show,setShow] = useState(true);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const [timeTableInfo,setTimeTableInfo] = useState([]);
    // console.log("data")
    useEffect(() => {
        if(data)setTimeTableInfo(data.timeTableInfo);
    }, [data]);
    useEffect(() => {
        console.log("This is final time table info ------------------------------------");
        console.log(timeTableInfo);
    }, [timeTableInfo]);
    const handleDay = (event)=>{
        event.preventDefault();
        setTimeTableInfo(
            [
                ...timeTableInfo,
                {day:week_days[timeTableInfo.length],semRowsInfo:[]}
            ]
        );
        if(timeTableInfo.length===5){
            setShow(false);
        }
    }
    return(
        <div className={"time-table-outer"}>
            {timeTableInfo.map((data,index)=>(<Day key={v4()} setTimeTableInfo={setTimeTableInfo} dayIndex={index} dayData={timeTableInfo[index]} timeTableInfo={timeTableInfo}  day_name={data.day} />))}
            {show && (
                <div className={"time-table-btn"}>
                    <Button onclick={handleDay} label={"Add Day"} />
                </div>
            )}
            <div><Button label={"Save"} onclick={()=>saveTimeTableInfo(timeTableInfo)}/></div>
        </div>
    )
}