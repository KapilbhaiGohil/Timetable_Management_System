import {Bars,InfinitySpin} from "react-loader-spinner"
import "../../Css/Small-Level-Css/LoadingScreen.scss"
export default function LoadingScreen(){
    return(
        <div className={"loading-outer"}>
            <InfinitySpin
                width='200'
                color="#1976d2"
            />
        </div>
        // <Bars
        //     type="Pulse"
        //     color="#007BFF"
        //     height={100}
        //     width={100}
        // />
    )
}