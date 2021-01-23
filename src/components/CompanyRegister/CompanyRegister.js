import React, { useState } from 'react';
import logo from './../../images/logo.png';
import './CompanyRegister.css'
import {useHistory} from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import validateInput from '../Validation/Validate';


function CompanyRegister(props){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [company_name, setCompanyName] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [applicant, setApplicant] = useState('');
    const [applicant_department, setApplicantDepartment] = useState('');
    const [applicant_email, setApplicantEmail] = useState('');
    const [isInputValid, setIsInputInvalid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    

    function handleInputValidation(){
        const { isInputValid, errorMessage } = validateInput(getPhone);
        setIsInputInvalid(isInputValid);
        setErrorMessage(errorMessage);
    }


    function FormError(props) {
        /* nếu isHidden = true, return null ngay từ đầu */
        if (props.isHidden===true) { return null;}

        return ( <div className="form-warning">{errorMessage}</div>)
    }
    
    
    function getCompanyName(event){
        setCompanyName(event.target.value)
    }

    function getStreetAddress(e){
        setStreetAddress(e.target.value)
    }

    function getPhone(e){
        setPhoneNumber(e.target.value)
    }

    function getApplicant(e){
        setApplicant(e.target.value)
    }

    function getDepartment(e){
        setApplicantDepartment(e.target.value)
    }
    function getEmail(e){
        setApplicantEmail(e.target.value)
    }
        return (
            <div>
                <div>
                    <img src={logo} alt="" onClick={home}/>
                </div>
                
                <Container>
                <div className="banner">
                    Company Register/Editing
                </div>
                    <Form style={{marginTop:'20px'}}>
                        <FormGroup row>
                            <Label sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input type="text" name="company_name" required="required" onChange={getCompanyName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input type="text" name="street_address" onChange={getStreetAddress}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input type="text" name="phone_number" required="required" onChange={getPhone} onBlur={handleInputValidation}/>
                                <FormError isHidden={isInputValid} errorMessage={errorMessage} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant</Label>
                            <Col sm={8}>
                                <Input type="text" name="applicant" required="required" onChange={getApplicant}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Department</Label>
                            <Col sm={8}>
                                <Input type="select" name="applicant_department" id="exampleSelect" onChange={getDepartment}>
                                    <option>Production</option>
                                    <option>Purchasing</option>
                                    <option>Marketing</option>
                                    <option>Humman Resource Managerment</option>
                                    <option>Accounting and Finance</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Email</Label>
                            <Col sm={8}>
                                <Input type="email" name="applicant_email" required="required" onChange={getEmail}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={8}>
                                <Input type="password" name="applicant_password" required="required"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button style={{padding:'15px 10px 15px',width:'400px',marginLeft:'auto', marginRight:'auto',marginTop:'20px'}} color="primary" size="lg" block onClick={toggle}>Verification</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }

export default CompanyRegister;