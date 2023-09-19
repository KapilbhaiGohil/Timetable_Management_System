import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useEffect, useState} from "react";
import Button from "../Small-Level-Componenets/Button";
export default function TimeTableView(){
    const [days,setDays]=useState([]);
    const [show,setShow] = useState(true);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
    const [dayInfo,setDayInfo] = useState([]);
    const receiveDataFromDay=(dayObj)=>{
        const ind = dayInfo.findIndex((d)=>d.day_name===dayObj.day_name);
        if(ind!==-1){
            setDayInfo((prevState)=>{
                const updatedDay = [...prevState];
                updatedDay[ind]=dayObj;
                return updatedDay;
            })
        }else{
            setDayInfo([
                ...dayInfo,
                dayObj
            ])
        }
    }
    useEffect(() => {
        console.log("Day info",dayInfo)
    }, [dayInfo]);
    const handleDay = (event)=>{
        event.preventDefault();
        setDays([
            ...days,
            <Day key={days.length} sendDataToParent={receiveDataFromDay} day_name={week_days[days.length]}/>
        ]);
        if(days.length===4){
            setShow(false);
        }
    }
    return(
        <div className={"time-table-outer"}>
            {days.map((day)=>day)}
            {show && <div className={"time-table-btn"}><Button onclick={handleDay} label={"Add Day"} /></div>}
        </div>
    )
}