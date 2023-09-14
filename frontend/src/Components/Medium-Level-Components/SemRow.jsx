import "../../Css/Medium-Level-Css/SemRow.scss"
import LectureLabDetails from "./LectureLabDetails";
export default function SemRow(){
    let sem="III",dept="CE",batch="A";
    return(
        <div className={"sem-row-outer"}>
            <div className={"sem-row-info"}>
                <div className={"sem-row-dept"}>
                    <label>{dept}</label>
                </div>
                <hr/>
                <div className={"sem-row-sem"}>
                    <label>{sem} - {batch}</label>
                </div>
            </div>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
            <LectureLabDetails/>
        </div>
    )
}