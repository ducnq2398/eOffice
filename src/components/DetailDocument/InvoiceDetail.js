import {Container,Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import Header from "../Nav/Header";
import StepDetail from "../Sidebar/StepDetail";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from '../../images/true.png';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import axios from "axios";

function InvoiceDetail(){
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(1);
    const [signer, setSigner] = useState([]);
    const [creator, setCreator] = useState([]);
    const [viewer, setViewer] = useState([]);
    const [document, setDocument] = useState('');
    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(location.state.signerId);
                setSigner(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[])

    useEffect(()=>{
        async function getCreator() {
            try {
                const res = await userListAPI.getUserById(location.state.creatorId);
                setCreator(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCreator();
    },[])
    useEffect(()=>{
        async function getDocument() {
            try {
                const res = await invoiceAPI.getInvoiceById(location.state.id)
                setDocument(res.data)
                setViewer(res.data.viewers)
            } catch (error) {
                console.log(error);
            }
        }
        getDocument();
    },[])

    function handleDownload(url, fileName) {
        
    }
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
                                    <img style={{float:'left'}} hidden={location.state.status===3 ? false : true} src={done} alt="" width="40px" height="30px"/>
                                    <img style={{float:'left', marginTop:'6px'}} hidden={location.state.status===3 ? true : false} src={notsigned} alt=""/>
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
                                            {viewer.map(data => (
                                                <tr key={data.viewerId}>
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
                            <div style={{marginTop:'20px'}}> 
                                <Button color="primary" onClick={(e)=>{
                                    e.preventDefault();
                                    axios.get(location.state.invoiceURL, {
                                        responseType: 'blob'
                                    }).then(function(res) {
                                        fileDownload(res.data, location.state.description+".pdf")
                                    }).catch(function(error) {
                                        console.log(error)
                                    })
                                }}>Download</Button>        
                            </div>     
                        </Col>
                        <Col>
                            <Form className="form-doc">
                                <FormGroup row>
                                    <div>
                                        <PDF pdf={location.state.invoiceURL}/>                                  
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