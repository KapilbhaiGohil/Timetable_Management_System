import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from "./Components/Navbar";

import "./Css/App.scss"
import "./Css/Navbar.scss"
function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route></Route>
        </Routes>
      </Router>
  );
}

export default App;
