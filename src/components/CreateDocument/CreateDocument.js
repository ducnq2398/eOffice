import { Button, Container, Input, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import { useState ,useEffect} from "react";
import '../../css/CreateDoc.css'
import VerticalLinearStepper from "../Sidebar/Stepper";
import {useHistory } from "react-router-dom";
import companyListAPI from "../../api/companyListAPI";

function CreateDocument(){
    const [listCompany, setListCompany] = useState([]);
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState();
    const [dataUpload, setDataUpload] =useState({
        title : '',
        signer: '',
        company_guest: '',
        signer_guest: '',
    });

    function handleOnChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setDataUpload({
            ... dataUpload,
            [name] : value,
        })
    }
    function File(e) {
        const url = e.target.files;
        setFile(url[0]);
    }
    console.log(dataUpload)
    function handleNext(){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    function handlePrev() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(activeStep===0){
            history.push('/dashboard');
        }
    }

    useEffect(()=>{
        async function fetListData(){
            try {
                const response = await companyListAPI.getAll();
                setListCompany(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListData();
    },[]);
    return(
        <div>
            <VerticalLinearStepper activeStep={activeStep} />
            <div className="main-panel">
            <Container fluid={true}>
                <Header/>
                <Row>
                    <Col>
                        <Form className="form-in">
                            <FormGroup row className="banner">
                                <Label>Create Document</Label>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{color:'blue'}} sm={3}>File Upload</Label>
                                <Col>
                                    <Input type="file" accept=".pdf" onChange={File} disabled={activeStep===0? false : true} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} style={{color:'blue'}}>Document type</Label>
                                <Col>
                                    <Input type="text" defaultValue="Contract" disabled/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} style={{color:'blue'}}>Title</Label>
                                <Col>
                                    <Input type="text" name="title" placeholder="Title" onChange={handleOnChange} disabled={activeStep===0 ? false : true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} style={{color:'blue'}}>Signer</Label>
                                <Col>
                                    <Input type="select" name="signer" placeholder="Signer" onChange={handleOnChange} disabled={activeStep===1 ? false : true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} style={{color:'blue'}}>Company Guest</Label>
                                <Col>
                                    <Input type="select" name="company_guest" onChange={handleOnChange} disabled={activeStep===2 ? false : true}>
                                        <option value="">Select Company Guest</option>
                                        {listCompany.map(data => (
                                            <option value={data.id} key={data.id}>{data.name}</option>
                                        ))}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} style={{color:'blue'}}>Signer Guest</Label>
                                <Col>
                                    <Input type="select" name="signer_guest" onChange={handleOnChange} disabled={activeStep===3 ? false : true}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={handlePrev}>{activeStep===0 ? 'Cancel' : 'Return'}</Button>{' '}
                                <Button style={{width:'75px'}} color="primary" onClick={handleNext}>Next</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col>
                        <Form className="form-doc">
                            <FormGroup row>
                                <PDF pdf={file}/>
                            </FormGroup>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}
export default CreateDocument;