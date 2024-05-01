import Login from "../components/Login/Login";
import PropTypes from "prop-types";
const LoginPage = ({ setShowLogin }) => {
  return (
    <div>
      <Login setShowLogin={setShowLogin} />
    </div>
  );
};

LoginPage.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPage;
