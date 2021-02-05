import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/eoffice.png';
import homeicon from '../../images/Home.png';
import usericon from '../../images/user.png';
import doc from '../../images/document.png';
import noti from '../../images/noti.png';
import group from '../../images/group.png';
import '../../css/Sidebar.css'; 
import { Col, Row } from 'reactstrap';

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/dashboard">
                            <Row>
                                <Col sm={3}>
                                    <img src={homeicon} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>Dashboard</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/document">
                            <Row>
                                <Col sm={3}>
                                    <img src={doc} alt="" width="24px" height="24px"/>
                                </Col>
                                <Col sm={5}>
                                    <p>Storage Document</p>
                                </Col>
                            </Row>   
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/user-management">
                            <Row>
                                <Col sm={3}>
                                    <img src={usericon} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>User Management</p>
                                </Col>
                            </Row>
                            
                            
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/department">
                            <Row>
                                <Col sm={3}>
                                    <img src={group} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>Department Management</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/notification">
                            <Row>
                                <Col sm={3}>
                                    <img src={noti} width="24px" height="24px" alt=""/>
                                </Col>
                                <Col sm={5}>
                                    <p>Notification</p>
                                </Col>
                            </Row>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;