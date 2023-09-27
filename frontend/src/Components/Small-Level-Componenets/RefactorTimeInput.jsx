import "../../Css/Small-Level-Css/RefactorTimeinput.scss"
export default function RefactorTimeInput({name,onChange}){
    return(
        <div className={"refactor-timeinput"}>
            <div>
                <input required={true} name={name+"from"} type={"text"} onChange={onChange} placeholder={"HH:MM"}  pattern={"[0-9]{2}:[0-9]{2}"}/>
            </div>
            <div>
                <input required={true} name={name+"to"} type={"text"} onChange={onChange} placeholder={"HH:MM"} pattern={"[0-9]{2}:[0-9]{2}"}/>
            </div>
        </div>
    )
}