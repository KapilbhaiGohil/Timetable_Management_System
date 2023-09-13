import LabForm from "../Medium-Level-Components/LabForm";
import LectureForm from "../Medium-Level-Components/LectureForm";
import {type} from "@testing-library/user-event/dist/type";
import SemRow from "../Medium-Level-Components/SemRow";

export default function TimeTableView({total_semesters,odd}){
    const semesters =[];
    const lectures=[];
    const labs=[];
    for (let i = 0; i < total_semesters; i++) {
        if((i%2===0) === odd){
            semesters.push(
                <div key={i}>
                    semester {i+1}
                    <SemRow lecture_details={<LectureForm batches={['A','B']}/>}/>
                </div>
            );
        }
    }
    return(
        <div>
            <div>
                hello this is day
            </div>
            {/*<div>*/}
            {/*    {semesters}*/}
            {/*</div>*/}
            {/*<LabForm/>*/}
            <LabForm/>
            <LectureForm/>
        </div>
    )
}