import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = () => {
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="profile__login">
      <h2>Register</h2>
      <div>
        <form className="form">
          <div className="user-login">
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input
                  type="text"
                  // value={contact.firstName}
                  // onChange={onChange}
                  name="firstName"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input
                  type="text"
                  // value={contact.lastName}
                  // onChange={onChange}
                  name="lastName"
                  required
                />
              </div>
            </div>
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
              Register
            </button>
            <Link to={"/auth/login"}>LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
