import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/Context'

function AuthButtons() {
    const {userData, setUserData}  = useContext(UserContext);
    const history = useHistory();
    const logOut = () => {
      setUserData({
        token: undefined,
        user: undefined
      });
      localStorage.setItem("auth-token", "")
      history.push("/");
      window.location.reload(false);
    };


    const register = () => history.push("/register")
    const login = () => history.push("/login");
    const profile = () => history.push("/profile");


    return (
      <nav className="auth-buttons">
         { 
         userData.user ? (
          <>
            <button onClick={logOut}>Logout</button>
            <button onClick={profile}>Profile</button>
          </>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </>
        )
        }
      </nav>
    );
}

export default AuthButtons
