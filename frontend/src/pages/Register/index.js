import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import Finput from "../../styled_components/Finput";
import { logIn } from "../../redux_slices/authSlice";
import { loaded, loading } from "../../redux_slices/loadingSlice";
import FButton from "../../styled_components/FButton";
import { registerToServer } from "../../requests";
const Register = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const onCreateUser = async (e) => {
    e.preventDefault();
    dispatch(loading());
    const userData = {};
    userData.name = e.target[0].value;
    userData.surname = e.target[1].value;
    userData.username = e.target[2].value;
    userData.email = e.target[3].value;
    userData.birthDate = e.target[4].value;
    userData.password = e.target[5].value;
    userData.role = 'USER';
    userData.gender = e.target[7].checked ? 'MALE' : 'FEMALE';
    userData.nickname = userData.username;

    if(userData.password !== e.target[6].value){
      return alert('Wrong password.');
    }

    const response = await registerToServer(userData);

    if(response.status === 200){
      console.log(response.data);
      dispatch(logIn(response.data));
    }

    dispatch(loaded());

  };  

  if(isLoggedIn){
    return <Redirect to='/'/>
  }

  return (
    <StyledRegisterDiv>
      <div className="container">
        <div className="title">Register</div>
        <form onSubmit={onCreateUser}>
          <div className="input">
            <Finput placeholder="Name *" required minLength="2" maxLength="100"/>
          </div>
          <div className="input">
            <Finput placeholder="Surname *" required minLength="2" maxLength="100"/>
          </div>
          <div className="input">
            <Finput placeholder="Username *" required minLength="6" maxLength="100"/>
          </div>
          <div className="input">
            <Finput type="email" placeholder="E-Mail *" required/>
          </div>
          <div className="input">
            <Finput type="date" placeholder="Birth Date *" required/>
          </div>
          <div className="input">
            <Finput placeholder="Password *" type="password" required minLength="6"/>
          </div>
          <div className="input">
            <Finput placeholder="Confirm Password *" type="password" required minLength="6"/>
          </div>
          <div className="input register-gender">
            <span>
              <label htmlFor="maleinput">MALE</label>
              <input type="radio" name="gender" id="maleinput" value="MALE" defaultChecked="true"/>
            </span>
            <span>
              <label htmlFor="femaleinput">FEMALE</label>
              <input type="radio" name="gender" id="femaleinput" value="FEMALE"/>
            </span>
          </div>
          <div className="form-desc">You must fill all <b>*</b> fields </div>
          <FButton width="100%" type="submit" value="Register">Register</FButton>
          <div className="login">
            <Link className="login" to="/login">Already have an account? Go to Login!</Link>
          </div>
        </form>
      </div>
    </StyledRegisterDiv>
  );
};

const StyledRegisterDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0E0E10;
  overflow-y: auto;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 370px;
    background-color: rgb(51, 51, 58);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    color: white;

    .title {
      font-size: 2.4rem;
      text-shadow: 3px 3px 3px black;
      text-align: center;
      padding: 24px 0px;
      margin-top: 12px;
    }

    form {
      padding: 20px;
    }

    .input {
      margin-bottom: 10px;
    }

    .form-desc {
      font-size: .8rem;
      color: grey;
      margin-bottom: 10px;
    }

    .login{
      font-size: .9rem;
      margin-top: 20px;
      text-decoration: none;
      color: var(--primary-text); 
      font-weight: bold;
      text-align: center;
    }

    .register-gender {
      
      display: flex;
      justify-content: space-evenly;
      span {
        display: flex;
        align-items: center;
        label {
          margin-right: 12px; 
        }
      }

      input {
        width: 18px;
        height: 18px;
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

export default Register;