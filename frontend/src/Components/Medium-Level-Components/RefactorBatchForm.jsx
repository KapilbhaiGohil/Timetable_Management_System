import RefactorDropdown from "../Small-Level-Componenets/RefactorDropdown";
import RefactorTimeInput from "../Small-Level-Componenets/RefactorTimeInput";
import "../../Css/Medium-Level-Css/RefactorBatchForm.scss"
import Button from "../Small-Level-Componenets/Button"
export default function RefactorBatchForm({batches,dayoptions,handleBatchSubmit,teacheroptions,classrooms}){
    return(
        <div className={"batch-outer"}>
            <div className={"batch-heading"}>
                <h1>Lecture Form</h1>
            </div>
            <form onSubmit={handleBatchSubmit}>
                <div className={"batch-table"}>
                    <table>
                        <thead>
                            <tr>
                                <th>Select Batch</th>
                                <th>Select Day</th>
                                <th>Select Teacher</th>
                                <th>Select Classroom</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><RefactorDropdown message={"Select Batch"} name={"batch"} options={batches}/></td>
                                <td> <RefactorDropdown message={"Select Day"} name={"day"} options={dayoptions}/></td>
                                <td><RefactorDropdown message={"Select Teacher"} name={"teacher"} options={teacheroptions}/></td>
                                <td><RefactorDropdown message={"Select Classroom"} name={"classroom"} options={classrooms}/></td>
                                <td colSpan={"2"}><RefactorTimeInput name={"lec"}/></td>
                                <td className={"refactor-batch-btn"}><Button label={"Add Lecture"} type={'submit'}></Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    )
}