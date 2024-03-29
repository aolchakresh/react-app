import "./Login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";


function Login() {
  const [inputtext, setInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (props) => {
    setInput(props.target.value);
  };

  const clickHandler = () => {
    if (inputtext === localStorage.getItem('loginname')) {
      navigate(`/Home`);
    } else {
      alert("Invalid user!");
    }
  };

  return (
    <div><h1>Task Manager</h1>
      <form className="login">
        <h2>Please provide your user name, to login</h2>
        <input
          type="text"
          name="itemInput"
          id="input1"
          value={inputtext}
          onChange={handleChange}
          ref={inputRef}
        />
        <br />
        <br />
        <input type="submit" value="Login" onClick={clickHandler} />
      </form>
    </div>
  );
}

export default Login;
