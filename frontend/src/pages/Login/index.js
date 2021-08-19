import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { logIn } from '../../redux_slices/authSlice';
import { loaded, loading } from '../../redux_slices/loadingSlice';
import { logInToServer } from '../../requests';
import FButton from '../../styled_components/FButton';
import Finput from '../../styled_components/Finput';

const Login = ({ history }) => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loading());

    const loginData = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    const response = await logInToServer(loginData);

    if (response.status === 200) {
      dispatch(logIn(response.data));
      history.push('/');
    } else {
      alert(response.response.data)
    }
    dispatch(loaded());
  };

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <BaseLogin>
      <div className="login-container">
        <div className="login-title">
          <span>Movieration</span>
          <div className="login-logo" />
        </div>
        <form onSubmit={onSubmit}>
          <div className="login-input">
            <Finput placeholder="Username" required />
          </div>
          <div className="login-input">
            <Finput placeholder="Password" type="password" required />
          </div>
          <FButton type="submit" value="Login">Login</FButton>
          <Link className="login-register" to="/register">Register</Link>
        </form>

      </div>
    </BaseLogin>
  );
}

const BaseLogin = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--primary-color);

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 370px;
    background-color: rgb(51, 51, 58);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;
    box-sizing: border-box;
  }

  .login-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 3px 3px 3px black;
    padding: 24px 0px;
    span {
      padding: 24px 0px;
      margin-bottom: 24px;
    }
  }

  .login-logo {
    width: 80px;
    height: 80px;
    background-image: url('/assets/images/logo.png');
    background-position: center;
    background-size: cover;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-bottom: 12px;
  }

  .login-input {
    margin-bottom: 10px;
  }

  .login-register{
    margin-top: 20px;
    text-decoration: none;
    color: var(--primary-text); 
    font-weight: bold;
    text-align: center;
  }

  .login-options{
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 20px;

    .login-icon {
      transition: transform 0.2s;
      &:hover{
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }

  @media only screen and (max-width: 380px) {
    /* mobile */
    .container {
      width: calc(100% - 20px);
    }
  }

  @media only screen and (max-height: 700px) {
    /* mobile */
    .container {
      height: calc(100% - 20px);
    }
  }
`;


export default Login;