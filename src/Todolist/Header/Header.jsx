import './Header.css'
import { Link } from 'react-router-dom'


function Header() {
    return(
        <div className="header">
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
