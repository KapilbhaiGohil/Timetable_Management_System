import Button from "../Small-Level-Componenets/Button"
import "../../Css/Small-Level-Css/ListItem.scss"
export default function Listitem({timetable,onDelete,onPrint,onEdit}){
    return(
        <div className={"list-outer"}>
            <div className={"list-main"}>
                <p> {timetable.name}</p>
            </div>
            <div className={"list-btn"}>
                <Button label={"Edit"} onclick={onEdit}/>
                <Button label={"Print"} onclick={onPrint}/>
                <Button label={"Delete"} onclick={onDelete}/>
            </div>
        </div>
    )
}