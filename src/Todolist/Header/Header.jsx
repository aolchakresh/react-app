import './Header.css'
import { Link } from 'react-router-dom'
import { useItemCount } from '../../hooks/useItemCount.js';


function Header() {
    const [itemCountGlobal] = useItemCount();

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
