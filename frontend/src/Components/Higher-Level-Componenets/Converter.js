const convertAndAddLectInfo=(lecInfo,classroom,lecfrom,lecto,sub,teacher)=>{
    const data = {data:{classroom,lecfrom,lecto,sub,teacher}};
    lecInfo.push(data);
    return lecInfo;
}
const convertAndAddToLabs = (labs,labInfo,labfrom,labto,sub,sub_batch,teacher)=>{
    labs.push(labInfo,labfrom,labto,sub,sub_batch,teacher);
    return labs;
}
const convertAndAddLabInfo = (labsInfo,labfrom,labto,labs)=>{
    labsInfo.push(labfrom,labto,labs);
    return labsInfo;
}

const convertAndAddToSemRowsInfo=(semRowsInfo,sem,labsInfo,lecInfo)=>{
    semRowsInfo.push({sem,dataobj:{labsInfo,lecInfo}})
    return semRowsInfo;
}

const convertAndAddToTimeTableInfo = (TimeTableInfo,day,semRowsInfo)=>{
    TimeTableInfo.push(day,semRowsInfo);
    return TimeTableInfo;
}
module.exports ={convertAndAddLectInfo,convertAndAddToTimeTableInfo,convertAndAddToSemRowsInfo,convertAndAddLabInfo,convertAndAddToLabs}