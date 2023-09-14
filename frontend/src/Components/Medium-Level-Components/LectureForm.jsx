import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import "../../Css/Medium-Level-Css/LectureForm.scss"
import Button from "../Small-Level-Componenets/Button";

export default function LectureForm({batches,onSubmit}){
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LECTURE DETAILS</h1>
                <form onSubmit={onSubmit}>
                    <Dropdown name={"sub"} label={"Select Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                    <Dropdown name={"teacher"} label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                    <Dropdown name={"classroom"} label={"Select Classroom"} options={[0,1,2,3]}/>
                    <TimeInput name={"lec"} label={"Selet Duration"}/>
                    <Button label={"Add Lecture"}/>
                </form>
            </div>
        </>
    )
}