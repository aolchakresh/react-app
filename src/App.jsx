import Home from './Todolist/Home/Home.jsx'
import AddTodoItem from './Todolist/Todolist/Todolist.jsx'
import './App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import Login from './Todolist/Login/Login.jsx'
import PageNotFound from './Todolist/Login/PageNotFound.jsx'
import Header from './Todolist/Header/Header.jsx'

function App() {
  localStorage.setItem('loginname', 'chakresh')
  const location = useLocation();
  const showHeader = location.pathname === '/Home' || location.pathname === '/Additems'
  return (
    <div>
      {showHeader && <Header />}
      <h1>Task Manager</h1>
      <Routes>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Additems" element={<AddTodoItem />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

export default App
