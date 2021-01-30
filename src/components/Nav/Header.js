import { useState } from 'react';
import {Container, Navbar, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label} from 'reactstrap';
import noti from '../../images/coolicon.png';
import '../../css/Nav.css';
import { getUser } from '../../utils/Common';

function Header(){
    const user = getUser();
    return(
        <Navbar>
            <Container className="con" fluid={true}>
                <div className="avt">
                    <img style={{borderRadius:'50%'}} src={user.avatar} alt="avater" width="80px" height="80px"/>
                    <Label style={{fontWeight:'bold', fontSize:'20px', marginLeft:'10px'}}>{user.name}</Label>
                </div>
            </Container>
        </Navbar>
    );
}
export default Header;