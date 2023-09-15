import "../../Css/Small-Level-Css/TimeInput.scss"

export default function TimeInput({label,name,onChange}){
    return(
        <div className={"time-container"}>
            <label>{label}</label>
            <div className={"inner-container"}>
                <div>
                    <label>From : </label>
                    <input name={name+"from"} type={"text"} onChange={onChange} placeholder={"HH:MM"} pattern={"[0-9]{2}:[0-9]{2}"}/>
                </div>
                <div>
                    <label>To : </label>
                    <input name={name+"to"} type={"text"} onChange={onChange} placeholder={"HH:MM"} pattern={"[0-9]{2}:[0-9]{2}"}/>
                </div>
            </div>
        </div>
    )
}