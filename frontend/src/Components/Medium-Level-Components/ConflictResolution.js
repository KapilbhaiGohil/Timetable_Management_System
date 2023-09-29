
const roomAndTeacherAvailability=(setRoomAvailability,setTeacherAvailability,newlec,sem,dayindex)=>{
    const from = convertIntoMinutes(newlec.lecfrom);
    const to = convertIntoMinutes(newlec.lecto);
    console.log("This is lecdata received ",newlec)
    console.log("Day index received",dayindex)
    let conflict = false;
    let message = "";
    setRoomAvailability((prevRooms)=>{
        console.log("This is prevRooms of classroom ",prevRooms)
        const updated = [...prevRooms];
        const idx = updated[dayindex].data.findIndex((room)=>room.classroom._id===newlec.classroom._id);
        console.log("Index of the classroom ",idx)
        let i;
        for (i = 0; i < updated[dayindex].data[idx].availability.length; i++) {
            if(conflictFromTo(updated[dayindex].data[idx].availability[i].from,updated[dayindex].data[idx].availability[i].to,from,to)){
                conflict = true;
                break;
            }
        }
        if(conflict){
            message = "Conflict for Classroom  "+newlec.classroom.classroom
            return updated;
        }else{
            const res = teacherAvailability(setTeacherAvailability,from,to,sem,newlec.teacher._id,dayindex)
            if(res.conflict){
                message = res.message;conflict=true;
                return updated;
            }else{
                updated[dayindex].data[idx].availability.push({from,to,sem});
                console.log("day index is ",dayindex)
                console.log("after room updated status i s",updated);
                return updated;
            }
        }
    });
    console.log("This is conflict status ",conflict)
    return {message,conflict};
}
const removeRoomAvailability=(setRoomAvailability,lec,lecFrom,lecTo,dayindex)=>{
    setRoomAvailability((rooms)=>{
        console.log(rooms);
        const temp = [...rooms];
        console.log("inside the hadnle lec delete ",lec);
        const room_index = temp[dayindex].data.findIndex((r)=>r.classroom._id===lec.data.classroom._id);
        const finalRoom = temp[dayindex].data[room_index].availability.filter((obj)=>(obj.from!==convertIntoMinutes(lecFrom) && obj.to!==convertIntoMinutes(lecTo)));
        temp[dayindex].data[room_index].availability = finalRoom;
        return temp;
    })
}

const labsAndTeacherAvailability = (setLabsAvailability,setTeacherAvailability,newlab,sem,dayindex,semRowIndex,settimeTableInfo)=>{
    console.log("new lab conflict resolution ",newlab)
    const from = convertIntoMinutes(newlab.labfrom);
    const to = convertIntoMinutes(newlab.labto);
    let conflict = false;
    let message = "";
    setLabsAvailability((prevLabs)=>{
        const updated = [...prevLabs];
        const idx = updated[dayindex].data.findIndex((lab)=>lab.lab._id===newlab.labInfo._id);
        console.log('This is the lab index in conflict resolution',idx);
        for (let i = 0; i < updated[dayindex].data[idx].availability.length; i++) {
            if(conflictFromTo(updated[dayindex].data[idx].availability[i].from,updated[dayindex].data[idx].availability[i].to,from,to) && updated[dayindex].data[idx].availability[i].no===2){
                conflict = true;
                break;
            }
        }
        if(conflict){
            message="Lab conflict for the lab "+newlab.labInfo.lab
            return prevLabs;
        }else{
            let final_subbatch_conflict=-1;
            settimeTableInfo((timeTableInfo)=>{
                const subbatch_conflict_idx = timeTableInfo[dayindex].semRowsInfo[semRowIndex].dataobj.labsInfo.findIndex((l)=>l.labfrom === newlab.labfrom && l.labto === newlab.labto)
                try{
                    final_subbatch_conflict = timeTableInfo[dayindex].semRowsInfo[semRowIndex].dataobj.labsInfo[subbatch_conflict_idx].labs.findIndex((l)=>l.sub_batch===newlab.sub_batch);
                    console.log("This is a conflict for sub batch",timeTableInfo[dayindex].semRowsInfo[semRowIndex].dataobj.labsInfo[idx].labs,final_subbatch_conflict)
                }catch (e) {
                    console.log(e);
                }
                return timeTableInfo;
            })
            if(final_subbatch_conflict!==-1){
                message = "Sub batch conflict for "+newlab.sub_batch;
                conflict = true;
                return updated;
            }else{
                const res = teacherAvailability(setTeacherAvailability,from,to,sem,newlab.teacher._id,dayindex);
                if(res.conflict){
                    conflict = res.conflict;message = res.message;
                    return prevLabs;
                }else{
                    const i = updated[dayindex].data[idx].availability.findIndex((obj)=>obj.from===from && obj.to === to);
                    console.log("this is index for adding at max 2 lab",i);
                    if(i===-1){
                        updated[dayindex].data[idx].availability.push({from,to,sem,no:1});
                        return updated;
                    }else{
                        updated[dayindex].data[idx].availability[i].no = 2;
                        return updated;
                    }

                }
            }
        }
    })
    console.log("This is conflict status ",conflict)
    return {message,conflict};
}
const removeLabAvailability=(setLabAvailability,lab,labfrom,labto,dayindex)=>{
    setLabAvailability((labs)=>{
        console.log(labs);
        const temp = [...labs];
        console.log("inside the hadnle lab delete ",lab);
        const lab_index = temp[dayindex].data.findIndex((r)=>r.lab._id===lab.labInfo._id);
        console.log("lab index to be deleted",lab_index)
        const finallab = temp[dayindex].data[lab_index].availability.filter((obj)=>(obj.from!==convertIntoMinutes(labfrom) && obj.to!==convertIntoMinutes(labto)));
        temp[dayindex].data[lab_index].availability = finallab;
        return temp;
    })
}
const teacherAvailability=(setTeachersAvailability,from,to,sem,teacherId,dayindex)=>{
    let conflict = false;
    let message = "";
    setTeachersAvailability((prevTeachers)=>{
        console.log("This is prevTeachers of classroom ",prevTeachers)
        const updated = [...prevTeachers];
        const idx = updated[dayindex].data.findIndex((teacher)=>teacher.teacher._id===teacherId);
        console.log("Index of the teacher ",idx)
        let i;
        for (i = 0; i < updated[dayindex].data[idx].availability.length; i++) {
            if(conflictFromTo(updated[dayindex].data[idx].availability[i].from,updated[dayindex].data[idx].availability[i].to,from,to)){
                conflict = true;
                break;
            }
        }
        if(conflict){
            message = "Conflict for Teacher  "+updated[dayindex].data[idx].teacher.shortName;
            return updated;
        }else{
            updated[dayindex].data[idx].availability.push({from,to,sem});
            return updated;
        }
    });
    return {message,conflict};
}
const removeTeacherAvailability=(setTeacherAvailability,teacherid,from,to,dayindex)=>{
    setTeacherAvailability((prevTeachers)=>{
        console.log(prevTeachers);
        const temp = [...prevTeachers];
        const teacher_index = temp[dayindex].data.findIndex((r)=>r.teacher._id===teacherid);
        const finalTeacher = temp[dayindex].data[teacher_index].availability.filter((obj)=>(obj.from!==convertIntoMinutes(from) && obj.to!==convertIntoMinutes(to)));
        temp[dayindex].data[teacher_index].availability = finalTeacher;
        return temp;
    })
}
const convertIntoMinutes=(time)=>{
    let [hour,minutes] = time.split(':').map(Number);
    hour = hour<7?hour+12:hour;
    return (hour*60)+minutes;
}

const conflictFromTo =(minfrom,minto,minfrom2,minto2)=>{
    return ((minfrom2<=minfrom && minto2 > minfrom)||(minfrom2<minto && minto2 > minto)||(minfrom2>=minfrom && minto2<=minto));
}

const Rowconflict=(labs,lectures,lecfrom,lecto)=>{
    let msg = "lecture",from="",to="";
    console.log("Labs and lectures in rowconflict",labs,lectures)
    const conflictLec = lectures.find((o)=>timeConflict(o.data.lecfrom,o.data.lecto,lecfrom,lecto));
    const conflictlab = labs.find((o)=>timeConflict(o.labfrom,o.labto,lecfrom,lecto));
    console.log(conflictlab+" "+conflictLec);
    if(conflictLec || conflictlab){
        console.log("inside if",conflictlab||conflictLec)
        if(conflictlab){msg = "lab";from=conflictlab.labfrom;to=conflictlab.labto;}
        else if(conflictLec){from = conflictLec.data.lecfrom;to = conflictLec.data.lecto}
        msg = "Conflict with the "+msg+" from : "+from+" to : "+to;
        return {message:msg,conflict:true}
    }else{
        console.log("inside else")
        msg = "no Conflict"
        return {message:msg,conflict:false}
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
const removeRoomAvailabilityOnRowDelete=(setRoomAvailability,sem,dayindex)=>{
    setRoomAvailability((rooms)=>{
        const temp = [...rooms];
        console.log("this is inside the lec delete",temp);
        for (let i = 0; i < temp[dayindex].data.length; i++) {
            temp[dayindex].data[i].availability =temp[dayindex].data[i].availability.filter((r)=>r.sem!==sem)
        }
        return temp;
    });
}
const removeTeacherAvailabilityOnRowDelete=(setTeacherAvailability,sem,dayindex)=>{
    setTeacherAvailability((Teacher)=>{
        const temp = [...Teacher];
        console.log("this is inside the lec delete",temp);
        for (let i = 0; i < temp[dayindex].data.length; i++) {
            temp[dayindex].data[i].availability =temp[dayindex].data[i].availability.filter((r)=>r.sem!==sem)
        }
        return temp;
    });
}
const removeLabAvailabilityOnRowDelete=(setLabAvailability,sem,dayindex)=>{
    setLabAvailability((lab)=>{
        const temp = [...lab];
        console.log("this is inside the lec delete",temp);
        for (let i = 0; i < temp[dayindex].data.length; i++) {
            temp[dayindex].data[i].availability =temp[dayindex].data[i].availability.filter((r)=>r.sem!==sem)
        }
        return temp;
    });
}
module.exports = {removeLabAvailability,removeLabAvailabilityOnRowDelete,removeRoomAvailabilityOnRowDelete,removeTeacherAvailabilityOnRowDelete,roomAndTeacherAvailability,removeTeacherAvailability,teacherAvailability,labsAndTeacherAvailability,convertIntoMinutes,timeConflict,Rowconflict,removeRoomAvailability}