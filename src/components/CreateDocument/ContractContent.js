import {Container,Form, FormGroup, Row, Col, Label, Button, Modal, ModalFooter, ModalHeader, Table} from "reactstrap";
import Header from "../Nav/Header";
import StepContract from "../Sidebar/Stepper";
import PDF from "../PDF/PDF";
import '../../css/CreateDoc.css';
import {useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import companyListAPI from "../../api/companyListAPI";
import { getUser } from "../../utils/Common";
import contractAPI from "../../api/contractAPI";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import axios from "axios";

function ContractContent() {
    const location = useLocation();
    const history = useHistory();
    const [create, setCreate] = useState(false);
    const [signer, setSigner] = useState('');
    const [guest, setGuest] = useState('');
    const [company, setCompany] = useState('');

    function toogle() {
        setCreate(!create)
    }
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
    useEffect(()=>{
        async function getCompany() {
            try {
                const res = await companyListAPI.getCompanyById(location.state.data.company_guest)
                setCompany(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCompany();
    },[])
    useEffect(()=>{
        async function getGuest() {
            try {
                const res = await userListAPI.getUserById(location.state.data.signer_guest)
                setGuest(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getGuest();
    },[])
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(location.state)
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
            contractURL: url
        }
        contractAPI.addContract(params).then(function(res) {
            const contractId = res.data.id;
            const data = {
                contractId : contractId,
                listSignId : location.state.listSignId
            }
            axios.post("https://datnxeoffice.azurewebsites.net/api/contracts/addsigntocontract",data).catch(function(error){
                console.log(error);
            })
            const viewer = {
                contractId : contractId,
                listViewersId: location.state.listViewerId
            }
            axios.post("https://datnxeoffice.azurewebsites.net/api/contracts/addviewertocontract",viewer).catch(function(error){
                console.log(error)
            })
            toast.success("You has created contract successfully", {position: toast.POSITION.TOP_CENTER});
            history.push('/document')
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
            <StepContract activeStep={6}/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup row>
                                    <Label style={{fontWeight:'bold',color:'blue', fontSize:'30px', marginTop:'2%',marginLeft:'18%'}}>Document content</Label>
                                </FormGroup>
                                <FormGroup row style={{marginTop:'2rem'}}>
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
                                        <p style={{float:'right', fontSize:'20px'}}>Company Guest:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>{company.name}</p>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={5}>
                                        <p style={{float:'right', fontSize:'20px'}}>Signer Guest:</p>
                                    </Col>
                                    <Col>
                                        <p style={{float:'left', fontSize:'20px'}}>{guest.name}</p>
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
                    <ModalHeader>Do you want create Contract?</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={toogle}>No</Button>{' '}
                            <Button color="primary" onClick={handleCreated}>Yes</Button>
                        </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}
export default ContractContent;