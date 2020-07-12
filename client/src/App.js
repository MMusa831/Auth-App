import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layouts/Header' ;
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile'
import UserContext from './components/context/Context'
import Axios from 'axios';

function App() {
  const [userData, setUserData ] = useState({
    token: undefined,
    user: undefined
  });

useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post("/users/tokenIsValid", null, {
      headers: { "x-auth-token": token },
    });
     if (tokenRes.data) {
     const userRes = await Axios.get("/users", {
        headers: { "x-auth-token": token },
      });
    setUserData({
      token,
      user: userRes.data
    })   
    }
  };
  checkLoggedIn();
}, [])

  return (
    <>
      <Router>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <div className="app-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
          </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
