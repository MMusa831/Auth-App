import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from '../context/Context';

function NavBar() {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext);
  const logout = () => {
   localStorage.clear()
   dispatch({type: "CLEAR"})
   history.push('/login')
  }
  const userLink = (
    [
      <div className="navbarItem">      
      <Link className="linkItems" to='/profile'>Profile</Link>
      <Link className="linkItems" to='/createpost'>Create Post</Link>
      <a onClick={logout} className="linkItems" >Logout</a>
      </div>
    ]
  );
  const logResLink = (
    [
      <div className="navbarItem">
      <Link className="linkItems" to='/login'>Login</Link>
      <Link className="linkItems" to='/register'>Register</Link>
      </div>
    ]    
  );
  

  return (
    <div className="header">
      <Link to={localStorage.usertoken ? "/" : "/login"}>
        <h5 className="title">Blog Post</h5>
      </Link>
     
      {localStorage.usertoken ? userLink : logResLink}      
     
    </div>
  );
}

export default NavBar;
