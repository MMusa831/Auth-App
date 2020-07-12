import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from '../auth/AuthButtons';


function NavBar() {
 
    return (
      <div className="header">
        <Link to="/">
          <h3 className="title">MERN AUTH APP</h3>
        </Link>
        <AuthButtons />
      </div>
    );
}

export default NavBar;
