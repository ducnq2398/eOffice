import {Container,Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import Header from "../Nav/Header";
import StepDetail from "../Sidebar/StepDetail";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from '../../images/invoicecompleted.png';
import download from '../../images/download.png';
import iconprint from '../../images/iconprint.png';
import print from '../../images/print.png';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import axios from "axios";

function InvoiceDetail(){
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(1);
    const [document, setDocument] = useState([]);
    const [signer, setSigner] = useState([]);
    const [creator, setCreator] = useState([]);
    const [viewer, setViewer] = useState([]);
    const [signerId, setSignerId] = useState();
    const [creatorId, setCreatorId] = useState();
    const param = useParams();
    useEffect(()=>{
        async function getInvoiceById() {
            try {
                const res = await invoiceAPI.getInvoiceById(param.id);
                setDocument(res.data)
                setViewer(res.data.viewers);
                setActiveStep(res.data.status+1);
                setSignerId(res.data.signerId);
                setCreatorId(res.data.creatorId);
            } catch (error) {
                console.log(error);
            }
        }
        getInvoiceById();
    },[])
    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(signerId);
                setSigner(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[signerId])

    useEffect(()=>{
        async function getCreator() {
            try {
                const res = await userListAPI.getUserById(creatorId);
                setCreator(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCreator();
    },[creatorId])
    
    return(
        <div>
            <StepDetail activeStep={activeStep}/>
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
                                    <p style={{float:'left', fontSize:'20px'}}>Invoice</p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Creator:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={creator.name} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Title:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={document.description} disabled />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={5}>
                                    <p style={{float:'right', fontSize:'20px'}}>Signer:</p>
                                </Col>
                                <Col>
                                    <Input style={{fontSize:'20px'}} type="text" defaultValue={signer.name} disabled />
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
                                    <p style={{float:'left', fontSize:'20px'}}>{document.dateExpire}</p>
                                </Col>
                            </FormGroup>
                            </Form>
                            <div hidden={activeStep>=3 ? false : true} style={{marginTop:'10%'}}> 
                                <Row>
                                    <Col >
                                        <img style={{marginLeft:'80px'}} onClick={(e)=>{
                                            e.preventDefault();
                                            axios.get(document.invoiceURL, {
                                                responseType: 'blob'
                                            }).then(function(res) {
                                                fileDownload(res.data, document.description+".pdf")
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
                                        <PDF pdf={document.invoiceURL}/>                                  
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
export default InvoiceDetail;