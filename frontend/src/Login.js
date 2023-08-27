import './Login.css';
import { FaGrinAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiUnlock } from "react-icons/fi";
import { Link } from 'react-router-dom';

function Login() { 
  return (
      <div className = "login-container">
        <div className = "container">
          <div id = "login-form" className = "login-form box">
            <div id = "temp-info" className = "temp-info">
              <div>
                <FaGrinAlt size= "60px" color = "#336CFF" />
              </div>
              <br>
              </br>
              <label id = 'label-hello' className = "font-family-inter">Hello Again!</label>
              <label id = 'label-info' className = "font-family-inter">You'r one step closer to your goals</label>
            </div>

            <div id = "login-detail" className = "login-details">
              <label id = "label-detail" className = "font-family-poppins">E-mail</label>
              <div id = "email-field" className = "input-field">
                <input type = "email" placeholder = "name@gmail.com" className = "email-field font-family-poppins" />
                <div className = "icon-container">
                  <MdOutlineAlternateEmail size = "30px" color = "#717794" className = "icon-field" />
                </div>
              </div>
              <label id = "label-detail" className = "font-family-poppins">Password</label>
              <div id = "password-field" className = "input-field">
                <input type = "text" placeholder = "6+ character" className = "email-field font-family-poppins" />
                <div className = "icon-container">
                  <FiUnlock size = "30px" color = "#717794" className = "icon-field"/>
                </div>
              </div>

              <button id = "button-signin" className = "button-signin">
                Sign in
              </button>

              <div id = "label-suffix" className = "font-family-inter label-info label-suffix">
                <label id = 'label-info' className = "font-family-inter">Don't have an account?</label>
                  <Link to = "/Signup" className = 'label-signin'>
                    <label id = 'label-signin' className = "font-family-inter label-signin"> Register now</label>
                  </Link>
              </div>
            </div>
          </div>

          <div id = "image-container" className = "image-container box">
            <div id = "image" className = "image">

            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
