import RefactorBatchForm from "../Medium-Level-Components/RefactorBatchForm";
import RefactorSubbatchForm from "../Medium-Level-Components/RefactorSubbatchForm";
import RefactorDropdown from "../Small-Level-Componenets/RefactorDropdown";
import Button from "../Small-Level-Componenets/Button"
import "../../Css/Higher-Level-Css/RefactorMain.scss"
export default function RefactorMain(){
    return(
        <div className={"main-outer"}>
            <div className={"main-table"}>
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Select Department</th>
                                <th>Select Semester</th>
                                <th>Select Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><RefactorDropdown name={"dept"} message={"Select Department"} options={["Ce",'it']}/></td>
                                <td><RefactorDropdown name={"sem"} message={"Select Sem"} options={[1,2,3,4]}/></td>
                                <td><RefactorDropdown name={"sub"} message={"Select Subject"} options={['at','wad']}/></td>
                                <td><Button label={"Search"} type={'Submit'}/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <RefactorBatchForm/>
            <RefactorSubbatchForm/>
        </div>
    )
}