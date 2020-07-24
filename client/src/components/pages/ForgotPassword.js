import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/Context";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";


function ForgotPassword() {

    const [email, setEmail] = useState();
    const history = useHistory();

    const onSubmit = () => {



        fetch("/users/forgot-password", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
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
                        html: data.message,
                        classes: "#2e7d32 green darken-3",
                    });
                    history.push("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
  return (
    <div className="log-div">
      <div className="form-div">
        <h3 className="register">Enter your email</h3>
        <input
          id="standard-basic"
          className="input"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" id="btn" value="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ForgotPassword;
