import React, { useContext, useEffect } from 'react';
import UserContext from '../context/Context';

function Profile() {

  const { userData } = useContext(UserContext);
  
  useEffect(()=>{
    if (userData.user) console.log(userData.user)
  }, []);
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

export default Profile
