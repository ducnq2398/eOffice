import {NavLink,useHistory } from 'react-router-dom';
import logo from '../../images/eoffice.png';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import '../../css/Sidebar.css'; 
import { Col, Row } from 'reactstrap';
import { getUser } from '../../utils/Common';
import GroupIcon from '@material-ui/icons/Group';
import { useEffect, useState } from 'react';

function Sidebar(){
    const history = useHistory();
    const [show, setShow] = useState(false);
    useEffect(()=>{
        const check = () =>{
            if(getUser().Role==='2'){
                setShow(true);
            }
        }
        check();
    })
    return(
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="" onClick={()=> history.push('/dashboard')} />
            </div>
            <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/dashboard">
                                <Row>
                                    <Col sm={3}>
                                        <HomeIcon color="action" fontSize="large"/>
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
                                        <NoteAddIcon color="action" fontSize="large"/>
                                    </Col>
                                    <Col sm={5}>
                                        <p>Storage Document</p>
                                    </Col>
                                </Row>   
                            </NavLink>
                        </li>
                        <li className="nav-item" hidden={show}>
                            <NavLink activeClassName="active" className="nav-link" to="/user-management">
                                <Row>
                                    <Col sm={3}>
                                        <PersonIcon color="action" fontSize="large"/>
                                    </Col>
                                    <Col sm={5}>
                                        <p>User Management</p>
                                    </Col>
                                </Row>
                                
                                
                            </NavLink>
                        </li>
                        <li className="nav-item" hidden={show}>
                            <NavLink activeClassName="active" className="nav-link" to="/department">
                                <Row>
                                    <Col sm={3}>
                                        <GroupIcon color="action" fontSize="large"/>
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
                                        <NotificationsIcon color="action" fontSize="large"/>
                                    </Col>
                                    <Col sm={5}>
                                        <p>Notification</p>
                                    </Col>
                                </Row>
                            </NavLink>
                        </li>
                    </ul>
            </div>
            <div className="bot">
                <p>Requirements | Terms of Service</p>
                <p>@2021 EOffice inc.</p>
            </div>
        </div>
    );
}
export default Sidebar;