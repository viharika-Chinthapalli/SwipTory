import React from 'react'
import Register from '../components/Register/Register'
const RegisterPage = ({setShowRegister}) => {
  return (
    <div>
      <Register setShowRegister={setShowRegister} />
    </div>
  )
}

export default RegisterPage
