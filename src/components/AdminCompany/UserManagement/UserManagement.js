import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Col, ButtonGroup, Table, ButtonDropdown, DropdownToggle, DropdownMenu, Label, Modal, ModalHeader, ModalBody, Container, ModalFooter} from "reactstrap";
import userListAPI from "../../../api/userListAPI";
import Header from "../../Nav/Header";
import Panigation from "../../Panigation/Panigation";
import Sidebar from "../../Sidebar/Sidebar";
import './../../../css/UserManagement.css';
import icon from "../../../images/delete.png";
import { getUser } from "../../../utils/Common";
import GetDepartment from "../../GetData/GetDepartment";
import Switch from 'react-switch';
import departmentAPI from "../../../api/departmentAPI";

function UserManagement(){
    const [userList, setUserList] = useState([]);
    const [department, setDepartment] = useState([]);
    const [checkAcitve, setCheckActive] = useState(true);
    const [user, setUser] = useState({
        id: '',
        username: '',
        subDepartment: 1,
        email:''
    })
    const [isOpen, setIsOpen] = useState(false);
    const [del, setDel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(12);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);
    const toogle = () => setIsOpen(!isOpen);
    const [openEdit, setOpenEdit] = useState(false);
    const openE = () => setOpenEdit(!openEdit);
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');
    useEffect(()=>{
        const user = getUser();
        const id = user.CompanyId;
        async function fetchUserList(){
            try {
                const response = await userListAPI.getUserByCompanyId(id);
                setUserList(response.data);
            }catch (error) {
            console.log(error);
        }}
        fetchUserList();
    },[])
    useEffect(()=>{
        async function getDepartment() {
            const user = getUser();
            const id = user.CompanyId;
            try {
                const res = await departmentAPI.getDepartmentByCompanyId(id);
                setDepartment(res.data)
            } catch (error) {
                console.log(error);
            }   
        }
        getDepartment();
    },[])

    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }

    function handleOnInput(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setUser({
            ...user,
            [name] : value,
        })
    }
    return(
        <div>
            <Sidebar/>
            <div className="main-panel1">
            <Header/>
            <Container fluid={true}>
                <div className="form-search">
                    <FormGroup row>
                        <ButtonDropdown direction="right" isOpen={isOpen} toggle={toogle} >
                            <DropdownToggle style={{height:'80%', borderRadius:'1px'}} color="primary">+Add user</DropdownToggle>
                            <DropdownMenu className="form-add">
                                <Form>
                                    <h3>Add User</h3>
                                    <FormGroup row>
                                        <Col>
                                            <Input type="text" name="username" required placeholder="User name"onChange={handleOnInput}/>
                                        </Col>
                                        <Col>
                                            <Input type="tel" name="phone" required placeholder="User phone number" onChange={handleOnInput}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <Input type="select" name="subDepartment" onChange={handleOnInput}>
                                                <option value="">Select department</option>
                                                {department.map(depart =>(
                                                    <option key={depart.id} value={depart.id}>{depart.name}</option>
                                                ))}
                                            </Input>
                                        </Col>
                                        <Col>
                                            <Input type="email" name="email" placeholder="Email" onChange={handleOnInput} required/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col>
                                            <Input type="text" name="address" placeholder="Address"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col style={{marginLeft:'60%'}}>
                                            <Button color="secondary" onClick={toogle}>Cancel</Button>{' '}
                                            <Button color="primary">Create</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Col>
                            <Input type="text" name="search" placeholder="Search by account name" onChange={event => {setSearch(event.target.value)}}/>
                        </Col>
                        <Col>
                            <ButtonGroup className="btn-group">
                                <Button outline color="primary">Active</Button>
                                <Button outline color="primary">Deactive</Button>
                            </ButtonGroup>
                        </Col>
                    </FormGroup>
                </div>
                <Table hidden={search !=='' ? true : false} hover>
                    <thead>
                        <tr style={{textAlign:'left'}}>
                            <th>Account name</th>
                            <th>Department</th>
                            <th>Phone number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(user =>(
                            <tr key={user.id} className="row_data" >
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{user.name}</td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>
                                    <GetDepartment id={user.departmentId}/>
                                </td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{user.phone}</td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{user.email}</td>
                                <td> 
                                    <img className="hide" style={{width:'25px',height:'25px'}} src={icon} alt="" onClick={()=>setDel(!del)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Table hidden={search=== '' ? true : false} hover>
                    <thead>
                        <tr>
                            <th>Account name</th>
                            <th>Department</th>
                            <th>Phone number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.filter((users) => {
                            if(users.name.toLowerCase().includes(search.toLowerCase())){
                                return users
                            }
                        }).map(users =>(
                            <tr key={users.id} >
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{users.name}</td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>
                                    <GetDepartment id={users.departmentId}/>
                                </td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{users.phone}</td>
                                <td onClick={()=>{setData(user); setOpenEdit(true)}}>{users.email}</td>
                                <td> 
                                    <img style={{width:'25px',height:'25px'}} src={icon} alt="" onClick={()=> setDel(!del)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div hidden={search !== '' ? true : false} style={{width:'100px', marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>
                    <Panigation
                        currentPage= {currentPage}
                        postsPerPage={postPerPage}
                        totalPosts = {userList.length}
                        paginate={paginate}
                     />
                </div>
            <Modal isOpen={openEdit} toggle={openE}>
                <ModalHeader>User Detail</ModalHeader>
                <ModalBody>
                <Form>
                        <FormGroup row>
                            <Col>
                                <Input type="text" name="username" required value={data.name} onChange={handleOnInput}/>
                            </Col>
                            <Col>
                                <Input type="tel" name="phone" required value={data.phone} onChange={handleOnInput}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Input type="select" name="subDepartment" onChange={handleOnInput}>
                                    {department.map(depart =>(
                                        <option key={depart.id} value={depart.id}>{depart.name}</option>
                                    ))}
                                </Input>
                            </Col>
                            <Col>
                                <Input type="email" name="email" value={data.email} onChange={handleOnInput} required/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Input type="text" name="address" value={data.address} onChange={handleOnInput}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label>
                                    <span>{checkAcitve===true ? 'Active' : 'Deactive'}</span>
                                    <Switch onChange={()=> setCheckActive(!checkAcitve)} checked={checkAcitve}/>
                                </Label>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col style={{marginLeft:'60%'}}>
                                <Button color="secondary" onClick={openE}>Cancel</Button>{' '}
                                <Button color="primary">Update</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={del} toggle={()=>setDel(!del)}>
                    <ModalHeader>Do you want delete user?</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={()=>setDel(!del)}>No</Button>{' '}
                            <Button color="primary">Yes</Button>
                        </ModalFooter>
                </Modal>
            </Container>
            </div>
        </div>
    );
}

export default UserManagement;