import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useEffect, useState} from "react";
import {v4} from "uuid";
import Button from "../Small-Level-Componenets/Button";
export default function TimeTableView(){
    const [show,setShow] = useState(true);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
    const [timeTableData,setTimeTableData] = useState([]);
    const [timeTableInfo,setTimeTableInfo] = useState([]);
    useEffect(() => {
        console.log("This is final time table info ------------------------------------");
        console.log(timeTableInfo);
    }, [timeTableInfo]);
    const receiveDataFromDay=(data)=>{
        console.log("heo fksldjflkj",data)
        const ind = timeTableData.findIndex((t)=>t.day===data.day);
        console.log(ind)
            if(ind!==-1){
                setTimeTableData((prevState)=>{
                    const updatedTimeTableData = [...prevState];
                    updatedTimeTableData[ind]=data;
                    return updatedTimeTableData;
                });
            }else{
                setTimeTableData([
                    ...timeTableData,
                   data
                ]);
            }
    }
    useEffect(() => {
        console.log("timetable daata info")
        console.log(timeTableData)
    }, [timeTableData]);
    const handleDay = (event)=>{
        event.preventDefault();
        setTimeTableData([
            ...timeTableData,
            {day:week_days[timeTableData.length]}
        ]);
        setTimeTableInfo(
            [
                ...timeTableInfo,
                {day:week_days[timeTableInfo.length],semRowsInfo:[]}
            ]
        );
    }
    return(
        <div className={"time-table-outer"}>
            {timeTableData.map((data,index)=>(<Day key={v4()} setTimeTableInfo={setTimeTableInfo} dayIndex={index} dayData={timeTableInfo[index]} timeTableInfo={timeTableInfo} timeTableData={timeTableData[index]} day_name={data.day} sendDataToParent={receiveDataFromDay}/>))}
            {show && (
                <div className={"time-table-btn"}>
                    <Button onclick={handleDay} label={"Add Day"} />
                </div>
            )}
        </div>
    )
}