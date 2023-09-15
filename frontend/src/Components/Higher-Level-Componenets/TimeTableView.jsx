import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useState} from "react";
import Button from "../Small-Level-Componenets/Button";
export default function TimeTableView(){
    const [days,setDays]=useState([]);
    const [show,setShow] = useState(true);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
    const handleDay = (event)=>{
        event.preventDefault();
        setDays([
            ...days,
            <Day key={days.length} day_name={week_days[days.length]}/>
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