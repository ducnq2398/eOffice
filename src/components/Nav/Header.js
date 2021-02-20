import { useState, useEffect } from 'react';
import {Navbar, Nav, NavItem, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import noti from '../../images/noti.png';
import '../../css/Nav.css';
import { getUser, removeUserSession } from '../../utils/Common';
import companyListAPI from '../../api/companyListAPI';
import { useHistory } from 'react-router-dom';

function Header(){
    const user = getUser();
    const history = useHistory();
    const companyId = user.companyId;
    const [company, setCompany] = useState([]);
    useEffect(()=>{
        async function fetCompany() {
            try {
                const response = await companyListAPI.getCompanyById(companyId);
                setCompany(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetCompany();
    },[]);
    function Logout() {
        removeUserSession();
        history.push('/');
    }
    return(
        <Navbar>
                <Nav>
                    <UncontrolledButtonDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <img style={{marginTop:'20px'}} src={noti} alt="" width="35px" height="35px"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                B created document
                            </DropdownItem>
                            <DropdownItem>
                                A created document
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                      
                    <UncontrolledButtonDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <img style={{borderRadius:'50%'}} src={user.profilePicture} alt="avatar" width="70px" height="70px"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={()=> history.push('/profile')}>
                                View Profile
                            </DropdownItem>
                            <DropdownItem onClick={Logout}>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <NavItem>
                        <p style={{fontSize:'20px',fontWeight:'bold', color:'black'}}>{user.displayName}</p>
                        <p style={{color:'black', marginBottom:'5px'}}>{user.displayName}</p>
                    </NavItem>
                </Nav>
        </Navbar>
    );
}
export default Header;