import React, { useContext, useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';
import UserContext from '../context/Context';
import { useHistory } from 'react-router-dom';
import HandleError from '../mist/HandleError'



function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();


  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      const loginUser = { email, password };    
      const logRes = await Axios.post('/users/login', loginUser);
      setUserData({
        token: logRes.data.token,
        user: logRes.data.user
      })
      localStorage.setItem('auth-token', logRes.data.token)
      history.push('/profile');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  }; 
    return (
      <div className="container">        
        <form onSubmit={onSubmit} className="form">
          <h3 className="register">Login</h3>
          {error && (<HandleError message={error} clearError={() => setError(undefined)} />)}
          <TextField
            id="standard-basic"
            className="input"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-basic"
            className="input"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            id="btn"
            value="Register"
          />
        </form>
      </div>
    ); 
}

export default Login;
