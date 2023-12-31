import RefactorDropdown from "../Small-Level-Componenets/RefactorDropdown";
import RefactorTimeInput from "../Small-Level-Componenets/RefactorTimeInput";
import "../../Css/Medium-Level-Css/RefactorBatchForm.scss"
import Button from "../Small-Level-Componenets/Button"
export default function RefactorSubbatchForm({batches,dayoptions,teacheroptions,labs,onSubmit}){
    return(
        <div className={"batch-outer"}>
            <div className={"batch-heading"}>
                <h1>Lab Form</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className={"batch-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Select Sub Batch</th>
                            <th>Select Day</th>
                            <th>Select Teacher</th>
                            <th>Select Lab</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><RefactorDropdown message={"Select Batch"} name={"subBatch"} options={batches}/></td>
                            <td> <RefactorDropdown message={"Select Day"} name={"day"} options={dayoptions}/></td>
                            <td><RefactorDropdown message={"Select Teacher"} name={"teacher"} options={teacheroptions}/></td>
                            <td><RefactorDropdown message={"Select Lab No"} name={"lab"} options={labs}/></td>
                            <td colSpan={"2"}><RefactorTimeInput name={"lab"}/></td>
                            <td className={"refactor-batch-btn"}><Button type={"submit"} label={"Add Lab"}></Button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </form>

        </div>
    )
}