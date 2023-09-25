import {useState} from "react";
import DeptTable from "./DeptTable";
export default function Database(){
    const [departments,setDepartments] = useState([]);
    const [dept,setDept] = useState({});
    const [semesters,setSemesters] = useState([]);
    const handleDepartmentAdd=(event)=>{
        event.preventDefault();
        setDepartments([
            ...departments,
            dept,
        ])
    }
    return(
        <DeptTable/>
    )
}