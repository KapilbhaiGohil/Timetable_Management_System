import {
    removeRoomAvailability,
    removeTeacherAvailability,
    roomAndTeacherAvailability,
    Rowconflict
} from "./ConflictResolution";

export const AddLecture = (lec_data,setTimeTableInfo,dayIndex,semRowIndex,setRoomAvailability,setTeacherAvailability,sem,setWorkload)=>{
    console.log("Data required for lecture")
    console.log("Lec data",lec_data)
    console.log("sem data",sem)
    console.log("dayIndex,semRowindex",dayIndex,semRowIndex)
    setTimeTableInfo((prevState)=>{
        let updated = [...prevState]
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
                        workload[pos].lectures = [...workload[pos].lectures,{lec_data}]
                    }else{
                        workload.push({id:lec_data.teacher._id,labs:[],lectures:[{lec_data}]})
                    }
                    return workload;
                })
                return updated;
            }
        }
    });
}
export const DeleteLecture = (dataobj,lecFrom,lecTo,setTimeTableInfo,dayIndex,semRowIndex,setRoomAvailability,setTeacherAvailability,setWorkload)=>{
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
export const addLectureWithSem = (updated,day_ind,setRoomAvailability,setTeacherAvailability,lecdata,sem,setWorkload,lecfrom,lecto,setTimeTableInfo)=>{
    const semRowIndex = updated[day_ind].semRowsInfo.length-1;
    const lectures = updated[day_ind].semRowsInfo[semRowIndex].dataobj.lecInfo;
    const labs = updated[day_ind].semRowsInfo[semRowIndex].dataobj.labsInfo;
    const res2 = Rowconflict(labs,lectures,lecfrom,lecto);
    if(res2.conflict){
        window.alert(res2.message);
    }else{
        const res = roomAndTeacherAvailability(setRoomAvailability,setTeacherAvailability,lecdata,sem,day_ind)
        if(res.conflict){window.alert(res.message)}
        else{
            updated[day_ind].semRowsInfo[semRowIndex].dataobj.lecInfo.push({data:lecdata});
            setWorkload((prevWorkload)=>{
                const workload = [...prevWorkload];
                const pos = workload.findIndex((work)=>work.id===lecdata.teacher._id);
                if(pos!==-1){
                    workload[pos].lectures = [...workload[pos].lectures,{lec_data:lecdata}]
                }else{
                    workload.push({id:lecdata.teacher._id,labs:[],lectures:[{lec_data:lecdata}]})
                }
                return workload;
            })
            return updated;
        }
    }
    setTimeTableInfo((prevState)=>updated);
}