import "../../Css/Small-Level-Css/Button.scss"
export  default  function Input({label,type,onclick=null}){
    return(
        <div className={"button-container"}>
            <button type={type} onClick={onclick}>{label}</button>
        </div>
    )
}