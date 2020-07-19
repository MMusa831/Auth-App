import React, {useState, useEffect, useReducer, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/layouts/Header' ;
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile'
import UserContext from './components/context/Context'
import CreatePost from './components/pages/CreatePoste'
import Confirm from './components/pages/Confirm'
import { reducer, initialState } from './reducers/userReducer'
import Axios from 'axios';

const Routing = () => {
 
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user){
      dispatch({ type: "USER", payload: user })
      history.push('/')          
    }else{ 
      if(!history.location.pathname.startsWith('/confirm'))
      history.push('/login')
    }
  }, [])
  return (
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/confirm/:token" component={CreatePost} />
      </Switch>
    </div>
  );
}
function App() {
 
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
