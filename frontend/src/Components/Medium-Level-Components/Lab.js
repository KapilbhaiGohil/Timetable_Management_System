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
export const AddLabWithSemRow = (updated,day_ind,labdata,setLabAvailability,setTeacherAvailability,sem,setTimeTableInfo,lab,labfrom,labto)=>{
    const semRowIndex = updated[day_ind].semRowsInfo.length-1;
    const dataobj = updated[day_ind].semRowsInfo[semRowIndex].dataobj
    const index = dataobj.labsInfo.findIndex((lab)=>lab.labfrom===labdata.labfrom && lab.labto===labdata.labto);
    if (index !== -1) {
        const  res = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,labdata,sem,day_ind,semRowIndex,setTimeTableInfo);
        if(res.conflict){
            window.alert(res.message);
        }else{
            updated[day_ind].semRowsInfo[semRowIndex].dataobj.labsInfo[index].labs.push(labdata);
        }
    } else {
        console.log("no lab with from and to is exist already")
        const labs = updated[day_ind].semRowsInfo[semRowIndex].dataobj.labsInfo;
        const lectures = updated[day_ind].semRowsInfo[semRowIndex].dataobj.lecInfo;
        const res = Rowconflict(labs,lectures,labdata.labfrom,labdata.labto);
        if(res.conflict){window.alert(res.message);}
        else{
            const res2 = labsAndTeacherAvailability(setLabAvailability,setTeacherAvailability,labdata,sem,day_ind,semRowIndex,setTimeTableInfo);
            if(res2.conflict){
                window.alert(res2.message);
            }else{
                updated[day_ind].semRowsInfo[semRowIndex].dataobj.labsInfo =  [ ...updated[day_ind].semRowsInfo[semRowIndex].dataobj.labsInfo ,{labs:[labdata],labfrom: labdata.labfrom,labto:labdata.labto}];
            }
        }
    }
    setLabAvailability((prevState)=>{
        const update_lab = [...prevState];
        const lab_ind = update_lab[day_ind].data.findIndex((l)=>l.lab.lab===lab.lab)
        console.log("hello there this is a lab ind",lab_ind);
        console.log("This is a prev state inside lab update",prevState);
        const upd_ind = update_lab[day_ind].data[lab_ind].availability.findIndex((obj)=>obj.from===convertIntoMinutes(labfrom) && obj.to===convertIntoMinutes(labto));
        console.log("hello there this is a obj ind",upd_ind);
        if(upd_ind!==-1)update_lab[day_ind].data[lab_ind].availability[upd_ind].no =1;
        return update_lab
    })
    setTimeTableInfo((prevState)=>updated)
}