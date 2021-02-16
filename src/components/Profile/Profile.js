import { Button, Col, Container, Form, FormGroup, Label, Row, Table } from "reactstrap";
import {Link} from 'react-router-dom';
import Header from "../Nav/Header";
import Sidebar from "../Sidebar/Sidebar";
import avt from '../../images/avatar.png';
import '../../css/Profile.css';
import { LabelImportant } from "@material-ui/icons";

function Profile() {
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <Row className="roww">
                        <Col>
                            <img style={{borderRadius:'50%'}} src={avt} alt="" width="150px" height="150px"/>
                            <br/>
                            <Button color="link">Change Password</Button>
                            <br/>
                            <Button color="link">Logout</Button>
                        </Col>
                        <Col>
                            <Form className="infor">
                                <FormGroup row>
                                    <Label style={{float:'left',fontSize:'25px', fontWeight:'bold'}}>Personal information</Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Name</Label>
                                    <Col style={{marginLeft:'185px'}}>
                                        <Label style={{float:'left'}}>Tuan Account</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Phone number</Label>
                                    <Col style={{marginLeft:'121px'}}>
                                        <Label style={{float:'left'}}>0982525596</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Email</Label>
                                    <Col style={{marginLeft:'186px'}}>
                                        <Label style={{float:'left'}}>Tuan Account</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Company name</Label>
                                    <Col style={{marginLeft:'111px'}}>
                                        <Label style={{float:'left'}}>Tuan Account</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label style={{float:'left'}}>Department</Label>
                                    <Col style={{marginLeft:'138px'}}>
                                        <Label style={{float:'left'}}>CEO</Label>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Address</Label>
                                    <Col style={{marginLeft:'164px'}}>
                                        <Label style={{float:'left'}}>137 Tran Binh Ha Noi</Label>
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