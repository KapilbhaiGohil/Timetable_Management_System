import LectureForm from "../Medium-Level-Components/LectureForm";
import LabForm from "../Medium-Level-Components/LabForm";
import TimeTableView from "./TimeTableView";

export  default  function Home(){
    return (
        <div>
            <h1>Hello I am a home page</h1>
            <TimeTableView total_semesters={8} odd={true}/>
        </div>
    )
}