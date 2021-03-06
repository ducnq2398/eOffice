import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import noti from "../../images/noti.png";
import "../../css/Nav.css";
import { getUser, removeUserSession } from "../../utils/Common";
import companyListAPI from "../../api/companyListAPI";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const [company, setCompany] = useState([]);
  useEffect(() => {
    async function fetCompany() {
      const companyId = getUser().CompanyId;
      try {
        const response = await companyListAPI.getCompanyById(companyId);
        setCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetCompany();
  }, []);
  function Logout() {
    removeUserSession();
    history.push("/");
  }
  return (
    <Navbar>
      <Nav>
        <UncontrolledButtonDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <Badge badgeContent={4} color="error" style={{marginTop:'19px'}}>
              <NotificationsIcon color="action" fontSize="large"/>
            </Badge>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>B created document</DropdownItem>
            <DropdownItem>A created document</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <UncontrolledButtonDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <img
              style={{ borderRadius: "50%" }}
              src={getUser().Avatar}
              alt="avatar"
              width="70px"
              height="70px"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => history.push("/profile")}>
              View Profile
            </DropdownItem>
            <DropdownItem onClick={Logout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <NavItem>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>
            {company.name}
          </p>
          <p style={{ color: "black", marginBottom: "5px" }}>
            {getUser().Name}
          </p>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
export default Header;
