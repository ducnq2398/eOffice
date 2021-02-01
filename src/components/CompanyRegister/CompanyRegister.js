import React, { useState } from 'react';
import '../../css/CompanyRegister.css'
import register from '../../images/register.png';
import {Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import ValidatePhone from '../Validation/ValidatePhone';
import ValidateCompany from '../Validation/ValidateCompany';
import ValidateAddress from '../Validation/ValidateAddress';
import ValidateName from '../Validation/ValidateName';
import ValidateEmail from '../Validation/ValidateEmail';
import ValidatePassword from '../Validation/ValidatePassword';
import SidebarAdmin from '../Sidebar/SidebarAdmin';

function CompanyRegister(){
    const [companyRegister, setCompanyRegister] = useState({
        company_name: '',
        street_address: '',
        phone_number: '',
        applicant: '',
        applicant_email: '',
        status: 1,
        applicant_password:'',
    })
    const [validPhone, setValidPhone] = useState({
        isValid: false,
        isInValid: false
    });
    const [validCompany, setValidCompany] = useState({
        isValid: false,
        isInValid: false
    });
    const [validAddress, setValidAddress] = useState({
        isValid: false,
        isInValid: false
    });
    const [validName, setValidName] = useState({
        isValid: false,
        isInValid: false
    });
    const [validEmail, setValidEmail] = useState({
        isValid: false,
        isInValid: false
    });
    const [validPassword, setValidPassword] = useState({
        isValid: false,
        isInValid: false
    });

    const [modal, setModal] = useState(false);
    const toogle = () => setModal(!modal);

    function checkEmail() {
        const {isValid, isInValid} = ValidateEmail(companyRegister.applicant_email);
        setValidEmail({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkPhone(){
        const {isValid, isInValid} = ValidatePhone(companyRegister.phone_number);
        setValidPhone({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkCompany() {
        const {isValid, isInValid} = ValidateCompany(companyRegister.company_name);
        setValidCompany({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkAddress() {
        const {isValid, isInValid} = ValidateAddress(companyRegister.street_address);
        setValidAddress({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkName() {
        const{isValid , isInValid} = ValidateName(companyRegister.applicant);
        setValidName({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkPassword() {
        const{isValid , isInValid} = ValidatePassword(companyRegister.applicant_password);
        setValidPassword({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setCompanyRegister({
            ... companyRegister,
            [name] : value,
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        
    }
        return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                <Container fluid={true}>
                <div>
                    <img style={{marginTop:'20px'}} src={register} alt=""/>
                </div>
                    <Form className="register-form">
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input valid={validCompany.isValid} invalid={validCompany.isInValid} type="text" name="company_name" required="required" onChange={handleChange} onBlur={checkCompany}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input valid={validAddress.isValid} invalid={validAddress.isInValid} type="text" name="street_address" onChange={handleChange} onBlur={checkAddress}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input invalid={validPhone.isInValid} valid={validPhone.isValid} type="tel" name="phone_number" required="required" onChange={handleChange} onBlur={checkPhone}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Applicant Name</Label>
                            <Col sm={8}>
                                <Input valid={validName.isValid} invalid={validName.isInValid} onBlur={checkName} type="text" name="applicant" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Applicant Email</Label>
                            <Col sm={8}>
                                <Input valid={validEmail.isValid} invalid={validEmail.isInValid} onBlur={checkEmail} type="email" name="applicant_email" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={toogle} color="primary" size="lg">Verification</Button>
                        </FormGroup>
                    </Form>
                    <Modal className="form-modal" isOpen={modal} toggle={toogle}>
                        <ModalHeader style={{marginRight:'auto',marginLeft:'auto'}}>Confirm Information</ModalHeader>
                        <ModalBody>
                            <Form className="form-confirm">
                                <FormGroup row>
                                    <Label>Company Name:</Label>
                                    <p style={{marginLeft:'20px'}}>{companyRegister.company_name}</p>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Street Address:</Label>
                                    <p style={{marginLeft:'20px'}}>{companyRegister.street_address}</p>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Phone Number:</Label>
                                    <p style={{marginLeft:'20px'}}>{companyRegister.phone_number}</p>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Applicant Name:</Label>
                                    <p style={{marginLeft:'20px'}}>{companyRegister.applicant}</p>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Applicant Email:</Label>
                                    <p style={{marginLeft:'20px'}}>{companyRegister.applicant_email}</p>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toogle}>Cancel</Button>
                            <Button color="primary" onClick={toogle}>Created</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
                </div>
                
            </div>
        );
    }

export default CompanyRegister;