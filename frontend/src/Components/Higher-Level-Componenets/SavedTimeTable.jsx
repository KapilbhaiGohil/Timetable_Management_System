import {useEffect, useState} from "react";
import Listitem from "../Small-Level-Componenets/Listitem";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";

const getTimeTables = async(setTimeTables)=>{
    try{
        const res = await fetch("/timetable/getAllTimeTables",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        if(res.status === 200){
            setTimeTables(data);
        }else{
            setTimeTables([]);
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }
}
const deleteTimeTable = async(_id,setTimeTables)=>{
    try{
        const res = await fetch("/timetable/deleteTimeTable",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({_id:_id}),
        });
        const data = await res.json();
        if(res.status === 200){
            window.alert(data.message);
            await getTimeTables(setTimeTables);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }
}
export default  function SavedTimeTable(){
    const [timetables,setTimetables] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function helper(){
            await getTimeTables(setTimetables);
        }
        helper();
    }, []);
    const handleEdit=(timeTableInfo)=>{
        navigate("/design",{state:{ttData:timeTableInfo}});
    }
    return(
        <div>
            {timetables.length>0 && timetables.map((timetable,index)=><Listitem key={v4()} timetable={timetable} onDelete={()=>deleteTimeTable(timetable._id,setTimetables)} onEdit={()=>handleEdit(timetable)}/>)}
        </div>
    )
}