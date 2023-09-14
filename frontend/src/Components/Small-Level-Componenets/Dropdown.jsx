import "../../Css/Small-Level-Css/Dropdown.scss"
export default function Dropdown({name,label,options,onSelectionChange}){
    return(
        <div className={"outer-container"}>
            <div className={"label-container"}>
                <label>{label}</label>
            </div>
            <div className={'options-container'}>
                <select name={name} defaultValue={"default"} onChange={onSelectionChange}>
                    <option value={"default"} disabled={true}>--Select</option>
                    {options && options.map(
                        (option)=><option key={option} value={option}>{option}</option>
                    )}
                </select>
            </div>
        </div>
    )
}