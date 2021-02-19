import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Col, ButtonGroup, Table, ButtonDropdown, DropdownToggle, DropdownMenu, Label, Modal, ModalHeader, ModalBody, Container} from "reactstrap";
import userListAPI from "../../../api/userListAPI";
import Header from "../../Nav/Header";
import Panigation from "../../Panigation/Panigation";
import Sidebar from "../../Sidebar/Sidebar";
import './../../../css/UserManagement.css';
import icon from "../../../images/delete.png";
import { getUser } from "../../../utils/Common";
import GetDepartment from "../../GetDepartment/GetDepartment";
import Switch from 'react-switch';

function UserManagement(){
    const [userList, setUserList] = useState([]);
    const [checkAcitve, setCheckActive] = useState(true);
    const [user, setUser] = useState({
        id: '',
        username: '',
        subDepartment: 1,
        email:''
    })
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(13);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);
    const toogle = () => setIsOpen(!isOpen);
    const [openEdit, setOpenEdit] = useState(false);
    const openE = () => setOpenEdit(!openEdit);
    const [search, setSearch] = useState('');
    useEffect(()=>{
        const user = getUser();
        const id = user.companyId;
        async function fetchUserList(){
            try {
                const response = await userListAPI.getUserByCompanyId(id);
                setUserList(response.data);
            }catch (error) {
            console.log(error);
        }}
        fetchUserList();
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
                                            <Input type="select" name="subDepartment" defaultValue="1" onChange={handleOnInput}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
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
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(user =>(
                            <tr className="row_data" key={user.id}  >
                                <td onClick={openE}>{user.name}</td>
                                <td onClick={openE}>
                                    <GetDepartment id={user.departmentId}/>
                                </td>
                                <td onClick={openE}>{user.email}</td>
                                <td className="hide"> 
                                    <img style={{width:'25px',height:'25px'}} src={icon} alt="" onClick={toogle}/>
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
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.filter((users) => {
                            if(users.name.toLowerCase().includes(search.toLowerCase())){
                                return users
                            }
                        }).map(users =>(
                            <tr className="row_data" key={users.id}  >
                                <td onClick={openE}>{users.name}</td>
                                <td onClick={openE}>
                                    <GetDepartment id={users.departmentId}/>
                                </td>
                                <td onClick={openE}>{users.email}</td>
                                <td className="hide"> 
                                    <img style={{width:'25px',height:'25px'}} src={icon} alt="" onClick={toogle}/>
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
                                <Input type="text" name="username" required placeholder="User name"/>
                            </Col>
                            <Col>
                                <Input type="number" name="phone" required placeholder="User phone number"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Input type="select" name="department">
                                    <option>1</option>
                                    <option>2</option>
                                </Input>
                            </Col>
                            <Col>
                                <Input type="email" name="email" placeholder="Email" required/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Input type="text" name="address" placeholder="Address"/>
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
            </Container>
            </div>
        </div>
    );
}

export default UserManagement;