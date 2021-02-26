import { useEffect, useState } from "react";
import { Container, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, Col, Form, Row, Input, Button } from "reactstrap";
import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";
import '../../../css/Department.css';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem } from "@material-ui/lab";
import departmentAPI from "../../../api/departmentAPI";
import { getUser } from "../../../utils/Common";

function DepartmentManagerment() {
    const [isOpen, setIsOpen] = useState(false);
    const [listDepartment, setListDepartment] = useState([]);
    function toogle() {
        setIsOpen(!isOpen);
    }
    useEffect(()=>{
        async function getDepartment(){
            const id = getUser().CompanyId;
            try {
                const response = await departmentAPI.getDepartmentByCompanyId(id);
                setListDepartment(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getDepartment();
    },[])
   
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
                                                <Input type="select" name="parentdepartment">
                                                    <option></option>
                                                    {listDepartment.map(data =>(
                                                        <option key={data.id} value={data.id}>{data.name}</option>
                                                    ))}
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Input type="text" name="subdepartment" placeholder="Department name"/>
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
                        <TreeView className="tree" defaultCollapseIcon={<ExpandMoreIcon/>} defaultExpandIcon={<ChevronRightIcon/>}>
                            {listDepartment.map((department)=>(
                                <TreeItem key={department.id} nodeId={department.id} label={department.name}>
                                    
                                </TreeItem>
                            ))}
                        </TreeView>
                    </div>
                </Container>
            </div>
        </div>
    )
}
export default DepartmentManagerment;