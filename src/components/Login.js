import React, { useState } from "react";
import { useHistory } from "react-router";
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from 'axios'

const Login = () => {

  const intialFormState = {
    username: '',
    password: ''
  }

  const history = useHistory();

  const [formData, setFormData] = useState(intialFormState)
  const [error, setError] = useState('')

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  //replace with error state

  const signIn = (e) => {
    e.preventDefault()
    console.log('signing in')
    axios.post(`http://localhost:5000/api/login`, formData)
      .then(res => {
        console.log(res)
        localStorage.setItem("authtoken", res.data.payload);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("password", res.data.password);
        history.push('/bubbles');
      })
      .catch(err => {
        setError('Wrong username or password')
      })
    setFormData({
      username: '',
      password: ''
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form>
          <label htmlFor="username">
            <input type="text" placeholder='Enter Username' value={formData.username} onChange={handleChanges} name='username' id="username" />
          </label>
          <label htmlFor="password">
            <input type="password" placeholder='Enter Password' value={formData.password} onChange={handleChanges} name='password' id="password" />
          </label>
          <button onClick={signIn} id="submit"> Sign in</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"