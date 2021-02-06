import { Button, Container, Input, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import StepInvoice from "../Sidebar/StepInvoice";
import PDF from "../PDF/PDF";
import { useEffect, useState} from "react";
import '../../css/CreateDoc.css';
import {useHistory, useLocation } from "react-router-dom";
import { getUser } from "../../utils/Common";
import userListAPI from "../../api/userListAPI";



function InvoiceContent() {
    const history = useHistory();
    const location = useLocation();
    return(
        <div>
            <StepInvoice activeStep={4}/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Form className="form-upload">
                                <FormGroup row>
                                    <Label>Document content</Label>
                                </FormGroup>
                                <FormGroup row style={{marginTop:'2rem'}}>
                                    <Col sm={5}>
                                        <p style={{float:'right'}}>Type Document:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left'}}>Invoice</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right'}}>Title:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left'}}>{location.state.data.title}</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right'}}>Signer:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left'}}>{location.state.signer.name}</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right'}}>The expiration date:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left'}}>{location.state.data.date}</p>
                                    </Col>
                                </FormGroup>
                            </Form>
                                
                        </Col>
                        <Col>
                            <Form className="form-doc">
                                <FormGroup row>
                                    <div>
                                        <PDF pdf={location.state.file[0]}/>                                  
                                    </div>
                                </FormGroup>
                            </Form>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
export default InvoiceContent;