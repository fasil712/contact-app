import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="profile__login">
      <h2>Login</h2>
      <div>
        <form className="form">
          <div className="user-login">
            <div className="login-input-box">
              <span className="details">Email</span>
              <input
                type="email"
                // value={contact.email}
                // onChange={onChange}
                name="email"
                required
              />
            </div>
            <div className="login-input-box">
              <span className="details">Password</span>
              <input
                type="password"
                // value={contact.password}
                // onChange={onChange}
                name="password"
                required
              />
            </div>
          </div>
          <div className="form_footer">
            <button type="submit" className="btn">
              Login
            </button>
            <Link to={"/auth/register"}>REGISTER</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
