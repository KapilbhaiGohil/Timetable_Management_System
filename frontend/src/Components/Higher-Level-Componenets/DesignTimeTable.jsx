import TimeTableView from "./TimeTableView";
import {useLocation} from "react-router-dom";
import RefactorMain from "./RefactorMain";

export  default  function DesignTimeTable(){
    const location = useLocation();
    const data = location.state?.ttData;
    return (
        <RefactorMain />
    )
}