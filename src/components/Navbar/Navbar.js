import * as Icon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons";
import * as IoIcon from "react-icons/io";
import * as IoOIcon from "react-icons/io5";
import logo from "../../images/eoffice.png";
import "../../css/Navbar.css";
import { getUser } from "../../utils/Common";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <IconContext.Provider value={{ color: "#404f9f" }}>
      <div className="navbar1 navbar-fixed-top">
        <Icon.FaBars onClick={showSidebar} className="menu-bars" />
        <img src={logo} alt="" style={{ marginLeft: 20, marginTop: 10 }} />
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items sn-bg-4" onClick={showSidebar}>
          <li className="navbar-toogle">
            <img src={logo} alt="" style={{ marginLeft: 70, marginTop: 10 }} />
            <IoOIcon.IoClose
              onClick={showSidebar}
              className="menu-bars-close"
            />
          </li>
          <li className="nav-text">
            <Link to="/dashboard">
              <AiIcon.AiOutlineDashboard />
              <span style={{ marginLeft: 20 }}>Dashboard</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/document">
              <IoOIcon.IoDocumentOutline />
              <span style={{ marginLeft: 20 }}>Document</span>
            </Link>
          </li>
          <li
            className="nav-text"
            hidden={getUser().Role === "2" ? true : false}
          >
            <Link to="/user-management">
              <AiIcon.AiOutlineUser />
              <span style={{ marginLeft: 20 }}>User Management</span>
            </Link>
          </li>
          <li
            className="nav-text"
            hidden={getUser().Role === "2" ? true : false}
          >
            <Link to="/department">
              <AiIcon.AiOutlineDashboard />
              <span style={{ marginLeft: 20 }}>Department Management</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/notification">
              <IoIcon.IoIosNotificationsOutline />
              <span style={{ marginLeft: 20 }}>Notification</span>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
export default Navbar;
