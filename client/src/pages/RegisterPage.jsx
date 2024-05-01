import Register from '../components/Register/Register'
import PropTypes from 'prop-types';

const RegisterPage = ({setShowRegister}) => {
  return (
    <div>
      <Register setShowRegister={setShowRegister} />
    </div>
  )
}

RegisterPage.propTypes = {
  setShowRegister: PropTypes.func.isRequired
};

export default RegisterPage
