import "../../Css/Medium-Level-Css/LabDetails.scss"
import {v4} from "uuid";
export default function LabDetails({lab_data,onDelete,innerLabs,onRemove}){
    console.log("received data to lab details ----------------------------")
    console.log(lab_data,innerLabs);
    let a = lab_data.labfrom.split(':');
    let b = lab_data.labto.split(':');
    let minutes1 = (+a[0]) * 60 + (+a[1]);
    let minutes2 = (+b[0]) * 60  +(+b[1]);
    let defalutMinutes = (8)*60+(30);
    const getWidth=()=>{
        if(minutes2<minutes1){
            minutes2 = (+b[0]+12) * 60  +(+b[1]);
        }
        return (minutes2-minutes1)*8.38888888/60;
    }
    const getPostion=()=>{
        let diff = minutes1-defalutMinutes;
        if(diff<0)diff = (+a[0]+12) * 60 + (+a[1]) - defalutMinutes;
        return (diff*8.38888888/60)+(8.5);
    }
    return(
        <div className={"lab-lab-outer"} style={{width:`${getWidth()}vw`,position:"absolute",marginLeft:`${getPostion()}vw`,}}>
            <div className={"lab-lab-time"}>
                <label>{lab_data.labfrom} - {lab_data.labto}</label>
            </div>
            <hr/>
            <div className={"lab-lab-info"}>
                {lab_data.labs.map((lab)=><label key={v4()}>{lab.sub_batch} - {lab.sub.subCode} - {lab.teacher.shortName} - {lab.labInfo.lab}</label>)}
            </div>
            <div className={"lab-lab-links"}>
                <button onClick={onDelete}>Delete</button>
                <button onClick={onRemove}>Remove</button>
            </div>
        </div>
    );
}