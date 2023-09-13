import "../../Css/Small-Level-Css/TimeInput.scss"

export default function TimeInput({label}){
    return(
        <div className={"time-container"}>
            <label>{label}</label>
            <div className={"inner-container"}>
                <div>
                    <label>From : </label>
                    <input type={"text"} placeholder={"HH:MM"} pattern={"[0-9]{2}:[0-9]{2}"}/>
                </div>
                <div>
                    <label>To : </label>
                    <input type={"text"} placeholder={"HH:MM"} pattern={"[0-9]{2}:[0-9]{2}"}/>
                </div>
            </div>
        </div>
    )
}