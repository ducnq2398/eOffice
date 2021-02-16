import { useState } from "react";
import { Container, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, Col, Form, Row, Input, Button } from "reactstrap";
import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";
import '../../../css/Department.css';

function DepartmentManagerment() {
    const [isOpen, setIsOpen] = useState(false);
    function toogle() {
        setIsOpen(!isOpen);
    }
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <div className="add">
                        <FormGroup row>
                            <ButtonDropdown direction="right" isOpen={isOpen} toggle={toogle} >
                                <DropdownToggle style={{borderRadius:'1px'}} color="primary">+Add department</DropdownToggle>
                                <DropdownMenu style={{marginTop:'100px'}}>
                                    <Form className="addd">
                                        <h4 style={{marginLeft:'10px'}}>Add department</h4>
                                        <Row className="colll">
                                            <Col>
                                                <Input type="select" name="parentdepartment" defaultValue="1">
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Input type="text" name="subdepartment"/>
                                            </Col>
                                        </Row>
                                        <div className="btn-form">
                                            <Button color="secondary">Cancel</Button> {' '}
                                            <Button color="primary">Create</Button>
                                        </div>
                                    </Form>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </FormGroup>
                    </div>
                </Container>
            </div>
        </div>
    )
}
export default DepartmentManagerment;