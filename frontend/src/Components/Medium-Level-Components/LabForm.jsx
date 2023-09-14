import Dropdown from "../Small-Level-Componenets/Dropdown";
import TimeInput from "../Small-Level-Componenets/TimeInput";
import Button from "../Small-Level-Componenets/Button";

export default function LabForm({onClick,onSubmit}){
    return(
        <>
            <div className={"dropdown-container"}>
                <h1>LAB DETAILS</h1>
                <form onSubmit={onSubmit}>
                    <Dropdown name={"batch"} label={"Select Sub-Batch"} options={['A1','A2','A3','A4']}/>
                    <Dropdown name={"sub"} label={"Select Lab-Subject"} options={['WAD','AT','AA','OS','MFP']}/>
                    <Dropdown name={"teacher"} label={"Select Teacher"} options={['APV','AAA','JHB','SSS']}/>
                    <Dropdown name={"lab_no"} label={"Select Lab"} options={[0,1,2,3]}/>
                    <TimeInput name={"lab"} label={"Selet Duration"}/>
                    <Button label={"Add Lab"}/>
                </form>
            </div>
        </>
    )
}