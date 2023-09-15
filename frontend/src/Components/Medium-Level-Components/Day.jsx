import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
import Button from "../Small-Level-Componenets/Button"
import {useState} from "react";
import {v4} from "uuid";
import SemForm from "./SemForm";
export default function Day({day_name}){
    const [btnMsg,setBtnMsg] = useState("Add Semester");
    const [showLec,setLec] = useState(false);
    const [sem,setSem] = useState({dept:"",sem:"",batch:""})
    const[semesters,setSemesters] = useState([]);
    const handleSem = (event)=>{
        event.preventDefault();
        setLec(!showLec);
        if(btnMsg === "Close")setBtnMsg("Add Semester");
        else setBtnMsg("Close");
    }
    const receiveDataFromChild=(sem)=>{
        setSemesters(
            [
                ...semesters,
                <SemRow key={v4()} sem={sem}/>
            ]
        );
        setLec(false);
        setBtnMsg("Add Semester")
    }
    return(
      <div className={"day-outer"}>
          <div className={"day-name"}>
              <label>{day_name}</label>
          </div>
          <div className={"day-sem"}>
              {semesters.length >0 && semesters.map(
                  (sem_component,index)=>sem_component
              )}
              <Button label={btnMsg} onclick={handleSem}/>
          </div>
          <div>
              {showLec && <SemForm sendDataToParent={receiveDataFromChild} />}
          </div>
      </div>
    );
}