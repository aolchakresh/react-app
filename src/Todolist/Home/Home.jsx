import logo from "../Home/todolist.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useItemCount } from "../../hooks/useItemCount.js";

function Home() {
  const [_, itemCountSetter] = useItemCount();

  useEffect(() => {
    if (localStorage.items){
      itemCountSetter((JSON.parse(localStorage.getItem("items"))).length);
    }
    
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
