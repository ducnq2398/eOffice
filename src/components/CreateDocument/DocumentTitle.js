import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import '../../css/DocumentTitle.css';
import VerticalLinearStepper from "../Sidebar/Stepper";
import { useHistory } from "react-router-dom";

function DocumentTitle(){
    const history = useHistory();
    const url = localStorage.getItem('pdf');
    const filename = localStorage.getItem('filename');
    function handleReturn(){
        history.push('/create');
    }
    return(
        <div>
            <VerticalLinearStepper activeStep={0}/>
            <div className="main-panel">
                <Header/>
                <Row>
                    <Col>
                        <Form className="form-in">
                            <FormGroup row className="banner">
                                <Label>Document information input</Label>
                            </FormGroup>
                            <FormGroup>
                                File name: {filename}
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" defaultValue="Contract" disabled/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" placeholder="Title"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" placeholder="Signer"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" placeholder="Select company guest"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" placeholder="Signer guest"/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={handleReturn}>Return</Button>{' '}
                                <Button style={{width:'75px'}} color="primary">Next</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col>
                        <Form className="form-doc">
                            <FormGroup row>
                                <PDF pdf={url}/>
                            </FormGroup>
                        </Form>
                        
                    </Col>
                </Row>
                
                
            </div>
        </div>
    )
}
export default DocumentTitle;