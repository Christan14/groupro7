import React, { useState } from "react";
import "../styles/sign.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignIn = (e) => {
    localStorage.setItem("userAuth", JSON.stringify({}));
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/signin`, {
      method: "POST",
      withCredentials: true,
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res);
          localStorage.setItem("userAuth", JSON.stringify(res));
          alert(res.message);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="col-12 col-md center-block">
      <form className="Auth-form" onSubmit={SignIn}>
        <h1 className="Auth-form-title">Login</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmCRLFor="form2Example1">
            Email
          </label>
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmCRLFor="form2Example2">
            Password
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
