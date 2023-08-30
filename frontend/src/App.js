import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = { <Login/> }></Route>
        <Route path = '/Signup' element = { <Signup /> }></Route>
        <Route path = '/Home' element = { <Home /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;