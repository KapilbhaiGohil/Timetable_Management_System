import "../../Css/Medium-Level-Css/LectureLabDetails.scss"
export default function LectureLabDetails(){
    return(
      <div className={"lec-lab-outer"}>
          <div className={"lec-lab-time"}>
                <label>9:30 : 10:30</label>
          </div>
          <hr/>
          <div className={"lec-lab-info"}>
              <label>AT</label>
              <label>SPS</label>
              <label>Room 2</label>
          </div>
      </div>
    );
}