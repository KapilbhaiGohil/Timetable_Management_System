import "../../Css/Medium-Level-Css/LectureDetails.scss"
export default function LectureDetails({lec_data,onEdit,onDelete,index}){
    let a = lec_data.lecfrom.split(':');
    let b = lec_data.lecto.split(':');
    let minutes1 = (+a[0]) * 60 + (+a[1]);
    let minutes2 = (+b[0]) * 60  +(+b[1]);
    let defalutMinutes = (8)*60+(30);
    const getWidth=()=>{
        if(minutes2<minutes1){
            minutes2 = (+b[0]+12) * 60  +(+b[1]);
        }
        return (minutes2-minutes1)*8.38888888/60;
    }
    const getPostion=()=>{
        let diff = minutes1-defalutMinutes;
        if(diff<0)diff = (+a[0]+12) * 60 + (+a[1]) - defalutMinutes;
        return (diff*8.38888888/60)+(8.5);
    }
    return(
      <div className={"lec-lab-outer"} style={{width:`${getWidth()}vw`,position:"absolute",marginLeft:`${getPostion()}vw`}}>
          <div className={"lec-lab-time"}>
                <label>{lec_data.lecfrom}-{lec_data.lecto}</label>
          </div>
          <hr/>
          <div className={"lec-lab-info"}>
              <label>{lec_data.sub}</label>
              <label>{lec_data.teacher}</label>
              <label>Room {lec_data.classroom}</label>
          </div>
          <div className={"lec-lab-links"} >
              <button onClick={onDelete}>Delete</button>
          </div>
      </div>
    );
}