import Button from "../Small-Level-Componenets/Button";

export default function SemRow({lecture_details}){

    return(
        <div>
            {lecture_details}
            <Button label={"Add lab"} type={"submit"}/>
            <Button label={"Add lecture"} type={"submit"}/>
        </div>
    )
}