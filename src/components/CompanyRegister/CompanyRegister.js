import React, { useState } from 'react';
import './CompanyRegister.css'
import {useHistory} from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap'
import ValidatePhone from '../Validation/ValidatePhone';
import ValidateCompany from '../Validation/ValidateCompany';
import ValidateAddress from '../Validation/ValidateAddress';
import ValidateName from '../Validation/ValidateName';
import ValidateEmail from '../Validation/ValidateEmail';
import ValidatePassword from '../Validation/ValidatePassword';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';

function CompanyRegister(props){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
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
        console.log(companyRegister)
    }
        return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                <Container fluid={true}>
                <div className="banner">
                    Company Register/Editing
                </div>
                    <Form style={{marginTop:'20px'}} onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input valid={validCompany.isValid} invalid={validCompany.isInValid} type="text" name="company_name" required="required" onChange={handleChange} onBlur={checkCompany}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input valid={validAddress.isValid} invalid={validAddress.isInValid} type="text" name="street_address" onChange={handleChange} onBlur={checkAddress}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input invalid={validPhone.isInValid} valid={validPhone.isValid} type="tel" name="phone_number" required="required" onChange={handleChange} onBlur={checkPhone}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant</Label>
                            <Col sm={8}>
                                <Input valid={validName.isValid} invalid={validName.isInValid} onBlur={checkName} type="text" name="applicant" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Email</Label>
                            <Col sm={8}>
                                <Input valid={validEmail.isValid} invalid={validEmail.isInValid} onBlur={checkEmail} type="email" name="applicant_email" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <Label sm={2}>Status</Label>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="status" value="1" defaultChecked onChange={handleChange}/>
                                    Active
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="status" value="2" onChange={handleChange}/>
                                    Deactive
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Password</Label>
                            <Col sm={8}>
                                <Input valid={validPassword.isValid} invalid={validPassword.isInValid} onBlur={checkPassword} type="password" name="applicant_password" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" style={{width:'400px',marginLeft:'auto', marginRight:'auto',marginTop:'20px'}} color="primary" size="lg" block>Verification</Button>
                        </FormGroup>
                    </Form>
                </Container>
                </div>
                
            </div>
        );
    }

export default CompanyRegister;