import LabForm from "../Medium-Level-Components/LabForm";
import LectureForm from "../Medium-Level-Components/LectureForm";
import SemRow from "../Medium-Level-Components/SemRow";
import LectureLabDetails from "../Medium-Level-Components/LectureLabDetails";
import Day from "../Medium-Level-Components/Day";
export default function TimeTableView(){
    const day = [];
    const week_days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"];
    for (let i = 0; i < 5; i++) {
        day.push(<Day day_name={week_days[i]}/>)
    }
    return(
        <div>
            <div>
                hello this is day
            </div>
            <Day day_name={week_days[0]}/>
        </div>
    )
}