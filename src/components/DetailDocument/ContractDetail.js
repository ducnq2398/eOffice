import {Container,Form, FormGroup, Row, Col, Label, Input} from "reactstrap";
import Header from "../Nav/Header";
import StepDetail from "../Sidebar/StepDetail";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from '../../images/true.png';
import download from '../../images/download.png';
import iconprint from '../../images/iconprint.png';
import print from '../../images/print.png';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import axios from "axios";
import contractAPI from "../../api/contractAPI";
import StepDetailContract from "../Sidebar/StepDetailContract";
import companyListAPI from "../../api/companyListAPI";

function ContractDetail(){
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(1);
    const [signer1, setSigner1] = useState([]);
    const [signer2, setSigner2] = useState([]);
    const [company1, setCompany1] = useState([]);
    const [company2, setCompany2] = useState([]);
    const [document, setDocument] = useState([]);
    const [viewer, setViewer] = useState([]);
    const [id1, setId1] = useState();
    const [id2, setId2] = useState();
    useEffect(()=>{
        async function getDocument() {
            try {
                const res = await contractAPI.getContractById(location.state.id);
                setDocument(res.data);
                setViewer(res.data.contractViewers);
                setId1(res.data.contractSigners[0].signerId);
                setId2(res.data.contractSigners[1].signerId);
                setActiveStep(res.data.status+1);
            } catch (error) {
                console.log(error);
            }
        }
        getDocument();
    },[])
    useEffect(()=>{
        async function getSigner1(){
            try {
                const res = await userListAPI.getUserById(id1);
                setSigner1(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner1();
    },[id1])
    useEffect(()=>{
        async function getSigner2() {
            try {
                const res = await userListAPI.getUserById(id2);
                setSigner2(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner2();
    },[id2])

    useEffect(()=>{
        async function getCompany1() {
            try {
                const res = await companyListAPI.getCompanyById(signer1.companyId);
                setCompany1(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany1();
    },[signer1.companyId])
    useEffect(()=>{
        async function getCompany2() {
            try {
                const res = await companyListAPI.getCompanyById(signer2.companyId);
                setCompany2(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany2();
    },[signer2.companyId])

    return(
        <div>
            <StepDetailContract activeStep={activeStep}/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup row>
                                <Label style={{fontWeight:'bold',color:'blue', fontSize:'30px',marginTop:'2%',marginLeft:'18%'}}>Document content</Label>
                            </FormGroup>
                            <FormGroup row style={{marginTop:'2rem'}}>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Status:</p>
                                </Col>
                                <Col>
                                    <img style={{float:'left', marginTop:'6px'}} hidden={activeStep>3 ? false : true} src={done} alt=""/>
                                    <img style={{float:'left', marginTop:'6px'}} hidden={activeStep<3 ? false : true} src={notsigned} alt=""/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Type Document:</p>
                                </Col>
                                <Col>
                                    <p style={{float:'left', fontSize:'20px'}}>Contract</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Title:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={location.state.description} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Company name:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={company1.name} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Signer:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={signer1.name} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Company name:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={company2.name} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Signer:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={signer2.name} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Viewer:</p>
                                </Col>
                                <Col>
                                    <table>
                                        <tbody>
                                            {viewer.map((data, key) => (
                                                <tr key={key}>
                                                    <td style={{float:'left', fontSize:'20px'}}>
                                                        <GetCreater id={data.viewerId}/>
                                                    </td>
                                                </tr>
                                            ))}    
                                        </tbody>                      
                                    </table>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>The expiration date:</p>
                                </Col>
                                <Col>
                                    <p style={{float:'left', fontSize:'20px'}}>{location.state.dateExpire.substring(10,0)}</p>
                                </Col>
                            </FormGroup>
                            </Form>
                            <div hidden={activeStep===4 ? false : true} style={{marginTop:'10%'}}> 
                                <Row>
                                    <Col>
                                        <img style={{marginLeft:'80px'}} onClick={(e)=>{
                                            e.preventDefault();
                                            axios.get(location.state.contractUrl, {
                                                responseType: 'blob'
                                            }).then(function(res) {
                                                fileDownload(res.data, location.state.description+".pdf")
                                            }).catch(function(error) {
                                                console.log(error)
                                            })
                                        }} src={download} alt=""/>
                                    </Col>
                                    <Col>
                                        <img src={print} alt=""/>
                                        <img style={{position:'absolute',left:'33%', top:'10px'}} src={iconprint} alt=""/>
                                    </Col>
                                </Row>      
                            </div>     
                        </Col>
                        <Col>
                            <Form className="form-doc">
                                <FormGroup row>
                                    <div>
                                        <PDF pdf={document.contractUrl}/>                                  
                                    </div>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default ContractDetail;