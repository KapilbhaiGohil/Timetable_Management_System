import {v4} from "uuid";
import PdfSemRow from "./PdfSemRow";

export default function PdfDay({dayData,dayIndex}){
    return(
        <div className={"day"}>
            <div className={"day-outer"}>
                <div className={"day-name"}>
                    <label>{dayData.day}</label>
                </div>
                <div className={"day-sem"}>
                    {dayData.semRowsInfo.length>0 && dayData.semRowsInfo.map(
                        (e,semRowIndex)=><PdfSemRow key={v4()} dataobj={e.dataobj} sem={e.sem} semRowIndex={semRowIndex}   dayIndex={dayIndex} />
                    )
                    }
                </div>
            </div>
            <hr style={{width:"95.6vw"}}/>
        </div>
    )
}