import { Button, Col, Container, Form, FormGroup, Label, Row} from "reactstrap";
import Header from "../Nav/Header";
import Sidebar from "../Sidebar/Sidebar";
import companyListAPI from '../../api/companyListAPI';
import '../../css/Profile.css';
import { getUser, removeUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentAPI from "../../api/departmentAPI";

const user = getUser();
function Profile() {
    const history = useHistory();
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    function logout() {
        removeUserSession();
        history.push('/');
    }
    useEffect(()=>{
        async function fetCompany() {
            const companyId = user.companyId;
            try {
                const response = await companyListAPI.getCompanyById(companyId);
                setCompany(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetCompany();
    },[]);

    useEffect(()=>{
        async function fetDepartment() {
            const id = user.departmentId;
            try {
                const response = await departmentAPI.getDepartmentById(id);
                setDepartment(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetDepartment();
    },[]);
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <Row className="roww">
                        <Col>
                            <img style={{borderRadius:'50%'}} src={user.avatar} alt="" width="150px" height="150px"/>
                            <br/>
                            <Button color="link">Change Password</Button>
                            <br/>
                            <Button color="link" onClick={logout}>Logout</Button>
                        </Col>
                        <Col>
                            <Form className="infor">
                                <FormGroup row>
                                    <Label style={{float:'left',fontSize:'25px', fontWeight:'bold'}}>Personal information</Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Name</Label>
                                    <Col style={{marginLeft:'185px'}}>
                                        <Label style={{float:'left'}}>{user.name}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Phone number</Label>
                                    <Col style={{marginLeft:'121px'}}>
                                        <Label style={{float:'left'}}>{user.phone}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Email</Label>
                                    <Col style={{marginLeft:'185px'}}>
                                        <Label style={{float:'left'}}>{user.email}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Company name</Label>
                                    <Col style={{marginLeft:'111px'}}>
                                        <Label style={{float:'left'}}>{company.name}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{float:'left'}}>Department</Label>
                                    <Col style={{marginLeft:'138px'}}>
                                        <Label style={{float:'left'}}>{department.name}</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Address</Label>
                                    <Col style={{marginLeft:'164px'}}>
                                        <Label style={{float:'left'}}>{user.address}</Label>
                                    </Col>
                                </FormGroup>
                                
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default Profile;