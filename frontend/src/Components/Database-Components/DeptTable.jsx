import Input from "../Small-Level-Componenets/Input";
import Button from "../Small-Level-Componenets/Button"
export default function DeptTable(){
    return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Input name={"name"}/></td>
                        <td><Input name={"code"}/></td>
                        <td><Input name={"description"}/></td>
                        <td><Button label={"Submit"}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}