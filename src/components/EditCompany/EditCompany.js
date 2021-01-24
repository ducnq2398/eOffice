import React, { useState } from 'react';
import logo from './../../images/logo.png';
import './EditCompany.css'
import {useHistory} from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap'
import ValidateCompany from '../Validation/ValidateCompany';
import ValidatePhone from '../Validation/ValidatePhone';
import ValidateEmail from '../Validation/ValidateEmail';
import ValidateName from '../Validation/ValidateName';
import ValidateDepartment from '../Validation/ValidateDepartment';
import ValidateAddress from '../Validation/ValidateAddress';

function CompanyRegister(){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
    const [editCompanyRegister, setEditCompanyRegister] = useState({
        company_name: '',
        street_address: '',
        phone_number: '',
        applicant: '',
        applicant_department: 1,
        applicant_email: '',
        status: 1,
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
    const [validDepartment, setValidDepartment] = useState({
        isValid: false,
        isInValid: false
    });
    const [validEmail, setValidEmail] = useState({
        isValid: false,
        isInValid: false
    });

    function checkEmail() {
        const {isValid, isInValid} = ValidateEmail(editCompanyRegister.applicant_email);
        setValidEmail({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkPhone(){
        const {isValid, isInValid} = ValidatePhone(editCompanyRegister.phone_number);
        setValidPhone({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkCompany() {
        const {isValid, isInValid} = ValidateCompany(editCompanyRegister.company_name);
        setValidCompany({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkAddress() {
        const {isValid, isInValid} = ValidateAddress(editCompanyRegister.street_address);
        setValidAddress({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkName() {
        const{isValid , isInValid} = ValidateName(editCompanyRegister.applicant);
        setValidName({
            isValid: isValid,
            isInValid: isInValid
        })
    }
    function checkDepartment() {
        const{isValid , isInValid} = ValidateDepartment(editCompanyRegister.applicant_department);
        setValidDepartment({
            isValid: isValid,
            isInValid: isInValid
        })
    }


    function handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setEditCompanyRegister({
            ... editCompanyRegister,
            [name] : value,
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(editCompanyRegister)
    }
        return (
            <div>
                <div>
                    <img src={logo} alt="" onClick={home}/>
                </div>
                
                <Container>
                <div className="banner">
                    Editing Company
                </div>
                    <Form onSubmit={handleSubmit} style={{marginTop:'20px'}}>
                        <FormGroup row>
                            <Label sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input valid={validCompany.isValid} invalid={validCompany.isInValid} onBlur={checkCompany} type="text" name="company_name" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input valid={validAddress.isValid} invalid={validAddress.isInValid} onBlur={checkAddress} type="text" name="street_address" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input valid={validPhone.isValid} invalid={validPhone.isInValid} onBlur={checkPhone} type="text" name="phone_number" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant</Label>
                            <Col sm={8}>
                                <Input valid={validName.isValid} invalid={validName.isInValid} onBlur={checkName} type="text" name="applicant" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Department</Label>
                            <Col sm={8}>
                                <Input valid={validDepartment.isValid} invalid={validDepartment.isInValid} onBlur={checkDepartment} type="select" name="applicant_department" defaultValue="1" onChange={handleChange}>
                                    <option value={1}>Production</option>
                                    <option value={2}>Purchasing</option>
                                    <option value={3}>Marketing</option>
                                    <option value={4}>Humman Resource Managerment</option>
                                    <option value={5}>Accounting and Finance</option>
                                </Input>
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
                                    <Input type="radio" name="status" value="1" onChange={handleChange} defaultChecked/>
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
                        <FormGroup>
                            <Button type="submit" style={{padding:'15px 10px 15px',width:'400px',marginLeft:'auto', marginRight:'auto',marginTop:'20px'}} color="primary" size="lg" block>Save</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }

export default CompanyRegister;