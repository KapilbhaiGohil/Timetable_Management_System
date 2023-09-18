import {v4} from "uuid";
import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureDetails from "./LectureDetails";
import Button from "../Small-Level-Componenets/Button"
import {useEffect, useState} from "react";
import LabForm from "./LabForm";
import LectureForm from "./LectureForm";
import LabDetails from "./LabDetails";
export default function SemRow({sem}){
    console.log("semRow received object",sem)
    const [lectures,setLectures] = useState([]);
    const [labs,setLabs] = useState([]);
    const [showForm,setShowForm] = useState(false);
    const toggleForm=(event)=>{
        event.preventDefault();
        setShowForm(!showForm);
    }
    const receiveDataFromLec = (lec_data)=>{
        setLectures([
            ...lectures,
            {data:lec_data,index:lectures.length}
        ]);
    }
    const receiveDataFromLab = (lab_data) => {
        const labIndex = labs.findIndex((lab) => lab.labfrom === lab_data.labfrom && lab.labto === lab_data.labto);
        if (labIndex !== -1) {
            const updatedInnerLabs = [...(labs[labIndex]?.innerLabs || []), lab_data];
            setLabs((prevLabs) => {
                const updatedLabs = [...prevLabs];
                updatedLabs[labIndex].innerLabs = updatedInnerLabs;
                return updatedLabs;
            });
        } else {
            setLabs((prevLabs) => [
                ...prevLabs,
                {
                    data: lab_data,
                    innerLabs: [lab_data],
                    index: prevLabs.length,
                    labfrom:lab_data.labfrom,
                    labto:lab_data.labto
                },
            ]);
        }
    };
    useEffect(() => {
        console.log(labs)
    }, [labs]);
    const handleLabRemove=(labFrom,labTo)=>{
        const updatedLabs = [...labs];
        const index = updatedLabs.findIndex((lab)=>lab.labfrom===labFrom && lab.labto===labTo);
        // console.log(index);
        if(updatedLabs[index] && updatedLabs[index].innerLabs){
            updatedLabs[index].innerLabs.pop();
        }
        console.log(index);
        console.log(updatedLabs[index].innerLabs.length)
        if(updatedLabs[index].innerLabs.length===0){
            const finalLabs = labs.filter((lab)=>(lab.labfrom!==labFrom || lab.labto!==labTo));
            setLabs(finalLabs);
        }else{
            setLabs(updatedLabs)
        }
    }
    const handleLabDelete=(labFrom,labTo)=>{
        const index = labs.findIndex((lab)=>lab.labfrom===labFrom && lab.labto === labTo);
        const updatedLab = [...labs];
        updatedLab.splice(index,1);
        setLabs(updatedLab);
    }
    const handleLecDelete=(lecFrom,lecTo)=>{
        const index = lectures.findIndex((lec)=>(lec.data.lecfrom===lecFrom && lec.data.lecto===lecTo));
        const updatedLec = lectures.filter((lec,ind)=>ind!==index);
        setLectures(updatedLec);
    }
    return(
        <div className={"sem-row"}>
            {showForm && <div className={"sem-row-forms"}>
                <div className={"sem-row-forms-div"}>
                     <LabForm sendDataToParent={receiveDataFromLab}/>
                </div>
                <div className={"sem-row-forms-div"}>
                    <LectureForm sendDataToParent={receiveDataFromLec}/>
                </div>
                <div>
                    <Button label={"Close"} onclick={toggleForm}/>
                </div>
            </div>}
            <div className={"sem-row-outer"}>
                <div className={"sem-row-info"}>
                    <div className={"sem-row-dept"}>
                        <label>{sem.dept.code}</label>
                    </div>
                    <hr/>
                    <div className={"sem-row-sem"}>
                        <label>{sem.sem.semNo} - {sem.batch.batchName}</label>
                    </div>
                    <div className={"sem-row-info-btn"}>
                        <Button label={"Save"} onclick={toggleForm}/>
                        <Button label={"Forms"} onclick={toggleForm}/>
                    </div>
                </div>
                {lectures.length>0 && lectures.map((lec)=><LectureDetails key={v4()} onDelete={()=>handleLecDelete(lec.data.lecfrom,lec.data.lecto)} lec_data={lec.data}/>)}
                {labs.length > 0 && labs.map((lab)=><LabDetails key={v4()} onDelete={()=>handleLabDelete(lab.labfrom,lab.labto)} onRemove={()=>handleLabRemove(lab.labfrom,lab.labto)} innerLabs={lab.innerLabs} lab_data={lab} />)}
            </div>
        </div>
    )
}