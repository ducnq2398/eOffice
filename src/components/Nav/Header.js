import { useState, useEffect } from 'react';
import {Container, Navbar, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Label} from 'reactstrap';
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
            <Container className="con" fluid={true}>
                <div className="avt">
                <img src={noti} alt="noti"/>
                    <img style={{borderRadius:'50%'}} src={user.avatar} alt="avater" width="90px" height="90px"/>
                <Label>
                    <p style={{fontWeight:'bold', fontSize:'20px', marginLeft:'10px'}}>{user.name}</p>
                    <p>{company.name}</p>                           
                </Label>    
                </div>
            </Container>
        </Navbar>
    );
}
export default Header;