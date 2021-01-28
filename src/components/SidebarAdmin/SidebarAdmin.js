import {Link} from 'react-router-dom';
import logo from '../../images/eoffice.png';
import homeicon from '../../images/Home.png';
import usericon from '../../images/Profile.png'
import group from '../../images/group.png';
import logout from '../../images/logout.png';
import '../../css/SidebarAdmin.css'; 
import {removeUserSession } from '../../utils/Common';

function SidebarAdmin(props){
    function Logout(e) {
        e.preventDefault();
        removeUserSession();
    }
    return(
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin-manager">
                            <img src={homeicon} alt=""/>
                            <p>Admin</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/company-register">
                            <img src={usericon} width="24px" height="24px" alt=""/>
                            <p>Register Company</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/company-list">
                            <img src={group} width="24px" height="24px" alt=""/>
                            <p>List Company</p>
                        </Link>
                    </li>
                    <li className="nav-item" onClick={Logout}>
                        <Link className="nav-link" to='/admin'>
                            <img src={logout} width="24px" height="24px" alt=""/>
                            <p>Logout</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default SidebarAdmin;