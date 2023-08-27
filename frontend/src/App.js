import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = { <Login/> }></Route>
        <Route path = '/Signup' element = { <Signup /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;