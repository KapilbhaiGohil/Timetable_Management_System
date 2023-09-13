import {Route} from "react-router-dom";

export  default function ProtectedRoute({component:Component,...rest}){
    return(
        <Route
            {...rest}
            render
        />
    );
}