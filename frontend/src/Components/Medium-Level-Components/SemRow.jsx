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
export default function SemRow({sem,sendRowInfoToParent,prevSavedData}){
    console.log("semRow received object",sem)
    const [showForm,setShowForm] = useState(false);
    const [allDataInfo,setAllDataInfo] = useState();
    const [labsInfo,setLabsInfo]=useState([]);
    const [lecInfo,setLecInfo]=useState([]);
    console.log("received presaved data",prevSavedData);
    useEffect(() => {
        if(prevSavedData !== undefined){
            setLabsInfo(prevSavedData.labsInfo);
            setLecInfo(prevSavedData.lecInfo);
        }
    }, [prevSavedData]);
    const toggleForm=(event)=>{
        event.preventDefault();
        setShowForm(!showForm);
    }
    const receiveDataFromLec = (lec_data)=>{
        setLecInfo([
            ...lecInfo,
            {data:lec_data}
        ]);
    }
    useEffect(() => {
        const semId = sem.sem._id;
        const deptId = sem.dept._id;
        console.log(semId,deptId)
        fetchAllDataInfo(semId,deptId,setAllDataInfo,sem.batch);
    }, []);
    useEffect(() => {
        console.log("this is all data info object",allDataInfo)
    }, [allDataInfo]);
    const receiveDataFromLab = (lab_data) => {
        const ind = labsInfo.findIndex((lab)=>lab.labfrom===lab_data.labfrom && lab.labto===lab_data.labto);
        if (ind !== -1) {
            const updatedInnerLabs = [...labsInfo[ind].labs, lab_data];
            // console.log("updated Inner labs ",updatedInnerLabs)
            setLabsInfo((prevState)=> {
                const updatedLabInfo = [...prevState];
                updatedLabInfo[ind].labs = updatedInnerLabs;
                return updatedLabInfo;
            })
        } else {
            setLabsInfo((prevLabsInfo)=>[
                ...prevLabsInfo,
                    {
                        labs:[lab_data],
                        labfrom:lab_data.labfrom,
                        labto:lab_data.labto
                    }
            ])
        }
    };
    useEffect(() => {
        console.log("this is a lab info object",labsInfo)
    }, [labsInfo]);
    const handleLabRemove=(labFrom,labTo)=>{
        const updatedLabs = [...labsInfo];
        const index = updatedLabs.findIndex((lab)=>lab.labfrom===labFrom && lab.labto===labTo);
        // console.log(index);
        if(updatedLabs[index] && updatedLabs[index].labs){
            updatedLabs[index].labs.pop();
        }
        // console.log(index);
        // console.log(updatedLabs[index].labs.length)
        if(updatedLabs[index].labs.length===0){
            const finalLabs = labsInfo.filter((lab)=>(lab.labfrom!==labFrom || lab.labto!==labTo));
            setLabsInfo(finalLabs);
        }else{
            setLabsInfo(updatedLabs)
        }
    }
    const handleLabDelete=(labFrom,labTo)=>{
        const index = labsInfo.findIndex((lab)=>lab.labfrom===labFrom && lab.labto === labTo);
        const updatedLab = [...labsInfo];
        updatedLab.splice(index,1);
        setLabsInfo(updatedLab);
    }
    const handleLecDelete=(lecFrom,lecTo)=>{
        const index = lecInfo.findIndex((lec)=>(lec.data.lecfrom===lecFrom && lec.data.lecto===lecTo));
        const updatedLec = lecInfo.filter((lec,ind)=>ind!==index);
        setLecInfo(updatedLec);
    }
    const handleSaveSemRow=(event)=>{
        event.preventDefault();
        sendRowInfoToParent({labsInfo,lecInfo,sdb:sem});
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
                        <Button label={"Save"} onclick={handleSaveSemRow}/>
                        <Button label={"Forms"} onclick={toggleForm}/>
                    </div>
                </div>
                {lecInfo.length>0 && lecInfo.map((lec)=><LectureDetails  key={v4()} onDelete={()=>handleLecDelete(lec.data.lecfrom,lec.data.lecto)} lec_data={lec.data}/>)}
                {labsInfo.length > 0 && labsInfo.map((lab)=><LabDetails  key={v4()} onDelete={()=>handleLabDelete(lab.labfrom,lab.labto)} onRemove={()=>handleLabRemove(lab.labfrom,lab.labto)} innerLabs={lab.labs} lab_data={lab} />)}
            </div>
        </div>
    )
}