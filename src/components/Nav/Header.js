import { useState, useEffect } from 'react';
import {Navbar, Nav, NavItem} from 'reactstrap';
import noti from '../../images/noti.png';
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
                        <img style={{marginTop:'25px'}} src={noti} alt="" width="30px" height="30px"/>
                    </NavItem>
                    <NavItem>
                        <img style={{borderRadius:'50%'}} src={user.avatar} alt="avatar" width="70px" height="70px"/>
                    </NavItem>
                    <NavItem>
                        <p style={{fontSize:'20px',fontWeight:'bold', color:'black'}}>{user.name}</p>
                        <p style={{color:'black', marginBottom:'5px'}}>{company.name}</p>
                    </NavItem>
                </Nav>
        </Navbar>
    );
}
export default Header;