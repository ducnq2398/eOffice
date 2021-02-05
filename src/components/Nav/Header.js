import { useState, useEffect } from 'react';
import {Navbar, Nav, NavItem} from 'reactstrap';
import noti from '../../images/coolicon.png';
import '../../css/Nav.css';
import { getUser } from '../../utils/Common';
import companyListAPI from '../../api/companyListAPI';



function Header(){
    const user = getUser();
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
    return(
        <Navbar>
                <Nav>
                    <NavItem>
                        <img src={noti} alt="" width="30px" height="30px"/>
                    </NavItem>
                    <NavItem>
                        <img style={{borderRadius:'50%'}} src={user.avatar} alt="avatar" width="70px" height="70px"/>
                    </NavItem>
                    <NavItem>
                        <p style={{fontSize:'20px',fontWeight:'bold', color:'white'}}>{user.name}</p>
                        <p style={{color:'white'}}>{company.name}</p>
                    </NavItem>
                </Nav>
        </Navbar>
    );
}
export default Header;