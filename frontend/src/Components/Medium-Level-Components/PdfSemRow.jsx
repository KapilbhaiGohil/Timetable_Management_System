import {v4} from "uuid";
import PdfLabDetails from "./PdfLabDetails";
import PdfLecDetails from "./PdfLecDetails";
import {useState} from "react";

export default function PdfSemRow({sem,dataobj}){
    console.log("data received at pdf semrow",dataobj,sem)
    const [show,setshow] = useState(false);
    return(
        <div className={"sem-row"}>
            <div className={"sem-row-outer"}>
                <div className={"sem-row-info"} style={{backgroundColor:"white",color:"black",borderColor:"black"}}>
                    <div className={"sem-row-dept"}>
                        <label>{sem.dept.code}</label>
                    </div>
                    <hr/>
                    <div className={"sem-row-sem"}>
                        <label>{sem.sem.semNo} - {sem.batch.batchName}</label>
                    </div>
                </div>
                {dataobj.lecInfo.length>0 && dataobj.lecInfo.map((lec)=><PdfLecDetails  key={v4()} lec_data={lec.data}/>)}
                {dataobj.labsInfo.length > 0 && dataobj.labsInfo.map((lab)=><PdfLabDetails  key={v4()}  innerLabs={lab.labs} lab_data={lab} />)}
            </div>
        </div>
    )
}