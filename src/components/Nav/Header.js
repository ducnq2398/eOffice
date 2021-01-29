import { useState } from 'react';
import {Container, Navbar, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import noti from '../../images/coolicon.png';
import avatar from '../../images/avatar.png';
import '../../css/Nav.css';

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
                    <h3>Day la header</h3>
                </Nav>
            </Container>
        </Navbar>
    );
}
export default Header;