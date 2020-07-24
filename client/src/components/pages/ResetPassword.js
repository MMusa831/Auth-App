import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import M from "materialize-css";

function ResetPassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const history = useHistory();
  const { token } = useParams();

  const onSubmit = () => {
    fetch(`/users/reset-password/${token}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        confirmPassword,
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
        <h3 className="register">Reset your password</h3>
        <input
          type="password"
          id="standard-basic"
          className="input"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="standard-basic"
          className="input"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" id="btn" value="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ResetPassword;
