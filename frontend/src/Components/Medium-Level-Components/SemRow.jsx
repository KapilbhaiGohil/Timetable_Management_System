import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
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
const timeConflict =(from,to,nfrom,nto)=>{
    console.log(from,to,nfrom,nto)
    let [hfrom,mfrom] = from.split(':').map(Number);
    let [hto,mto] = to.split(':').map(Number);
    let [hnfrom,mnfrom] = nfrom.split(':').map(Number);
    let [hnto,mnto] = nto.split(':').map(Number);
    hfrom = hfrom<7?hfrom+12:hfrom;
    hto = hto<7?hto+12:hto;
    hnfrom = hnfrom<7?hnfrom+12:hnfrom;
    hnto = hnto<7?hnto+12:hnto;
    const minfrom = hfrom * 60 + mfrom;
    const minto = hto * 60 + mto;
    const minfrom2 = hnfrom * 60 + mnfrom;
    const minto2 = hnto * 60 +mnto;
    return ((minfrom2<=minfrom && minto2 > minfrom)||(minfrom2<minto && minto2 > minto)||(minfrom2>=minfrom && minto2<=minto));
}
export default function SemRow({sem,dataobj,setTimeTableInfo,dayIndex,semRowIndex}){
    const [showForm,setShowForm] = useState(false);
    const [allDataInfo,setAllDataInfo] = useState();
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
    }, []);
    const receiveDataFromLab = (lab_data) => {
        const ind = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===lab_data.labfrom && lab.labto===lab_data.labto);
        if (ind !== -1) {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState];
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo[ind].labs.push(lab_data);
                return updated;
            })
        } else {
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState]
                const labs = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo;
                const lectures = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo;
                let msg = "lecture",from="",to="";
                const conflictLec = lectures.find((o)=>timeConflict(o.data.lecfrom,o.data.lecto,lab_data.labfrom,lab_data.labto));
                const conflictlab = labs.find((o)=>timeConflict(o.labfrom,o.labto,lab_data.labfrom,lab_data.labto));
                if(conflictLec || conflictlab) {
                    if (conflictlab) {
                        msg = "lab";
                        from = conflictlab.labfrom;
                        to = conflictlab.labto
                    } else if (conflictLec) {
                        from = conflictLec.data.lecfrom;
                        to = conflictLec.data.lecto
                    }
                    window.alert("Conflict with the " + msg + " from : " + from + " to : " + to);
                    return prevState;
                }
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo =  [ ...updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo ,{labs:[lab_data],labfrom: lab_data.labfrom,labto:lab_data.labto}];
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
            //conflict resolution
            const lectures = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo;
            const labs = updated[dayIndex].semRowsInfo[semRowIndex].dataobj.labsInfo;
            let msg = "lecture",from="",to="";
            const conflictLec = lectures.find((o)=>timeConflict(o.data.lecfrom,o.data.lecto,lec_data.lecfrom,lec_data.lecto));
            const conflictlab = labs.find((o)=>timeConflict(o.labfrom,o.labto,lec_data.lecfrom,lec_data.lecto));
            if(conflictLec || conflictlab){
                console.log(conflictlab,conflictLec)
                if(conflictlab){msg = "lab";from=conflictlab.labfrom;to=conflictlab.labto}
                else if(conflictLec){from = conflictLec.data.lecfrom;to = conflictLec.data.lecto};
                window.alert("Conflict with the "+msg+" from : "+from+" to : "+to);
                return prevState;
            }else{
                updated[dayIndex].semRowsInfo[semRowIndex].dataobj.lecInfo.push({data:lec_data});
                return updated;
            }
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
    const handleSemRowDelete = ()=>{
        if(window.confirm("Are you sure to delete ? ")){
            setTimeTableInfo((prevState)=>{
                const updated = [...prevState];
                updated[dayIndex].semRowsInfo = updated[dayIndex].semRowsInfo.filter((o)=>o.sem!==sem);
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