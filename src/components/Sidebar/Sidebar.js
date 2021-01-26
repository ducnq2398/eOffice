import { Link } from 'react-router-dom';
import logo from '../../images/eoffice.png';
import homeicon from '../../images/Home.png';
import usericon from '../../images/Profile.png'
import group from '../../images/group.png';
import './Sidebar.css'; 

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <img src={homeicon} alt=""/>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="">
                            <img src={usericon} width="24px" height="24px" alt=""/>
                            <p>User Management</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="">
                            <img src={group} width="24px" height="24px" alt=""/>
                            <p>Department Management</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;