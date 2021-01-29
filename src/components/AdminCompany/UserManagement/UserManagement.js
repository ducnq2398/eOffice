import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Col, ButtonGroup, Table, ButtonDropdown, DropdownToggle, DropdownMenu, Label } from "reactstrap";
import userListAPI from "../../../api/userListAPI";
import Header from "../../Nav/Header";
import Panigation from "../../Panigation/Panigation";
import Sidebar from "../../Sidebar/Sidebar";
import './../../../css/UserManagement.css';

function UserManagement(){
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);
    const toogle = () => setIsOpen(!isOpen);
    useEffect(()=>{
        async function fetchUserList(){
            try {
                const response = await userListAPI.getAll();
                setUserList(response.data);
            }catch (error) {
            console.log(error);
        }}
        fetchUserList();
    },[])
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <div className="form-search">
                    <FormGroup style={{marginTop:'50px'}} row>
                        <ButtonDropdown direction="right" isOpen={isOpen} toggle={toogle} >
                            <DropdownToggle style={{height:'70%'}} color="primary">+Add user</DropdownToggle>
                            <DropdownMenu className="form-add">
                                <Form>
                                    <h3>Add User</h3>
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
                                        <Col style={{marginLeft:'60%'}}>
                                            <Button color="secondary" onClick={toogle}>Cancel</Button>{' '}
                                            <Button color="primary">Create</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Col>
                            <Input type="text" name="search" placeholder="Search by account name"/>
                        </Col>
                        <Col>
                            <ButtonGroup>
                                <Button outline color="primary">Active</Button>
                                <Button outline color="primary">Deactive</Button>
                            </ButtonGroup>
                        </Col>
                        <Col>
                        <Panigation
                                    currentPage= {currentPage}
                                    postsPerPage={postPerPage}
                                    totalPosts = {userList.length}
                                    paginate={paginate}
                                    />
                        </Col>
                    </FormGroup>
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Account name</th>
                            <th>Department</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(user =>(
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.subDepartment}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default UserManagement;