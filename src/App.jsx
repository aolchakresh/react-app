import Home from './Todolist/Home/Home.jsx'
import AddTodoItem from './Todolist/Todolist/Todolist.jsx'
import './App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import Login from './Todolist/Login/Login.jsx'
import PageNotFound from './Todolist/Login/PageNotFound.jsx'
import Header from './Todolist/Header/Header.jsx'
import { useNavigate } from "react-router-dom";

function App() {
  localStorage.setItem('loginname', 'chakresh')
  const location = useLocation();
  const showHeader = location.pathname === '/Home' || location.pathname === '/Additems'
  const showTaskManager = location.pathname === '/Home' || location.pathname === '/Additems' || location.pathname === '/login'
  return (
    <div>
      {showHeader && <Header />}
      {showTaskManager && <h1>Task Manager</h1>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Additems" element={<AddTodoItem />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default App
