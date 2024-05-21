import React, { useState } from "react";

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
    <div>
      <main className="main">
        <div className="container">
          <h1>Login</h1>
        </div>
        <form className="form">
          <div className="user-details">
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                name="email"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                name="password"
                required
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
