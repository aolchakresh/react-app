import { useState } from "react";
import viteLogo from "../../assets/todolist.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <br />
      <Link to="/Additems">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </Link>
      <p className="read-the-docs">
        <Link to="/Login">Change User</Link>
      </p>
    </div>
  );
}

export default Home;
