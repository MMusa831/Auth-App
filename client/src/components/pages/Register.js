import React, { useContext, useState } from "react";
import Axios from "axios";
import UserContext from "../context/Context";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (e) => {
    fetch("/users/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        displayName,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
          M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
        }else{
          M.toast({
            html: data.message,
            classes: "#2e7d32 green darken-3",
          });
          history.push('/login')
        }
      });

    //  e.preventDefault();

    //   try{
    //     const newUser = { email, displayName, password, confirmPassword };
    //    const logRes = await Axios.post("/users/create", newUser);
    //     setUserData({
    //       token: logRes.data.token,
    //       user: logRes.data.user
    //     })
    //     M.toast({
    //       html: "you signed up in successfully",
    //       classes: "#2e7d32 green darken-3",
    //     });
    //     history.push('/login')
    //   }catch(err){
    //     console.log(err)
    //      err.response.data.msg &&
    //        M.toast({
    //          html: err.response.data.msg,
    //          classes: "#c62828 red darken-3",
    //        });
    //   }
  };

  return (
    <div className="reg-div">
      <div className="form-div">
       
          <h3 className="register">Register</h3>        
          <div>
            <input
              className="input"
              id="standard-basic"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              id="standard-basic"
              placeholder="Display Name"
              name="displayName"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              id="standard-basic"
              placeholder="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input"
              id="standard-basic"
              placeholder="Confirm Password"
              name="confirPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>         
        <input onClick={onSubmit} id="btn" value="Register" />
          <Link className="link-toggle" to="/login">
            Already have account? Login from here
          </Link>
       
      </div>
    </div>
  );
}

export default Register;
