import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import "../../Css/Medium-Level-Css/LectureForm.scss"
import Button from "../Small-Level-Componenets/Button";

export default function LectureForm({batches}){
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LECTURE DETAILS</h1>
                <Dropdown label={"Select Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                <Dropdown label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                <Dropdown label={"Select Classroom"} options={[0,1,2,3]}/>
                <TimeInput label={"Selet Duration"}/>
                <Button label={"Add Lecture"}/>
            </div>
        </>
    )
}