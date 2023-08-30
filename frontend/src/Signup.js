import "./Signup.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiUnlock } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();

  const handleSubmit = async (event) => {
    if (validate(event)) {
      event.preventDefault();

      axios
        .post("http://localhost:3001/register", { username, email, password })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    }
  };

  function validate(event) {
    event.preventDefault();
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmpassword");

    if (password.length < 6) {
      alert("Password must be 6 character long");
      passwordInput.focus();
      return false;
    }

    if (password !== confPassword) {
      alert("Password and confirm password not matched");
      confirmPasswordInput.focus();
      return false;
    }

    return true;
  }

  return (
    <div className="signup-container">
      <div className="signup-image-container box">
        <div className="signup-image"></div>
      </div>

      <div className="signup-form box">
        <div className="signup-temp-text">
          <div className="text-free">
            <label>START FOR FREE</label>
          </div>

          <div className="text-timetune">
            <label>Signup to Timetune</label>
          </div>

          <div className="text-signin">
            <div className="text-signin-prefix">
              <label>Already have an account?</label>
            </div>
            <div className="size-box"></div>
            <div className="text-signin-suffix">
              <Link to="/" className="text-signin-suffix">
                <label> Login</label>
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="signup-details">
            <div className="username-div">
              <label className="form-label">Username</label>
              <div id="email-field" className="input-field">
                <input
                  type="text"
                  placeholder="name"
                  className="email-field font-family-poppins"
                  required
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <div className="icon-container">
                  <AiOutlineUser
                    size="30px"
                    color="#717794"
                    className="icon-field"
                  />
                </div>
              </div>
            </div>

            <div className="email-div">
              <label className="form-label">E-mail</label>
              <div id="email-field" className="input-field">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  className="email-field font-family-poppins"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <div className="icon-container">
                  <MdOutlineAlternateEmail
                    size="30px"
                    color="#717794"
                    className="icon-field"
                  />
                </div>
              </div>
            </div>

            <div className="password-div">
              <label className="form-label">Password</label>
              <div id="password-field" className="input-field">
                <input
                  id="password"
                  type="password"
                  placeholder="6+ character"
                  className="email-field font-family-poppins"
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <div className="icon-container">
                  <FiUnlock
                    size="30px"
                    color="#717794"
                    className="icon-field"
                  />
                </div>
              </div>
            </div>

            <div className="password-div">
              <label className="form-label">Confirm password</label>
              <div id="password-field" className="input-field">
                <input
                  id="confirmpassword"
                  type="text"
                  placeholder="Password"
                  className="email-field font-family-poppins"
                  required
                  onChange={(event) => {
                    setConfPassword(event.target.value);
                  }}
                />
                <div className="icon-container">
                  <BiLockAlt
                    size="30px"
                    color="#717794"
                    className="icon-field"
                  />
                </div>
              </div>
            </div>

            <div className="button-div">
              <button
                id="button-signin"
                className="button-signin"
                type="submit"
              >
                {" "}
                Create your account{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
