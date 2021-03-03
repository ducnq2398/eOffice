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
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

function DepartmentManagerment() {
    const [isOpen, setIsOpen] = useState(false);
    const [listDepartment, setListDepartment] = useState([]);
    const [data, setData] = useState({
        parentdepartment: '',
        subdepartment: '',
    })
    
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
    },[addDepartment])
    function handleOnChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setData({
            ...data,
            [name]: value
        })
    }
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    function addDepartment(e) {
        e.preventDefault();
        if(data.subdepartment==='' && data.subdepartment===''){
            toast.error("Please input department name", {position: toast.POSITION.TOP_CENTER});
        }else if(data.subdepartment==='' && data.subdepartment !==''){
            const params = {
                name: data.subdepartment,
                companyId: getUser().CompanyId,
                creatorId: getUser().Id,
                dateCreate: date,
            }
            departmentAPI.addDepartment(params).then(function(res) {
                toast.success("Add department successfully", {position: toast.POSITION.TOP_CENTER});

            }).catch(function(error) {
                console.log(error)
            })
        }
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
                                                <Input type="select" name="parentdepartment" onChange={handleOnChange}>
                                                    <option></option>
                                                    {listDepartment.map(data =>(
                                                        <option key={data.id} value={data.id}>{data.name}</option>
                                                    ))}
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Input type="text" name="subdepartment" placeholder="Department name" onChange={handleOnChange}/>
                                            </Col>
                                        </Row>
                                        <div className="btn-form">
                                            <Button color="secondary" onClick={() => setIsOpen(false)}>Cancel</Button> {' '}
                                            <Button color="primary" onClick={addDepartment}>Create</Button>
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
                                    <TreeView>
                                        
                                    </TreeView>
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