import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useContext, useEffect, useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
import {
    removeLabAvailability, removeLabAvailabilityOnRowDelete,
    removeRoomAvailabilityOnRowDelete,
    removeTeacherAvailability,
    removeTeacherAvailabilityOnRowDelete,
} from "./ConflictResolution"
import {AuthContext} from "../../AuthContext";
import {AddLecture, DeleteLecture} from "./Lecture";
import {AddLab} from "./Lab";
const fetchAllDataInfo = async(semId,deptId,setAllDataInfo,batch)=>{
    try{
        const response = await fetch("/custom/getAllDataInfo",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({semId,deptId})
        })
        const data =await response.json();
        if(response.ok){
            data.batch = batch;
            setAllDataInfo(data);
        }else{
            setAllDataInfo([]);
            window.alert(data.message);
        }
    }catch(e){
        setAllDataInfo([]);
        console.log(e);
    }
}

export default function SemRow({sem,dataobj,setTimeTableInfo,dayIndex,semRowIndex,setWorkload,setLabAvailability,setRoomAvailability,setTeacherAvailability}){
    const [showForm,setShowForm] = useState(false);
    const [allDataInfo,setAllDataInfo] = useState();
    const {setIsLoading} = useContext(AuthContext)
    const toggleForm=(event)=>{
        event.preventDefault();
        setShowForm(!showForm);
    }
    useEffect( () => {
        async function fetch(){
            const semId = sem.sem._id;
            const deptId = sem.dept._id;
            await fetchAllDataInfo(semId,deptId,setAllDataInfo,sem.batch);
        }
        fetch();
    }, [fetchAllDataInfo]);
    const receiveDataFromLab = (lab_data) => {
        AddLab(dataobj,lab_data,setTimeTableInfo,dayIndex,semRowIndex,setLabAvailability,setTeacherAvailability,sem);
    };
    const handleLabRemove=(labFrom,labTo)=>{
        const updatedLabs = [...dataobj.labsInfo];
        const index = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===labFrom && lab.labto===labTo);
        console.log("this is index ",index,updatedLabs)
        const labToBeDeleted = updatedLabs[index].labs[updatedLabs[index].labs.length-1];
        console.log(labToBeDeleted)
        if(updatedLabs[index] && updatedLabs[index].labs){
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                removeLabAvailability(setLabAvailability,labToBeDeleted,labFrom,labTo,dayIndex)
                removeTeacherAvailability(setTeacherAvailability,labToBeDeleted.teacher._id,labFrom,labTo,dayIndex)
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo[index].labs.pop();
                return updated;
            })
        }
        if(updatedLabs[index].labs.length===0){
            const finalLabs = dataobj.labsInfo.filter((lab)=>(lab.labfrom!==labFrom || lab.labto!==labTo));
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo = finalLabs;
                return updated;
            })
        }else{
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo.labs = updatedLabs;
                return updated;
            })
        }
    }
    const handleLabDelete=(labFrom,labTo)=>{
        const index = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===labFrom && lab.labto === labTo);
        const updatedLab = [...dataobj.labsInfo];
        const lab = updatedLab[index];
        console.log("This is a lab inside semrow lab delete",lab)
        //both require changes
        for (let i = 0; i < lab.labs.length; i++) {
            removeLabAvailability(setLabAvailability,lab.labs[i],labFrom,labTo,dayIndex)
            removeTeacherAvailability(setTeacherAvailability,lab.labs[i].teacher._id,labFrom,labTo,dayIndex)
        }
        updatedLab.splice(index,1);
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState]
            updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo = updatedLab;
            return updated;
        })
    }
    const receiveDataFromLec = (lec_data)=>{
        AddLecture(lec_data,setTimeTableInfo,dayIndex,semRowIndex,setRoomAvailability,setTeacherAvailability,sem,setWorkload);
    }
    const handleLecDelete=(lecFrom,lecTo)=>{
        DeleteLecture(dataobj,lecFrom,lecTo,setTimeTableInfo,dayIndex,semRowIndex,setRoomAvailability,setTeacherAvailability,setWorkload);
    }
    const handleSemRowDelete = async ()=>{
        const ok = window.confirm("Are you sure to delete ? ");
        if(ok){
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState];
                updated[dayIndex].semRowsInfo = updated[dayIndex].semRowsInfo.filter((o)=>o.sem!==sem);
                removeTeacherAvailabilityOnRowDelete(setTeacherAvailability,sem,dayIndex);
                removeRoomAvailabilityOnRowDelete(setRoomAvailability,sem,dayIndex);
                removeLabAvailabilityOnRowDelete(setLabAvailability,sem,dayIndex)
                return updated;
            });
        }
    }
    return(
        <div className={"sem-row"}>
            {showForm && <div className={"sem-row-forms"}>
                <div className={"sem-row-forms-div"}>
                     <LabForm allDataInfo={allDataInfo} sendDataToParent={receiveDataFromLab}/>
                </div>
                <div className={"sem-row-forms-div"}>
                    <LectureForm allDataInfo={allDataInfo} sendDataToParent={receiveDataFromLec}/>
                </div>
                <div className={"sem-row-forms-btn"}>
                    <Button label={"Close"} onclick={toggleForm}/>
                </div>
            </div>}
            <div className={"sem-row-outer"}>
                <div className={"sem-row-info"}>
                    <div className={"sem-row-dept"}>
                        <label>{sem.dept.code}</label>
                    </div>
                    <hr/>
                    <div className={"sem-row-sem"}>
                        <label>{sem.sem.semNo} - {sem.batch.batchName}</label>
                    </div>
                    <div className={"sem-row-info-btn"}>
                        <Button label={"Delete"} onclick={handleSemRowDelete}/>
                        <Button label={"Forms"} onclick={toggleForm}/>
                    </div>
                </div>
                {dataobj.lecInfo.length>0 && dataobj.lecInfo.map((lec)=><LectureDetails  key={v4()} onDelete={()=>handleLecDelete(lec.data.lecfrom,lec.data.lecto)} lec_data={lec.data}/>)}
                {dataobj.labsInfo.length > 0 && dataobj.labsInfo.map((lab)=><LabDetails  key={v4()} onDelete={()=>handleLabDelete(lab.labfrom,lab.labto)} onRemove={()=>handleLabRemove(lab.labfrom,lab.labto)} innerLabs={lab.labs} lab_data={lab} />)}
            </div>
        </div>
    )
}