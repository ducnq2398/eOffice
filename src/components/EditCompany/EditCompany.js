import React, { useEffect, useState } from 'react';
import '../../css/EditCompany.css'
import register from '../../images/register.png';
import {Button, Col, Container, Form, FormGroup, Input, Label} from 'reactstrap'
import ValidateCompany from '../Validation/ValidateCompany';
import ValidatePhone from '../Validation/ValidatePhone';
import ValidateEmail from '../Validation/ValidateEmail';
import ValidateName from '../Validation/ValidateName';
import ValidateAddress from '../Validation/ValidateAddress';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useLocation } from 'react-router-dom';
import userListAPI from '../../api/userListAPI';

function CompanyRegister(){
    const data = useLocation();
    const [editCompanyRegister, setEditCompanyRegister] = useState({
        company_name: '',
        street_address: '',
        phone_number: '',
        applicant: '',
        applicant_email: '',
        status: 1,
    })
    const [admin, setAdmin] = useState({
        name : '',
        email: '',
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

    function handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setEditCompanyRegister({
            ...editCompanyRegister,
            [name] : value,
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(editCompanyRegister)
    }
    useEffect(() =>{
        async function GetAdmin(){
            const id = data.state.adminId;
            try {
                const response = await userListAPI.getUserById(id);
                setAdmin({
                    name : response.data.name,
                    email: response.data.email,
                })
            } catch (error) {
                console.log(error)
            }
        }
        GetAdmin();
    },[data.state.adminId])
    return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                <Container fluid={true}>
                <div>
                   <img style={{marginTop:'20px'}} src={register} alt=""/>
                </div>
                    <Form onSubmit={handleSubmit} className="register-form">
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input valid={validCompany.isValid} invalid={validCompany.isInValid} defaultValue={data.state.name} onBlur={checkCompany} type="text" name="company_name" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input valid={validAddress.isValid} invalid={validAddress.isInValid} defaultValue={data.state.address} onBlur={checkAddress} type="text" name="street_address" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input valid={validPhone.isValid} invalid={validPhone.isInValid} defaultValue={data.state.phone} onBlur={checkPhone} type="text" name="phone_number" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Applicant Name</Label>
                            <Col sm={8}>
                                <Input valid={validName.isValid} invalid={validName.isInValid} defaultValue={admin.name} onBlur={checkName} type="text" name="applicant" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{color:'blue'}} sm={2}>Applicant Email</Label>
                            <Col sm={8}>
                                <Input valid={validEmail.isValid} invalid={validEmail.isInValid} defaultValue={admin.email} onBlur={checkEmail} type="email" name="applicant_email" required="required" onChange={handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row>
                            <Label style={{color:'blue'}} sm={2}>Status</Label>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="status" value="1" onChange={handleChange} checked={data.state.status === 1 ? true : false}/>
                                    Active
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check sm={4}>
                                    <Input type="radio" name="status" value="2" onChange={handleChange} checked={data.state.status !==1 ? true : false}/>
                                    Deactive
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="primary" size="lg">Save</Button>
                        </FormGroup>
                    </Form>
                </Container>
                </div>    
            </div>
        );
    }

export default CompanyRegister;