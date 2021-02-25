import {Container,Form, FormGroup, Row, Col, Label, Button, Modal, ModalFooter, ModalHeader} from "reactstrap";
import Header from "../Nav/Header";
import StepInvoice from "../Sidebar/StepInvoice";
import PDF from "../PDF/PDF";
import '../../css/CreateDoc.css';
import userListAPI from "../../api/userListAPI";
import {useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/Common";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import invoiceAPI from "../../api/invoiceAPI";

toast.configure();
function InvoiceContent() {
    const location = useLocation();
    const history = useHistory();
    const [create, setCreate] = useState(false);
    function toogle() {
        setCreate(!create)
    }
    const [signer, setSigner] = useState('');
    const viewer = location.state.viewer;
    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(location.state.data.signer)
                setSigner(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[])
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    async function handleCreated(e) {
        e.preventDefault(); 
        const file = location.state.file[0];
        const convertBase64 = await base64(file)
        const url = convertBase64.slice(28)
        const params = {
            dateCreate: date,
            createrId : getUser().Id,
            dateExpire: location.state.data.date,
            description: location.state.data.title,
            signerId: location.state.data.signer,
            invoiceURL: url
        }
        invoiceAPI.addInvoice(params).then(function(res) {
            toast.success("You has created invoice successfully", {position: toast.POSITION.TOP_CENTER});
            history.push('/document'); 
        }).catch(function(error) {
            console.log(error)
        })
    }
  
    function base64(file) {
        return new Promise((resolve)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ()=>{
                resolve(fileReader.result);
            };
        });
    }
   
    return(
        <div>
            <StepInvoice activeStep={4}/>
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
                                        <p style={{float:'right', fontSize:'20px'}}>Type Document:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>Invoice</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right', fontSize:'20px'}}>Title:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>{location.state.data.title}</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right', fontSize:'20px'}}>Signer:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>{signer.name}</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right', fontSize:'20px'}}>Viewer:</p>
                                    </Col>
                                    <Col>
                                            {viewer.map((data) => (
                                                <tr key={data.id}>
                                                    <td style={{float:'left', fontSize:'20px'}}>{data.name}</td>
                                                </tr>
                                            ))}  
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right', fontSize:'20px'}}>The expiration date:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>{location.state.data.date}</p>
                                    </Col>
                                </FormGroup>
                                <div>
                                    <Button color="secondary" onClick={()=> history.push('/document')}>Cancel</Button> {' '}
                                    <Button color="primary" onClick={toogle}>Create</Button>
                                </div>
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
                <Modal isOpen={create} toggle={toogle} style={{marginTop:'20%', marginRight:'50%'}}>
                    <ModalHeader>Do you want create Invoice?</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={toogle}>No</Button>{' '}
                            <Button color="primary" onClick={handleCreated}>Yes</Button>
                        </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}
export default InvoiceContent;