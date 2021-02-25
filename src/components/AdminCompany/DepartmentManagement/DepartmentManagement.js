import { useState } from "react";
import { Container, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, Col, Form, Row, Input, Button } from "reactstrap";
import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";
import '../../../css/Department.css';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem } from "@material-ui/lab";


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
                                            <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button> {' '}
                                            <Button color="primary">Create</Button>
                                        </div>
                                    </Form>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </FormGroup>
                    </div>
                    <div>
                        <TreeView defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ChevronRightIcon/>}>
                            <TreeItem nodeId="1" label="AAAA">
                                <TreeItem nodeId="2" label="BBB"/>
                            </TreeItem>
                        </TreeView>
                    </div>
                </Container>
            </div>
        </div>
    )
}
export default DepartmentManagerment;