import {Link, NavLink} from 'react-router-dom';
import logo from '../../images/eoffice.png';
import homeicon from '../../images/Home.png';
import usericon from '../../images/company.png'
import group from '../../images/list.png';
import logout from '../../images/logout.png';
import '../../css/Sidebar.css'; 
import {Col, Row} from 'reactstrap';
import {removeUserSession } from '../../utils/Common';
import { useState } from 'react';

function SidebarAdmin(){
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
                    <li>
                        <NavLink activeClassName="active" className="nav-link" to="/admin-manager">
                            <Row>
                                <Col sm={3}>
                                    <img src={homeicon} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={4}>
                                    <p>Admin</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="nav-link" to="/company-register">
                            <Row>
                                <Col sm={3}>
                                    <img src={usericon} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>Register Company</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="nav-link" to="/company-list">
                            <Row>
                                <Col sm={3}>
                                    <img src={group} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>List Company</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                    <li onClick={Logout}>
                        <Link className="nav-link" to='/admin'>
                            <Row>
                                <Col sm={3}>
                                    <img src={logout} width="24px" height="24px" alt=""/>
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