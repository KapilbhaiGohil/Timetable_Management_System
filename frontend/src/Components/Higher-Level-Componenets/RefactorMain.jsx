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
import {convertAndAddLectInfo} from "./Converter"

import {AuthContext} from "../../AuthContext";
import TimeTableView from "./TimeTableView";
import Pdf from "./Pdf";
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
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const {setIsLoading} = useContext(AuthContext);
    useEffect(() => {
        let updated = [];
        console.log(updated);
        for (let i = 0; i < week_days.length; i++) {
            const newobject = createEmptyTimetableObject();
            newobject.day = week_days[i];
            updated[i] = newobject
        }
        setTimeTableInfo(updated);
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
            setTempDss({dept,sem,sub});
        }

    }
    const handleAddLecture=async (event)=>{
        event.preventDefault();
        const batch = rallinfo.batches.find((batch)=>batch.batchName===event.target.batch.value);
        const day_ind = week_days.findIndex((day)=>day===event.target.day.value);
        const teacher = rallinfo.teachers.find((t)=>t.shortName===event.target.teacher.value);
        const classroom = rallinfo.classrooms.find((c)=>c.classroom ===parseInt(event.target.classroom.value));
        const lecfrom = event.target.lecfrom.value;
        const lecto = event.target.lecto.value;
        console.log(batch,week_days[day_ind],teacher,classroom,lecfrom,lecto);
        const ind = timeTableInfo[day_ind].semRowsInfo.findIndex((data)=>data.sem.sem._id===tempDSS.sem._id && data.sem.dept._id===tempDSS.dept._id && data.sem.batch._id===batch._id);
        console.log("Index is ",ind)
        if(ind === -1){
            let lecinfo = [];
            const updated = [...timeTableInfo];
            convertAndAddLectInfo(lecinfo,classroom,lecfrom,lecto,tempDSS.sub,teacher);
            updated[day_ind].semRowsInfo.push({sem:{dept:tempDSS.dept,batch:batch,sem:tempDSS.sem,},dataobj:{labsInfo:[],lecInfo:lecinfo}})
            setTimeTableInfo(updated)
        }else{
            console.log(timeTableInfo[day_ind].semRowsInfo[ind])
        }
    }
    useEffect(() => {
        async function helper(){
            setIsLoading(true);
            await fetchDept(setRDeptOptions);
            setIsLoading(false);
        }
        helper();
    }, []);
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
            {showLab && <RefactorSubbatchForm/>}
            <TimeTableView data={{timeTableInfo}}/>
        </div>
    )
}