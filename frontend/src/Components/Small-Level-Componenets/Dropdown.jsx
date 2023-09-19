import "../../Css/Small-Level-Css/Dropdown.scss"
export default function Dropdown({name,label,options,onSelectionChange}){
    return(
        <div className={"outer-container"}>
            <div className={"label-container"}>
                <label>{label}</label>
            </div>
            <div className={'options-container'}>
                <select name={name}  onChange={onSelectionChange}  required={true}>
                    <option value={""} >--Select</option>
                    {options && options.map(
                        (option)=><option key={option} value={option}>{option}</option>
                    )}
                </select>
            </div>
        </div>
    )
}