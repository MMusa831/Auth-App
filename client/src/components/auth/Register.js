import React, {useContext, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import UserContext  from '../context/Context';
import { useHistory } from 'react-router-dom';
import HandleError from '../mist/HandleError'



function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

 const onSubmit = async (e) => {
   e.preventDefault();
    try{
      const newUser = { email, displayName, password, confirmPassword };
     const logRes = await Axios.post("/users/create", newUser);
     // const logRes = await Axios.post('/users/login', { email, password });
      setUserData({
        token: logRes.data.token,
        user: logRes.data.user
      })
     // localStorage.setItem('auth-token', logRes.data.token)
      history.push('/')
    }catch(err){
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
 
    return (
      <div className="container">
        <form onSubmit={onSubmit} className="form">
        <h3 className="register">Register</h3>
          {error && (<HandleError message={error} clearError={() => setError(undefined)} />)}
          <div>
            <TextField
              className="input"
              id="standard-basic"
              label="Email"
              name="email"              
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              className="input"
              id="standard-basic"
              label="Display Name"
              name="displayName"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              className="input"
              id="standard-basic"
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              className="input"
              id="standard-basic"
              label="Confirm Password"
              name="confirPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            id="btn"
            value="Register"
          />
        </form>
      </div>
    );
}

export default Register
