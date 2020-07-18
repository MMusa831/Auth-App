import React, { useContext, useState,useEffect } from 'react';
import Axios from 'axios';
import UserContext from '../context/Context';
import { useHistory, Link } from 'react-router-dom';
import M from "materialize-css";




function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  
  
  const onSubmit = async (e) => {

    e.preventDefault();
    try{
      const loginUser = { email, password };    
      const logRes = await Axios.post('/users/login', loginUser);
      
      localStorage.setItem('usertoken', logRes.data.token)
      localStorage.setItem('user', JSON.stringify(logRes.data.user))
      dispatch({ type: "USER", payload: logRes.data.user})     
      history.push('/');
       M.toast({
         html: "you logged in successfully",
         classes: "#2e7d32 green darken-3",
       });     
    } catch (err) {
      err.response.data.msg &&
        M.toast({
          html: err.response.data.msg,
          classes: "#c62828 red darken-3",
        });        
    }
  }
   
    return (
      <div className="log-div"> 
        <div className="form-div">
          <form onSubmit={onSubmit} className="form">
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
            <input
              type="submit"
              id="btn"
              value="Register"
            />
            <Link className="link-toggle" to="/register">You have not account? Register here</Link>
          </form>
         </div>     
       </div>
    ); 
}

export default Login;
