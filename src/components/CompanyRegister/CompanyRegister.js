import React, { useState } from 'react';
import logo from './../../images/logo.png';
import './CompanyRegister.css'
import {useHistory} from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap'
import ValidatePhone from '../Validation/ValidatePhone';
import ValidateCompany from '../Validation/ValidateCompany';
import ValidateAddress from '../Validation/ValidateAddress';
import ValidateName from '../Validation/ValidateName';
import ValidateDepartment from '../Validation/ValidateDepartment';
import ValidateEmail from '../Validation/ValidateEmail';
import ValidatePassword from '../Validation/ValidatePassword';

function CompanyRegister(props){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
    const [company_name, setCompanyName] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [applicant, setApplicant] = useState('');
    const [applicant_department, setApplicantDepartment] = useState('');
    const [applicant_email, setApplicantEmail] = useState('');
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
    const [validDepartment, setValidDepartment] = useState({
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

    function checkEmail() {
        const {isValid, isInValid} = ValidateEmail(applicant_email);
        setValidEmail({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkPhone(){
        const {isValid, isInValid} = ValidatePhone(phone_number);
        setValidPhone({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkCompany() {
        const {isValid, isInValid} = ValidateCompany(company_name);
        setValidCompany({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkAddress() {
        const {isValid, isInValid} = ValidateAddress(street_address);
        setValidAddress({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkName() {
        const{isValid , isInValid} = ValidateName(applicant);
        setValidName({
            isValid: isValid,
            isInValid: isInValid
        })
    }
    function checkDepartment() {
        const{isValid , isInValid} = ValidateDepartment(applicant_department);
        setValidDepartment({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkPassword(e) {
        const{isValid , isInValid} = ValidatePassword(e);
        setValidPassword({
            isValid: isValid,
            isInValid: isInValid
        })
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
                                <Input valid={validCompany.isValid} invalid={validCompany.isInValid} type="text" name="company_name" required="required" onChange={getCompanyName} onBlur={checkCompany}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input valid={validAddress.isValid} invalid={validAddress.isInValid} type="text" name="street_address" onChange={getStreetAddress} onBlur={checkAddress}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input invalid={validPhone.isInValid} valid={validPhone.isValid} type="tel" name="phone_number" required="required" onChange={getPhone} onBlur={checkPhone}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant</Label>
                            <Col sm={8}>
                                <Input valid={validName.isValid} invalid={validName.isInValid} onBlur={checkName} type="text" name="applicant" required="required" onChange={getApplicant}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Department</Label>
                            <Col sm={8}>
                                <Input valid={validDepartment.isValid} invalid={validDepartment.isInValid} onBlur={checkDepartment} type="select" name="applicant_department" id="exampleSelect" onChange={getDepartment}>
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
                                <Input valid={validEmail.isValid} invalid={validEmail.isInValid} onBlur={checkEmail} type="email" name="applicant_email" required="required" onChange={getEmail}/>
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <Label sm={2}>Status</Label>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="active"/>
                                    Active
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="deactive"/>
                                    Deactive
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={8}>
                                <Input valid={validPassword.isValid} invalid={validPassword.isInValid} onBlur={e => checkPassword(e.target.value)} type="password" name="applicant_password" required="required"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button style={{padding:'15px 10px 15px',width:'400px',marginLeft:'auto', marginRight:'auto',marginTop:'20px'}} color="primary" size="lg" block>Verification</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }

export default CompanyRegister;