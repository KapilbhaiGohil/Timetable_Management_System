import "../../Css/Small-Level-Css/Input.scss"
export  default  function Input({label,type,name,required = false,icon,onchange}){
    return(
        <div className={"input-container"}>
            <div className={"label-field"}>
                <label>{label}</label>
            </div>
            <div className={"input-field"}>
                <input type={type} name={name} onChange={onchange} required={required}/>
                {icon}
            </div>
        </div>
    )
}