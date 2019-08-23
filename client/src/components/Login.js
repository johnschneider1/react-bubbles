import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  // console.log("login test:", history);
  const [creds, setCreds] = useState({ username: "", password: "" });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        console.log("token test:", res);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch(err => console.error(err.response));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={creds.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={creds.password}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;

// API Documentation
// [POST] * to /api/login: returns a token to be added to the header of all other requests. Pass in the following credentials as the body of the request: { username: 'Lambda School', password: 'i<3Lambd4' }
// [GET] to /api/colors: returns the list of colors and their hex codes.
// [POST] to /api/colors: creates a new color object. Pass the color as the body of the request (the second argument passed to axios.post).
// [PUT] to /api/colors/:id: updates the color using the id passed as part of the URL. Send the color object with the updated information as the body of the request (the second argument passed to axios.put).
// [DELETE] to /api/colors/123: removes the color using the id passed as part of the URL (123 in example).
