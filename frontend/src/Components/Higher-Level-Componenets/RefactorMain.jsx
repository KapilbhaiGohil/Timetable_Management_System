import RefactorBatchForm from "../Medium-Level-Components/RefactorBatchForm";
import RefactorSubbatchForm from "../Medium-Level-Components/RefactorSubbatchForm";
import RefactorDropdown from "../Small-Level-Componenets/RefactorDropdown";
import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/RefactorMain.scss"
import {useContext, useEffect, useState} from "react";
import {
    fetchDept,
    getAllInfoBySemAndDept,
    getSemByDept,
    getSubjectsBySemesterId
} from "../Medium-Level-Components/Functions";

import {AuthContext} from "../../AuthContext";
import TimeTableView from "./TimeTableView";
import Pdf from "./Pdf";
import {AddLecture, addLectureWithSem} from "../Medium-Level-Components/lecture";
import {roomAndTeacherAvailability, Rowconflict} from "../Medium-Level-Components/ConflictResolution";
const saveTimeTableInfo=async function (timeTableInfo,labAvailability,roomAvailability,teacherAvailability,setIsLoading){
    setIsLoading(true);
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
    }finally {
        setIsLoading(false);
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
const createEmptyTimetableObject = () => ({
    semRowsInfo: [],
});
export default function RefactorMain(){
    const [show,setShow] = useState(false);
    const [showLab,setShowLab] = useState(false);
    const [rsemOptions,setRSemOptions]=useState([]);
    const [rdeptOptions,setRDeptOptions] = useState([]);
    const [rsubOptions,setRSubOptions]=useState([]);
    const [rallinfo ,setRallInfo] = useState([]);
    const [tempDSS,setTempDss] = useState([]);
    const [timeTableInfo,setTimeTableInfo] = useState([]);
    const [labAvailability,setLabAvailability] = useState([]);
    const [roomAvailability,setRoomAvailability] =  useState([]);
    const [teacherAvailability,setTeacherAvailability] = useState([]);
    const [workload,setWorkload] = useState([]);
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const {setIsLoading} = useContext(AuthContext);
    useEffect(() => {
        async function helper(){
            let updated = [];
            console.log(updated);
            for (let i = 0; i < week_days.length; i++) {
                const newobject = createEmptyTimetableObject();
                newobject.day = week_days[i];
                updated[i] = newobject
            }
            await setTimeTableInfo(updated);
            setIsLoading(true);
            await fetchDept(setRDeptOptions);
            await getAllLabs(setLabAvailability,week_days);
            await getAllTeachers(setTeacherAvailability,week_days);
            await getAllClassrooms(setRoomAvailability,week_days);
            setIsLoading(false);
        }
        helper();
    }, []);
    useEffect(() => {
        setShow(false);
        setShowLab(false)
    }, [rsubOptions,rdeptOptions,rsemOptions]);
    const handleSelectionChange = async (event)=>{
        event.preventDefault();
        if(event.target.name==="dept"){
            if(event.target.value===""){
                setRSubOptions([])
                setRSemOptions([])
                setShow(false)
                window.alert("Select any Department")
            }else{
                setIsLoading(true)
                await getSemByDept(event.target.value,setRSemOptions);
                setIsLoading(false)
            }
        }else if(event.target.name==='sem'){
            const sem = rsemOptions.find((sem)=>sem.semNo===(parseInt(event.target.value)));
            setIsLoading(true)
            await getSubjectsBySemesterId(sem._id,setRSubOptions)
            setIsLoading(false)
        }else{
            setShowLab(false);
            setShow(false);
        }
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const dept = rdeptOptions.find((dept)=>dept.code===event.target.dept.value);
        const sem =  rsemOptions.find((sem)=>sem.semNo===parseInt(event.target.sem.value))
        const sub = rsubOptions.find((sub)=>sub.subName === event.target.sub.value);
        setIsLoading(true)
        const res = await getAllInfoBySemAndDept(sem._id,dept._id,setRallInfo);
        setIsLoading(false);
        if(res){
            setShow(true)
            setShowLab(true)
            setTempDss({dept,sem,sub});
        }

    }
    const handleAddLecture=(event)=>{
        event.preventDefault();
        const batch = rallinfo.batches.find((batch)=>batch.batchName===event.target.batch.value);
        const day_ind = week_days.findIndex((day)=>day===event.target.day.value);
        const teacher = rallinfo.teachers.find((t)=>t.shortName===event.target.teacher.value);
        const classroom = rallinfo.classrooms.find((c)=>c.classroom ===parseInt(event.target.classroom.value));
        const lecfrom = event.target.lecfrom.value;
        const lecto = event.target.lecto.value;
        const ind = timeTableInfo[day_ind].semRowsInfo.findIndex((data)=>data.sem.sem._id===tempDSS.sem._id && data.sem.dept._id===tempDSS.dept._id && data.sem.batch._id===batch._id);
        const updated = [...timeTableInfo];
        const lecdata = {sub:tempDSS.sub,teacher,classroom,lecfrom,lecto};
        const sem = {dept:tempDSS.dept,sem:tempDSS.sem,batch}
        if(ind === -1){
            updated[day_ind].semRowsInfo.push({sem:{dept:tempDSS.dept,batch:batch,sem:tempDSS.sem,},dataobj:{labsInfo:[],lecInfo:[]}})
            addLectureWithSem(updated,day_ind,setRoomAvailability,setTeacherAvailability,lecdata,sem,setWorkload,lecfrom,lecto,setTimeTableInfo);
        }else{
            const semRowIndex = ind===-1?timeTableInfo[day_ind].semRowsInfo.length-1:ind;
            AddLecture(lecdata,setTimeTableInfo,day_ind,semRowIndex,setRoomAvailability,setTeacherAvailability,sem,setWorkload)
        }
    }

    useEffect(() => {
        console.log("This is final time table info ------------------------------------");
        console.log("Time Table Info",timeTableInfo);
        console.log("teacher info",teacherAvailability)
        console.log("Roome info",roomAvailability)
        console.log("Lab info",labAvailability)
        console.log("workload info ",workload)
        console.log("alldata ",rallinfo)
    }, [timeTableInfo,roomAvailability]);
    useEffect(() => {
        console.log(timeTableInfo)
    }, [timeTableInfo]);
    return(
        <div className={"main-outer"}>
            <div className={"main-table"}>
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Select Department</th>
                                <th>Select Semester</th>
                                <th>Select Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/*<td><Dropdown name={"dept"} onSelectionChange={handleSelectionChange} options={rdeptOptions.map((dept)=>dept.code)}/></td>*/}
                                <td><RefactorDropdown name={"dept"}  onSelectionChange={handleSelectionChange} options={rdeptOptions.map((dept)=>dept.code)}/></td>
                                <td><RefactorDropdown name={"sem"} onSelectionChange={handleSelectionChange} options={rsemOptions.map((sem)=>sem.semNo)}/></td>
                                <td><RefactorDropdown name={"sub"} onSelectionChange={handleSelectionChange}  options={rsubOptions.map((sub)=>sub.subName)}/></td>
                                <td><Button label={"Search"} type={'Submit'} /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            {show && <RefactorBatchForm dayoptions={week_days} handleBatchSubmit={handleAddLecture} classrooms={rallinfo.classrooms.map((clss)=>clss.classroom)} teacheroptions={rallinfo.teachers.map((teacher)=>teacher.shortName)} batches={rallinfo.batches.map((batch)=>batch.batchName)}/>}
                {showLab && <RefactorSubbatchForm dayoptions={week_days} teacheroptions={rallinfo.teachers.map((teacher)=>teacher.shortName)} labs={rallinfo.labs.map((lab)=>lab.lab)} batches={rallinfo.batches.flatMap(batch=>batch.subBatch)}/>}
            <TimeTableView
                timeTableInfo={timeTableInfo}
                workload={workload}
                labAvailability={labAvailability}
                roomAvailability={roomAvailability}
                teacherAvailability={teacherAvailability}
                setLabAvailability={setLabAvailability}
                setTimeTableInfo={setTimeTableInfo}
                setWorkload={setWorkload}
                setTeacherAvailability={setTeacherAvailability}
                setRoomAvailability={setRoomAvailability}
            />
        </div>
    )
}