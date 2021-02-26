import { Container, Form, FormGroup,Col ,Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, Table, Label, Modal, ModalHeader, ModalFooter } from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Document.css';
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import search from '../../images/search1.png';
import del from '../../images/delete.png';
import notsigned from "../../images/not-signed.png";
import done from '../../images/true.png';
import choo from '../../images/choo.png';
import StepDoc from "../Sidebar/StepDoc";
import PagDoc from "../Panigation/PagDoc";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";

function Document(props){
    const [isOpen, setIsOpen] = useState(false);
    const [dele, setDel] =useState(false);
    const toogle = () => setIsOpen(!isOpen);
    const [postList, setPostList] = useState([]);
    const [listInvoice, setListInvoice] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = listInvoice.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(()=>{
        async function getInvoice() {
            try {
                const res = await invoiceAPI.getAllInvoice();
                setListInvoice(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getInvoice();
    },[])
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    function Contract() {
        props.history.push('/contract')
    }
    function Invoice() {
        props.history.push('/invoice');
    }
    function All() {
        setPostList(data)
    }
    function ListContract() {
        setPostList( 
            postList.filter(data =>{
            if(data.status===1){
                return data
                }
            })
        )
    }
    function ListInvoice() {
        setPostList( 
            postList.filter(data =>{
            if(data.status===1){
                return data
                }
            })
        )
    }
    function ListSigned() {
        setPostList( 
            postList.filter(data =>{
            if(data.status===1){
                return data
                }
            })
        )
    }
    function ListNotSigned() {
        setPostList( 
            postList.filter(data =>{
            if(data.status===1){
                return data
                }
            })
        )
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
                            <Col className="col-doc">
                                <Input className="selectbox" type="select" defaultValue="1" name="selectDocument">
                                    <option value={1} onClick={All}>All</option>
                                    <option value={2} onClick={ListContract}>Contract</option>
                                    <option value={3} onClick={ListInvoice}>Invoice</option>
                                </Input>
                            </Col>
                            <Col className="col-status">
                                <Input className="selectbox" type="select" defaultValue="1" name="selectDocument">
                                    <option>Status</option>
                                    <option value={2} onClick={ListSigned }>Signed</option>
                                    <option value={3} onClick={ListNotSigned}>Not signed yet</option>
                                </Input>
                            </Col>
                            
                            <Col className="col-pag">
                                <PagDoc
                                            currentPage= {currentPage}
                                            postsPerPage={postPerPage}
                                            totalPosts = {listInvoice.length}
                                            paginate={paginate}
                                            />
                            </Col>
                        </FormGroup>
                    </div>
                    <Table hover>
                        <tbody>
                            {currentPosts.map((doc) =>(
                                <tr key={doc.id}>
                                    <td>
                                    <Label style={{fontWeight:'bold'}}>Creater name</Label>
                                    <br/>
                                    <Label><GetCreater id={doc.createrId}/></Label>
                                    </td>
                                    <td>
                                        <Label style={{fontWeight:'bold'}}>Title document</Label>
                                        <br/>
                                        <Label>{doc.description}</Label>
                                    </td>
                                    <td>
                                        <Label style={{fontWeight:'bold'}}>Status</Label>
                                        <br/>
                                        <Label className="step">
                                            <StepDoc activeStep={doc.status+1}/>
                                        </Label>
                                    </td>
                                    <td>
                                        <Label></Label>
                                        <br/>
                                        <Label>
                                            <img hidden={doc.status===3 ? false : true} src={done} alt="" width="35px" height="30px"/>
                                            <img hidden={doc.status===3 ? true : false} src={notsigned} alt=""/>
                                        </Label>
                                    </td>
                                    <td>
                                        <Label style={{fontWeight:'bold'}}>Date expire</Label>
                                        <br/>
                                        <Label>{doc.dateExpire}</Label>
                                    </td>
                                    <td>
                                        <Label></Label>
                                        <br/>
                                        <Label  hidden={doc.status===3 ? true : false}><img src={del} onClick={()=>setDel(true)} alt="" width="25px" height="25px"/></Label>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </Table>
                    <Modal isOpen={dele}>
                        <ModalHeader>Are you sure delete document?</ModalHeader>
                        <ModalFooter>
                            <Button color="secondary" onClick={()=>setDel(!dele)}>No</Button>{' '}
                            <Button color="primary">Yes</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        </div>
    );
}
export default Document;