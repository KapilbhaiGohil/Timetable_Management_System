import "../../Css/Small-Level-Css/RefactorDropdown.scss"
import {v4} from "uuid"
export default function RefactorDropdown({name,message,onSelectionChange,options}){
    return (
        <div className="refactor-dropdown">
            <select name={name}  onChange={onSelectionChange}  required={true}>
                <option value={""} >{message}</option>
                {options && options.map(
                    (option)=><option key={v4()} value={option}>{option}</option>
                )}
            </select>
        </div>
    )
}