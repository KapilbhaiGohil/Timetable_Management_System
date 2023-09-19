import Dropdown from "../Small-Level-Componenets/Dropdown";
import Button from "../Small-Level-Componenets/Button";
import {useEffect, useState} from "react";
import "../../Css/Medium-Level-Css/SemForm.scss"

async function fetchDept(setDeptOptions){
    try{
        const response = await fetch("/dept/getAllDept",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            const data = await response.json();
            setDeptOptions(data);
        }else{
            window.alert(response.message)
        }
    }catch (e){
        console.log(e);
    }
}

const getSemByDept = async(dept,setSemOptions)=>{
    try{
        const response = await fetch('/sem/getSemByDept',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"deptCode":dept}),
        })
        const data = await response.json();
        if(response.ok){
            setSemOptions(data);
        }else{
            setSemOptions([]);
            window.alert(data.message)
        }
    }catch (e){
        setSemOptions([]);
        console.log(e);
    }
}
const getBatch=async (semId,setBatchOptions)=>{
    try{
        // window.alert(semId)
        const response = await fetch("/custom/getBatchBySem",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({semId}),
        });
        const data = await response.json();
        if(response.ok){
            setBatchOptions(data);
        }else{
            setBatchOptions([]);
            window.alert(data.message);
        }
    }catch (e){
        setBatchOptions([])
        console.log(e);
    }
}
export default function SemForm ({sendDataToParent}){
    const [sem,setSem] = useState({dept:"",sem:"",batch:""});
    const [semOptions,setSemOptions]=useState([]);
    const [deptOptions,setDeptOptions] = useState([]);
    const [batchOptions,setBatchOptions]=useState([]);
    const handleSelectionChange = (event)=>{
        event.preventDefault();
        setSem({
            ...sem,
            [event.target.name] : event.target.value,
        });
        if(event.target.name==="dept"){
            getSemByDept(event.target.value,setSemOptions);
        }else if(event.target.name==='sem'){
            const sem = semOptions.find((sem)=>sem.semNo===parseInt(event.target.value));
            getBatch(sem._id,setBatchOptions);
        }
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const obj = {
            dept: deptOptions.find((dept)=>dept.code===event.target.dept.value),
            batch:batchOptions.find((batch)=>batch.batchName===event.target.batch.value),
            sem: semOptions.find((sem)=>sem.semNo===parseInt(event.target.sem.value))
        }
        sendDataToParent(obj);
    }
    useEffect(()=>{
        fetchDept(setDeptOptions).catch((e)=>window.alert(e));
    },[])
    return(
        <>
            <div className={"sem-dropdown-container"}>
                <h1>SEMESTER DETAILS</h1>
                <form className={"sem-form-form"} onSubmit={handleSubmit}>
                    <Dropdown name={"dept"} label={"Select Department"} onSelectionChange={handleSelectionChange} options={deptOptions.map((dept)=>dept.code)}/>
                    <Dropdown name={"sem"} label={"Select Semester"} onSelectionChange={handleSelectionChange} options={semOptions.map((option)=>option.semNo)}/>
                    <Dropdown name={"batch"} label={"Select Batch"} options={batchOptions.map((batch)=>batch.batchName)} onSelectionChange={handleSelectionChange} />
                    <Button label={"Add Semester"} type={"submit"}/>
                </form>
            </div>
        </>
    )
}