import SemRow from "./SemRow";
import "../../Css/Medium-Level-Css/Day.scss"
export default function Day(){
    return(
      <div className={"day-outer"}>
          <div className={"day-name"}>
              <label>Monday</label>
          </div>
          <div className={"day-sem"}>
              <div>
                  <SemRow/>
              </div>
              <div>
                  <SemRow/>
              </div>
              <div>
                  <SemRow/>
              </div>
              <div>
                  <SemRow/>
              </div>
          </div>
      </div>
    );
}