import React from 'react';
import Login from '../components/Login/Login';
const LoginPage = ({setShowLogin}) => {
  return (
    <div>
      <Login setShowLogin={setShowLogin} />
    </div>
  )
}

export default LoginPage;
