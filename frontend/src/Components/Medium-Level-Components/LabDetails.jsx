import "../../Css/Medium-Level-Css/LabDetails.scss"
export default function LabDetails({lab_data,onEdit,onDelete}){
    return(
        <div className={"lab-lab-outer"}>
            <div className={"lab-lab-time"}>
                <label>{lab_data.labfrom} : {lab_data.labto}</label>
            </div>
            <hr/>
            <div className={"lab-lab-info"}>
                <label>{lab_data.sub_batch} - </label>
                <label>{lab_data.sub} -</label>
                <label>{lab_data.teacher} -</label>
                <label>{lab_data.lab_no}</label>
            </div>
            <div className={"lab-lab-links"}>
                <a onClick={onEdit}>Edit</a>
                <a onClick={onDelete}>Delete</a>
            </div>
        </div>
    );
}