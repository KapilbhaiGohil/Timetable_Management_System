import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
const fetchAllDataInfo=async(semId,deptId,setAllDataInfo,batch)=>{
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
export default function SemRow({sem,dataobj,setTimeTableInfo,dayIndex,semRowIndex}){
    const [showForm,setShowForm] = useState(false);
    const [allDataInfo,setAllDataInfo] = useState();
    console.log("received data into sem row ----------------------")
    useEffect(() => {
        console.log("Lecture info")
        console.log(dataobj.lecInfo)
    }, [dataobj.lecInfo]);
    useEffect(() => {
        console.log("labs info")
        console.log(dataobj.labsInfo)
    }, [dataobj.labsInfo]);
    const toggleForm=(event)=>{
        event.preventDefault();
        setShowForm(!showForm);
    }
    useEffect(() => {
        const semId = sem.sem._id;
        const deptId = sem.dept._id;
        fetchAllDataInfo(semId,deptId,setAllDataInfo,sem.batch);
    }, []);
    const receiveDataFromLab = (lab_data) => {
        const ind = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===lab_data.labfrom && lab.labto===lab_data.labto);
        if (ind !== -1) {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo[ind] = lab_data;
                return updated;
            })
        } else {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo.push(lab_data);
                return updated;
            })
        }
    };
    const handleLabRemove=(labFrom,labTo)=>{
        const updatedLabs = [...dataobj.labsInfo];
        const index = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===labFrom && lab.labto===labTo);
        if(updatedLabs[index] && updatedLabs[index].labs){
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo.pop();
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
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo = updatedLabs;
                return updated;
            })
        }
    }
    const handleLabDelete=(labFrom,labTo)=>{
        const index = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===labFrom && lab.labto === labTo);
        const updatedLab = [...dataobj.labsInfo];
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
            updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo.push({data:lec_data});
            return updated;
        })
    }
    const handleLecDelete=(lecFrom,lecTo)=>{
        const index = dataobj.lecInfo.findIndex((lec)=>(lec.data.lecfrom===lecFrom && lec.data.lecto===lecTo));
        const updatedLec = dataobj.lecInfo.filter((lec,ind)=>ind!==index);
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState]
            updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo = updatedLec;
            return updated;
        })
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
                        <Button label={"Save"} />
                        <Button label={"Forms"} onclick={toggleForm}/>
                    </div>
                </div>
                {dataobj.lecInfo.length>0 && dataobj.lecInfo.map((lec)=><LectureDetails  key={v4()} onDelete={()=>handleLecDelete(lec.data.lecfrom,lec.data.lecto)} lec_data={lec.data}/>)}
                {dataobj.labsInfo.length > 0 && dataobj.labsInfo.map((lab)=><LabDetails  key={v4()} onDelete={()=>handleLabDelete(lab.labfrom,lab.labto)} onRemove={()=>handleLabRemove(lab.labfrom,lab.labto)} innerLabs={lab.labs} lab_data={lab} />)}
            </div>
        </div>
    )
}