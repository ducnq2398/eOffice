import { Container, Form, FormGroup , Col, Row , Input, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, Table, Label } from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Document.css';
import Sidebar from "../Sidebar/Sidebar";
import Panigation from "../Panigation/Panigation";
import { useState } from "react";
import search from '../../images/search1.png';
import del from '../../images/delete.png';
import choo from '../../images/choo.png';

function Document(props){
    const [isOpen, setIsOpen] = useState(false);
    const toogle = () => setIsOpen(!isOpen);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(15);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    function Contract() {
        props.history.push('/create')
    }
    return(
        <div>
            <Sidebar/>
            <div className="main-content">
                <Header/>
                <Container fluid={true}>
                    <div className="form-create">
                        <FormGroup row>
                            <ButtonDropdown direction="right" isOpen={isOpen} toggle={toogle} >
                                <DropdownToggle style={{height:'70%'}} color="primary">+Create</DropdownToggle>
                                <DropdownMenu>
                                    <Form className="form-create2">
                                        <FormGroup>
                                            <img style={{marginLeft:'30%'}} src={choo} alt=""/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label style={{marginLeft:'10%'}}>Please select the type of document you want to create</Label>
                                        </FormGroup>
                                        <FormGroup style={{marginLeft:'35%'}}>
                                            <Button color="primary" onClick={Contract}>Contract</Button>{' '}
                                            <Button color="primary" onClick={toogle}>Invoice</Button>
                                        </FormGroup>
                                    </Form>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Col>
                                <Input type="text" name="search"/>
                                <img className="se" src={search} alt="search"/>
                            </Col>
                            <Col>
                                <Input className="selectbox" type="select" defaultValue="1" name="selectDocument">
                                    <option value={1}>All</option>
                                    <option value={2}>Contract</option>
                                    <option value={3}>Invoice</option>
                                </Input>
                            </Col>
                                <Input className="selectbox2" type="select" defaultValue="1" name="selectTime">
                                    <option value={1}>New date</option>
                                    <option value={2}>Contract</option>
                                    <option value={3}>Invoice</option>
                                </Input>
                            <Col>
                            <Panigation
                                        currentPage= {currentPage}
                                        postsPerPage={postPerPage}
                                        totalPosts = {20}
                                        paginate={paginate}
                                        />
                            </Col>
                        </FormGroup>
                    </div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Account name</td>
                                <td>Title document</td>
                                <td>status</td>
                                <td>2021-01-01</td>
                                <td>{<img src={del} alt="" width="25px" height="25px"/>}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}
export default Document;