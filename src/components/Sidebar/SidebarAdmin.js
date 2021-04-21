import { Link, NavLink } from "react-router-dom";
import logo from "../../images/eoffice.png";
import "../../css/Sidebar.css";
import { Col, Row } from "reactstrap";
import { getUser, removeUserSession } from "../../utils/Common";
import { browserName } from "react-device-detect";
import logoutAPI from "../../api/logoutAPI";
import * as Icon from "react-icons/ai";
import * as IconName from "react-icons/ri";

function SidebarAdmin() {
  function Logout(e) {
    e.preventDefault();
    const params = {
      id: getUser().Id,
      device: browserName,
    };
    logoutAPI
      .logout(params)
      .then(function () {
        removeUserSession();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="" style={{top:0}} />
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/admin-manager"
            >
              <Row>
                <Col sm={3}>
                  <Icon.AiFillHome size="30px" />
                </Col>
                <Col sm={4}>
                  <p>Admin</p>
                </Col>
              </Row>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/company-register"
            >
              <Row>
                <Col sm={3}>
                  <IconName.RiBuilding4Fill size="30px" />
                </Col>
                <Col sm={5}>
                  <p>Register Company</p>
                </Col>
              </Row>
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/company-list"
            >
              <Row>
                <Col sm={3}>
                  <IconName.RiBuildingFill size="30px" />
                </Col>
                <Col sm={5}>
                  <p>List Company</p>
                </Col>
              </Row>
            </NavLink>
          </li>
          <li onClick={Logout}>
            <Link className="nav-link" to="/admin">
              <Row>
                <Col sm={3}>
                  <Icon.AiOutlineLogout size="30px" />
                </Col>
                <Col sm={4}>
                  <p>Logout</p>
                </Col>
              </Row>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SidebarAdmin;
