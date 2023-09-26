import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useContext, useEffect, useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
import {
    labsAndTeacherAvailability, removeLabAvailability, removeLabAvailabilityOnRowDelete,
    removeRoomAvailability,
    removeRoomAvailabilityOnRowDelete,
    removeTeacherAvailability,
    removeTeacherAvailabilityOnRowDelete,
    roomAndTeacherAvailability,
    Rowconflict,
    timeConflict
} from "./ConflictResolution"
import {AuthContext} from "../../AuthContext";
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
        const ind = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===lab_data.labfrom && lab.labto===lab_data.labto);
        if (ind !== -1) {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState];
                const  res = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,lab_data,sem,dayIndex);
                if(res.conflict){
                    window.alert(res.message);
                    return updated;
                }else{
                    updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo[ind].labs.push(lab_data);
                    return updated;
                }
            });
        } else {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                const labs = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo;
                const lectures = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo;
                const res = Rowconflict(labs,lectures,lab_data.labfrom,lab_data.labto);
                if(res.conflict){window.alert(res.message);return prevState}
                else{
                    const res2 = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,lab_data,sem,dayIndex);
                    if(res2.conflict){
                        window.alert(res2.message);
                        return updated;
                    }else{
                        updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo =  [ ...updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo ,{labs:[lab_data],labfrom: lab_data.labfrom,labto:lab_data.labto}];
                        return updated;
                    }
                }
            })
        }
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
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState]
            const lectures = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo;
            const labs = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo;
            const res2 = Rowconflict(labs,lectures,lec_data.lecfrom,lec_data.lecto);
            if(res2.conflict){
                window.alert(res2.message);
                return prevState;
            }else{
                const res = roomAndTeacherAvailability(setRoomAvailability,setTeacherAvailability,lec_data,sem,dayIndex)
                if(res.conflict){window.alert(res.message);return prevState}
                else{
                    updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo.push({data:lec_data});
                    setWorkload((prevWorkload)=>{
                        const workload = [...prevWorkload];
                        const pos = workload.findIndex((work)=>work.id===lec_data.teacher._id);
                        if(pos!==-1){
                            console.log("position is ",pos)
                            workload[pos].lectures = [...workload[pos].lectures,{lec_data}]
                        }else{
                            workload.push({id:lec_data.teacher._id,labs:[],lectures:[{lec_data}]})
                        }
                        return workload;
                    })
                    return updated;
                }
            }
        })
    }
    const handleLecDelete=(lecFrom,lecTo)=>{
        const index = dataobj.lecInfo.findIndex((lec)=>(lec.data.lecfrom===lecFrom && lec.data.lecto===lecTo));
        const updatedLec = dataobj.lecInfo.filter((lec,ind)=>ind!==index);
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState]
            const lec = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo[index];
            updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo = updatedLec;
            removeRoomAvailability(setRoomAvailability,lec,lecFrom,lecTo,dayIndex);
            removeTeacherAvailability(setTeacherAvailability,lec.data.teacher._id,lecFrom,lecTo,dayIndex);
            setWorkload((prevWorkload)=>{
                const workload = [...prevWorkload];
                const tid = lec.data.teacher._id;
                const wid = workload.findIndex((work)=>work.id===tid);
                workload[wid].lectures = workload[wid].lectures.filter((lec)=>lec.lec_data.lecfrom!==lecFrom && lec.lec_data.lecto!==lecTo);
                return workload;
            })
            return updated;
        });
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
                <div>
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