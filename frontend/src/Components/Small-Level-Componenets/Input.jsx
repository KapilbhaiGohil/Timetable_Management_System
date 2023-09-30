import "../../Css/Small-Level-Css/Input.scss"
export  default  function Input({label,placeholder,value,type,name,icon,onchange}){
    return(
        <div className={"input-container"}>
            <div className={"label-field"}>
                <label>{label}</label>
            </div>
            <div className={"input-field"}>
                <input  type={type} name={name} defaultValue={value} placeholder={placeholder} autoComplete={type} onChange={onchange} required={true}/>
                {icon}
            </div>
        </div>
    )
}