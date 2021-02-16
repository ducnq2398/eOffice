import { Container, Form, FormGroup,Col ,Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, Table, Label } from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Document.css';
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import search from '../../images/search1.png';
import del from '../../images/delete.png';
import notsigned from "../../images/not-signed.png";
import done from '../../images/true.png';
import choo from '../../images/choo.png';
import StepDoc from "../Sidebar/StepDoc";
import PagDoc from "../Panigation/PagDoc";

function Document(props){
    const [isOpen, setIsOpen] = useState(false);
    const toogle = () => setIsOpen(!isOpen);
    const [postList, setPostList] = useState([]);
    const [listAll, setListAll] = useState([]);
    const [listContract, setListContract] = useState([]);
    const [listInvoice, setListInvoice] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    function Contract() {
        props.history.push('/create')
    }
    function Invoice() {
        props.history.push('/invoice');
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
                                            <Button color="primary" onClick={Invoice}>Invoice</Button>
                                        </FormGroup>
                                    </Form>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Col sm={4}>
                                <Input type="text" name="search"/>
                                <img className="se" src={search} alt="search"/>
                            </Col>
                            <Col sm={4}>
                                <Input className="selectbox" type="select" defaultValue="1" name="selectDocument">
                                    <option value={1} onClick={() => setPostList(listAll)}>All</option>
                                    <option value={2} onClick={() => setPostList(listContract)}>Contract</option>
                                    <option value={3} onClick={() => setPostList(listInvoice)}>Invoice</option>
                                </Input>
                            </Col>
                            <Col sm={2}>
                                <PagDoc
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
                                <td>
                                    <Label style={{fontWeight:'bold'}}>Account name</Label>
                                    <br/>
                                    <Label>Duc dep trai</Label>
                                </td>
                                <td>
                                    <Label style={{fontWeight:'bold'}}>Title document</Label>
                                    <br/>
                                    <Label className="step">
                                        <StepDoc activeStep={3}/>
                                    </Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label>
                                        <img src={done} alt="" width="35px" height="30px"/>
                                    </Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label>2021-02-01</Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label  hidden={true}><img src={del} alt="" width="25px" height="25px"/></Label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label style={{fontWeight:'bold'}}>Account name</Label>
                                    <br/>
                                    <Label>Duc dep trai</Label>
                                </td>
                                <td>
                                    <Label style={{fontWeight:'bold'}}>Title document</Label>
                                    <br/>
                                    <Label className="step">
                                        <StepDoc activeStep={1}/>
                                    </Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label>
                                        <img src={notsigned} alt=""/>
                                    </Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label>2021-01-02</Label>
                                </td>
                                <td>
                                    <Label></Label>
                                    <br/>
                                    <Label>{<img src={del} alt="" width="25px" height="25px"/>}</Label>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
}
export default Document;