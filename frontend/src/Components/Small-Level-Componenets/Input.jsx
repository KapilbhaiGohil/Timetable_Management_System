import "../../Css/Small-Level-Css/Input.scss"
export  default  function Input({label,type,required = false,icon}){
    return(
        <div className={"input-container"}>
            <div className={"label-field"}>
                <label>{label}</label>
            </div>
            <div className={"input-field"}>
                <input type={type}  required={required}/>
                {icon}
            </div>
        </div>
    )
}