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
            setDeptOptions([]);
            window.alert(response.message)
        }
    }catch (e){
        setDeptOptions([]);
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
const getAllInfoBySemAndDept = async (semId,deptId,setAllInfo)=>{
    try{
        const response = await fetch("/custom/getAllInfoBySemAndDept",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({semId,deptId})
        })
        const data =await response.json();
        if(response.ok){
            setAllInfo(data);
            return true;
        }else{
            setAllInfo([]);
            window.alert(data.message);
            return false;
        }
    }catch(e){
        setAllInfo([]);
        console.log(e);
        return false;
    }
}

const getSubjectsBySemesterId=async (semId,setSubjects)=>{
    try{
        // window.alert(semId)
        const response = await fetch("/custom/getSubBySemId",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({semId}),
        });
        const data = await response.json();
        if(response.ok){
            setSubjects(data);
        }else{
            setSubjects([]);
            window.alert(data.message);
        }
    }catch (e){
        setSubjects([])
        console.log(e);
    }
}
module.exports={fetchDept,getSemByDept,getBatch,getAllInfoBySemAndDept,getSubjectsBySemesterId}