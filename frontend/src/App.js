import React, { useContext, useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route,useNavigate,Navigate} from "react-router-dom";
import Navbar from "./Components/Medium-Level-Components/Navbar";
import Home from "./Components/Higher-Level-Componenets/Home"
import About from "./Components/Higher-Level-Componenets/About"
import Register from "./Components/Higher-Level-Componenets/Register"
import Login from "./Components/Higher-Level-Componenets/Login"
import Footer from "./Components/Medium-Level-Components/Footer"
import Database from "./Components/Database-Components/Database"
import "./Css/Higher-Level-Css/App.scss"
import "./Css/Higher-Level-Css/Login.scss"
import DesignTimeTable from "./Components/Higher-Level-Componenets/DesignTimeTable";
import SavedTimeTable from "./Components/Higher-Level-Componenets/SavedTimeTable";
import Pdf from "./Components/Higher-Level-Componenets/Pdf";
import {AuthContext} from "./AuthContext";
import LoadingScreen from "./Components/Small-Level-Componenets/LoadingScreen";

const getLoginStaus =async (setIsLoggedIn,setIsLoading)=>{
    try{
        setIsLoading(true);
        const res = await fetch("/auth/authenticate",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
        })
        if(res.status === 200){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }catch (e){
        window.alert(e);
    }finally {
        setIsLoading(false);
    }
}
function App() {
    const {isLoggedIn,setIsLoggedIn,setIsLoading,isLoading} = useContext(AuthContext)
    // setIsLoading(true);
    useEffect(() => {
        async function helper(){
            await getLoginStaus(setIsLoggedIn,setIsLoading);
        }
        helper();
    }, []);
    let navData=[];
    if(isLoggedIn){
         navData = [
            {to:'/',name:"Home"},
            {to:"/timetables",name:  "TimeTables"},
            {to:"/design",name:"Design"},
            {to:"/about",name:"About Us"},
            {to:"/database",name:  "Database"},
            // {to:"/logout",name:"Logout"},
        ]
    }else{
        navData = [
            {to:'/',name:"Home"},
            {to:"/about",name:"About Us"},
            {to:"/login",name:"Login"},
            {to:"/register",name:"Register"},
        ]
    }
  return (
      <>
              <Router>
                  <Navbar navData={navData}/>
                  {isLoading && <LoadingScreen/>}
                  <Routes>
                      {<Route path={'/'} element={<Home/>}/>}
                      {<Route path={'/home'} element={<Home/>}/>}
                      {<Route path={'/about'} element={<About/>}/>}
                      {!isLoggedIn && <Route path={'/register'} element={<Register/>}/>}
                      {!isLoggedIn && <Route path={'/login'} element={<Login/>}/>}
                      {isLoggedIn && <Route path={'/database'} element={<Database/>}/>}
                      {isLoggedIn && <Route path={'/pdf'} element={<Pdf/>}/>}
                      {isLoggedIn && <Route path={'/timetables'} element={<SavedTimeTable/>}/>}
                      {isLoggedIn && <Route path={'/design'} element={<DesignTimeTable/>}/>}
                      {/*{!isLoggedIn && <Route path={"*"} element={<Navigate to={"/login"}/>}></Route>}*/}
                      {/*{isLoggedIn && <Route path={"*"} element={<Navigate to={"/home"}/>}></Route>}*/}
                  </Routes>
                  <Footer/>
              </Router>
      </>
  );
}

export default App;
