import './Header.css'
import { Link } from 'react-router-dom'
import itemCount from "../Store.jsx"
import { useEffect } from 'react';
import { useState } from 'react';


function Header() {
    const [itemCountGlobal, setItemCountGlobal] = useState(itemCount.value);
    
    useEffect(() => {
        itemCount.subscribe((value) => setItemCountGlobal(value));
    }, []);

    return(
        <div className="header">
            <div className="welcomemsg">Welcome {localStorage.getItem('loginname')}, you have {itemCountGlobal} tasks in your list.</div>
            <nav>
                <ul>
                    <li><Link to="/Home"><h2>Home</h2></Link></li>
                    <li><Link to="/Additems"><h2>Manage Tasks</h2></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
