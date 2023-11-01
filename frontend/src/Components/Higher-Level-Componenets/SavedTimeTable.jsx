import {useContext, useEffect, useState} from "react";
import Listitem from "../Small-Level-Componenets/Listitem";
import {v4} from "uuid";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../AuthContext";

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
const deleteTimeTable = async(_id,setTimeTables,isLoading)=>{
    isLoading(true)
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
            await getTimeTables(setTimeTables);
        }else{
            window.alert(data.message);
        }
    }catch (e) {
        window.alert(e);
    }finally {
        isLoading(false)
    }
}
export default  function SavedTimeTable(){
    const [timetables,setTimetables] = useState([]);
    const navigate = useNavigate();
    const {setIsLoading} = useContext(AuthContext)
    useEffect(() => {
        async function helper(){
            setIsLoading(true)
            await getTimeTables(setTimetables);
            setIsLoading(false)
        }
        helper();
    }, []);
    const handleEdit=(timetable)=>{
        navigate("/design",{state:{ttData:timetable}});
    }
    const handlePrint=(timetable)=>{
        console.log(timetable)
        const filtered_data = timetable.timeTableInfo.filter((obj)=>obj.semRowsInfo.length>0);
        navigate("/pdf",{state:{ttData:filtered_data}});
    }
    return(
        <div>
            {timetables.length>0 && timetables.map((timetable,index)=><Listitem key={v4()} timetable={timetable} onPrint={()=>handlePrint(timetable)} onDelete={()=>deleteTimeTable(timetable._id,setTimetables,setIsLoading)} onEdit={()=>handleEdit(timetable)}/>)}
        </div>
    )
}