import "../../Css/Medium-Level-Css/LectureLabDetails.scss"
export default function LectureLabDetails({data}){
    return(
      <div className={"lec-lab-outer"}>
          <div className={"lec-lab-time"}>
                <label>9:30 : 10:30</label>
          </div>
          <hr/>
          <div className={"lec-lab-info"}>
              <label>{data.sub}</label>
              <label>{data.teacher}</label>
              <label>{data.classroom}</label>
          </div>
      </div>
    );
}