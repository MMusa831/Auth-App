import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import M from "materialize-css";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
 
  const history = useHistory();
    const { resetPasswordToken } = useParams();

  const onSubmit = () => {
      fetch(`/users/reset-password`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          resetPasswordToken,
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
          name="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {/* <input
          type="password"
          id="standard-basic"
           className="input"
           placeholder="Confirm Password"
           name="newConfirmPassword"
           onChange={(e) => setConfirmNewPassword(e.target.value)}
         /> */}
        <input type="submit" id="btn" value="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ResetPassword;
