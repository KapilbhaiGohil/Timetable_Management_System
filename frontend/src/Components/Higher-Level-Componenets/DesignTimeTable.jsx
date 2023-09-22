import TimeTableView from "./TimeTableView";
import {useLocation} from "react-router-dom";

export  default  function DesignTimeTable(){
    const location = useLocation();
    const data = location.state?.ttData;
    return (
        <TimeTableView data={data}/>
    )
}