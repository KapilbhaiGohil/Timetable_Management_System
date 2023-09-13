import "../../Css/Small-Level-Css/Dropdown.scss"
export default function Dropdown({label,options}){
    return(
        <div className={"outer-container"}>
            <div className={"label-container"}>
                <label>{label}</label>
            </div>
            <div className={'options-container'}>
                <select>
                    <option value={undefined} disabled={true    }>--Select</option>
                    {options && options.map(
                        (option)=><option value={option}>{option}</option>
                    )}
                </select>
            </div>
        </div>
    )
}