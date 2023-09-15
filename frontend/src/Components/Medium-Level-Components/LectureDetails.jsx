import "../../Css/Medium-Level-Css/LectureDetails.scss"
export default function LectureDetails({lec_data}){
    return(
      <div className={"lec-lab-outer"}>
          <div className={"lec-lab-time"}>
                <label>{lec_data.lecfrom} : {lec_data.lecto}</label>
          </div>
          <hr/>
          <div className={"lec-lab-info"}>
              <label>{lec_data.sub}</label>
              <label>{lec_data.teacher}</label>
              <label>Room {lec_data.classroom}</label>
          </div>
      </div>
    );
}