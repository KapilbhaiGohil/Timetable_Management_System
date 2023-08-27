import './Signup.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiUnlock } from "react-icons/fi";
import { Link } from 'react-router-dom';    

function Signup() {
    return (
        <div className = "signup-container">
            <div className = "signup-image-container box">
                <div className = "signup-image">

                </div>
            </div>

            <div className = "signup-form box">
                <div className = "signup-temp-text">
                    <div className = "text-free">
                        <label>START FOR FREE</label>
                    </div>

                    <div className = "text-timetune">
                        <label>Signup to Timetune</label>
                    </div>

                    <div className = "text-signin">
                        <div className = "text-signin-prefix">
                            <label>Already have an account?</label>
                        </div>
                        <div className = "size-box">

                        </div>
                        <div className = "text-signin-suffix">
                            <Link to = "/" className = "text-signin-suffix">
                                <label> Login</label>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className = "signup-details">
                    <div className = "email-div">
                        <label className = "form-label">E-mail</label>
                        <div id = "email-field" className = "input-field">
                            <input type = "email" placeholder = "name@gmail.com" className = "email-field font-family-poppins" />
                            <div className = "icon-container">
                                <MdOutlineAlternateEmail size = "30px" color = "#717794" className = "icon-field" />
                            </div>
                        </div>
                    </div>

                    <div className = "password-div">
                        <label className = "form-label">Password</label>
                        <div id = "password-field" className = "input-field">
                            <input type = "text" placeholder = "6+ character" className = "email-field font-family-poppins" />
                            <div className = "icon-container">
                                <FiUnlock size = "30px" color = "#717794" className = "icon-field"/>
                            </div>
                        </div>
                    </div>

                    <div className = "button-div">
                        <button id = "button-signin" className = "button-signin"> Create your account </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup