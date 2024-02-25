import logo from "../Home/todolist.png";
import { Link } from "react-router-dom";
import itemCount from "../Store.jsx";
import { useEffect, useState } from "react";

function Home() {
  const [itemCountGlobal, setItemCountGlobal] = useState(itemCount.value);
  useEffect(() => {
     itemCount.subscribe(() => setItemCountGlobal(0));
     itemCount.next((JSON.parse(localStorage.items)).length);
   },[])
  return (
    <div>
      <br />
      <Link to="/Additems">
        <img src={logo} className="logo" alt="Vite logo" />
      </Link>
      <p className="read-the-docs">
        <Link to="/Login">Change User</Link>
      </p>
    </div>
  );
}

export default Home;
