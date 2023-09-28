import "../../Css/Small-Level-Css/RefactorDropdown.scss"
export default function RefactorDropdown({name,key,onSelectionChange,options}){
    return (
        <div className="refactor-dropdown">
            <select name={name}  onChange={onSelectionChange}  required={true}>
                <option value={""} >--Select</option>
                {options && options.map(
                    (option)=><option key={key!==undefined?key:option} value={option}>{option}</option>
                )}
            </select>
        </div>
    )
}