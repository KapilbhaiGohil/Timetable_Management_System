import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import Button from "../Small-Level-Componenets/Button";

export default function LabForm(){
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LAB DETAILS</h1>
                <Dropdown label={"Select Sub-Batch"} options={['A1','A2','A3','A4']}/>
                <Dropdown label={"Select Lab-Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                <Dropdown label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                <Dropdown label={"Select Lab"} options={[0,1,2,3]}/>
                <TimeInput label={"Selet Duration"}/>
                <Button label={"Add Lab"}/>
            </div>
        </>
    )
}