import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./Components/Medium-Level-Components/Navbar";
import Home from "./Components/Higher-Level-Componenets/Home"
import Contact from "./Components/Higher-Level-Componenets/Contact"
import About from "./Components/Higher-Level-Componenets/About"
import Register from "./Components/Higher-Level-Componenets/Register"
import Login from "./Components/Higher-Level-Componenets/Login"
import Footer from "./Components/Medium-Level-Components/Footer"

import "./Css/Higher-Level-Css/App.scss"
import "./Css/Higher-Level-Css/Login.scss"
function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/about'} element={<About/>}/>
            <Route path={'/contact'} element={<Contact/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;