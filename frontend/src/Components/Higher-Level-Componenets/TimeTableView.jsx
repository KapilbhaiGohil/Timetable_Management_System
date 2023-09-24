import "../../Css/Higher-Level-Css/TImeTableView.scss"
import Day from "../Medium-Level-Components/Day";
import {useEffect, useState} from "react";
import {v4} from "uuid";
import Button from "../Small-Level-Componenets/Button";
const saveTimeTableInfo=async function (timeTableInfo,labAvailability,roomAvailability,teacherAvailability){
    try{
        const response = await fetch("/timetable/add",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({timeTableInfo,labAvailability,roomAvailability,teacherAvailability}),
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
const getAllTeachers=async(setTeachresAvailability,week_days)=>{
    try{
        const res = await fetch("/teacher/getAllTeacher",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        if(res.status===200){
            let finaldata = [];
            for (let i = 0; i < week_days.length; i++) {
                const dayData = { day: week_days[i], data: await JSON.parse(JSON.stringify(data)) };
                finaldata.push(dayData);
            }
            setTeachresAvailability(finaldata);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }
}
const getAllLabs=async(setLabsAvailability,week_days)=>{
    try{
        const res = await fetch("/lab/getAllLabs",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        if(res.status===200){
            let finaldata = [];
            for (let i = 0; i < week_days.length; i++) {
                const dayData = { day: week_days[i], data: await JSON.parse(JSON.stringify(data)) };
                finaldata.push(dayData);
            }
            setLabsAvailability(finaldata);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }
}
const getAllClassrooms=async(setClassroomsAvailability,week_days)=>{
    try{
        const res = await fetch("/class/getAllClassrooms",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        if(res.status===200){
            let finaldata = [];
            for (let i = 0; i < week_days.length; i++) {
                const dayData = { day: week_days[i], data:await JSON.parse(JSON.stringify(data)) };
                finaldata.push(dayData);
            }
            setClassroomsAvailability(finaldata);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }
}
export default function TimeTableView({data}){
    const [show,setShow] = useState(true);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const [timeTableInfo,setTimeTableInfo] = useState([]);
    const [labAvailability,setLabAvailability] = useState([]);
    const [roomAvailability,setRoomAvailability] =  useState([]);
    const [teacherAvailability,setTeacherAvailability] = useState([]);
    const [workload,setWorkload] = useState([]);
    useEffect(() => {
        if(data){
            console.log(data);
            setTimeTableInfo(data.timeTableInfo);
            setLabAvailability(data.labAvailability)
            setRoomAvailability(data.roomAvailability)
            setTeacherAvailability(data.teacherAvailability)
            if(data.timeTableInfo.length>=5){
                setShow(false);
            }
        }else{
            async function helper(){
                await getAllLabs(setLabAvailability,week_days);
                await getAllTeachers(setTeacherAvailability,week_days);
                await getAllClassrooms(setRoomAvailability,week_days);
            }
            helper();
        }
    }, [data]);
    useEffect(() => {
        console.log("This is final time table info ------------------------------------");
        console.log(timeTableInfo);
        console.log(teacherAvailability)
        console.log(roomAvailability)
        console.log(labAvailability)
        console.log(workload)
    }, [timeTableInfo]);
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
            <div><Button label={"Save"} onclick={()=>saveTimeTableInfo(timeTableInfo,labAvailability,roomAvailability,teacherAvailability)}/></div>
        </div>
    )
}