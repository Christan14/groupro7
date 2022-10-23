import React, { useState } from "react";
import "../styles/sign.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    fetch( `${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {
      method: "POST",
      withCredentials: true,
      body: JSON.stringify({
        pseudo: pseudo,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
        console.log(res);
        navigate("/login");
        if (res.error) {
          console.log(res.error);
          alert(res.error);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="col-12 col-md center-block">
      <form className="Auth-form" onSubmit={signUp}>
        <h1 className="Auth-form-title">Register</h1>
        <div className="form-outline mb-4">
          <label className="form-label" htmCRLFor="form2Example">
            Pseudo
          </label>
          <input
            type="text"
            id="form2Example"
            className="form-control"
            value={pseudo}
            placeholder="Pseudo"
            onChange={(event) => setPseudo(event.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmCRLFor="form2Example1">
            Email
          </label>
          <input
            type="email"
            id="form2Example1"
            className="form-control"
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
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;