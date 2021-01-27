import { useState } from 'react';
import {Container, Navbar, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import noti from '../../images/coolicon.png';
import avatar from '../../images/avatar.png';
import './Header.css';

function Header(){
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(false);
    function openFrofile(){
        setProfile(!profile);
    }
    const toogle = ()=> setOpen(!open);
    return(
        <Navbar>
            <Container fluid={true}>
                <Nav className="nav-right">
                    <Dropdown nav isOpen={open} toggle={toogle}>
                        <DropdownToggle className="noti" tag="view">
                            <img src={noti} alt=""/>
                            <p>5</p>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>A is signeed</DropdownItem>
                            <DropdownItem>B is signeed</DropdownItem>
                            <DropdownItem>C is created</DropdownItem>
                            <DropdownItem>D is detele</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavItem>
                    <Dropdown nav isOpen={profile} toggle={openFrofile}>
                        <DropdownToggle tag="view">
                            <img src={avatar} alt =""/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>View Profile</DropdownItem>
                            <DropdownItem>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </NavItem>
                    <NavItem>
                        <p>Username</p>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}
export default Header;