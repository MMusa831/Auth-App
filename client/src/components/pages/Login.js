import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import UserContext from "../context/Context";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import { notify } from "react-notify-toast";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
 const test = () => {
   fetch(
     "/users/test",
     {
       method: 'GET',      
     }
   ).then((response) => {
       if (!response.ok) {
         console.log('Error - 404 Not Found')
       }

      return response.json()
         
     })      
     .catch((err) =>console.log(err))
 }
  
  const onSubmit = async (e) => {
   
    fetch("/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          M.toast({
            html: "you logged in successfully",
            classes: "#2e7d32 green darken-3",
          });
          localStorage.setItem("usertoken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="log-div">
      <div className="form-div">
        <h3 className="register">Login</h3>
        <input
          id="standard-basic"
          className="input"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="standard-basic"
          className="input"
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" id="btn" value="Login" onClick={onSubmit} />
        <Link className="link-toggle" to="/register">
          You have not account? Register here
        </Link>
        <input type="submit" id="btn" value="Test" onClick={test} />
      </div>
    </div>
  );
}

export default Login;
