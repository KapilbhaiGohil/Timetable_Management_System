import {convertIntoMinutes, labsAndTeacherAvailability, Rowconflict} from "./ConflictResolution";

export const AddLab = (dataobj,lab_data,setTimeTableInfo,dayIndex,semRowIndex,setLabAvailability,setTeacherAvailability,sem)=>{
    console.log("data required for the lab info")
    console.log("data obje ",dataobj)
    console.log("lab_data ",lab_data)
    console.log(dayIndex,semRowIndex)
    console.log("sem ",sem)
    const ind = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===lab_data.labfrom && lab.labto===lab_data.labto);
    if (ind !== -1) {
        setTimeTableInfo((prevState)=>{
            const updated = [...prevState];
            const  res = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,lab_data,sem,dayIndex,semRowIndex,setTimeTableInfo);
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
                const res2 = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,lab_data,sem,dayIndex,semRowIndex,setTimeTableInfo);
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
}