import Dropdown from "../Small-Level-Componenets/Dropdown";
import Button from "../Small-Level-Componenets/Button";
import {useContext, useEffect, useState} from "react";
import "../../Css/Medium-Level-Css/SemForm.scss"
import {AuthContext} from "../../AuthContext";
import {fetchDept, getBatch, getSemByDept} from "./Functions";


export default function SemForm ({sendDataToParent}){
    const [semOptions,setSemOptions]=useState([]);
    const [deptOptions,setDeptOptions] = useState([]);
    const [batchOptions,setBatchOptions]=useState([]);
    const {setIsLoading} = useContext(AuthContext)
    const handleSelectionChange = async (event)=>{
        event.preventDefault();
        if(event.target.name==="dept"){
            await getSemByDept(event.target.value,setSemOptions);
        }else if(event.target.name==='sem'){
            const sem = semOptions.find((sem)=>sem.semNo===parseInt(event.target.value));
            await getBatch(sem._id,setBatchOptions);
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
        async function fetch  (){
            await fetchDept(setDeptOptions).catch((e)=>window.alert(e));
        }
        fetch();
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