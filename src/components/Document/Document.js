import { Container, Form, FormGroup,Col ,Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, Table, Label, Modal, ModalHeader, ModalFooter} from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Document.css';
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import search from '../../images/search1.png';
import del from '../../images/delete.png';
import notsigned from "../../images/status.png";
import done from '../../images/true.png';
import choo from '../../images/choo.png';
import StepDoc from "../Sidebar/StepDoc";
import PagDoc from "../Panigation/PagDoc";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import {useHistory} from "react-router-dom";
import contractAPI from "../../api/contractAPI";
import { getUser } from "../../utils/Common";

function Document(){
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [dele, setDel] =useState(false);
    const toogle = () => setIsOpen(!isOpen);
    const [postList, setPostList] = useState([]);
    const [listAllInvoice, setListAllInvoice] = useState([]);
    const [listAllContract, setListAllContract] = useState([]);
    const [listContractById, setListContractById] = useState([]);
    const [listInvoiceById, setListInvoiceById] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = [];
    useEffect(()=>{
        async function getAllContrac() {
            const id = getUser().CompanyId;
            try {
                await contractAPI.getContractByCompanyId(id).then(function(res) {
                    setListAllContract(res.data)            
                });
            } catch (error) {
                console.log(error);
            }
        }
        getAllContrac();
    },[])
    useEffect(()=>{
        async function getAllInvoice() {
            const id = getUser().CompanyId;
            try {
                await invoiceAPI.getInvoiceByCompanyId(id).then(function(res) {
                   setListAllInvoice(res.data)
                });
            } catch (error) {
                console.log(error)
            }
        }
        getAllInvoice();
    },[])
    
    useEffect(()=>{
        async function getContractById() {
            const id = getUser().Id;
            try {
                await contractAPI.getContractBySignerId(id).then(function(res) {
                    contractAPI.getContractByViewerId(id).then(function(res2) {
                        const list = [...res.data, ...res2.data];
                        setListContractById(list);  
                    })
                })
            } catch (error) {
                console.log(error)
            }
        }
        getContractById();
    },[])
    
    useEffect(()=>{
        async function getInvoiceById() {
            const id = getUser().Id;
            try {
                await invoiceAPI.getInvoiceByViewerId(id).then(function(res) {
                    invoiceAPI.getInvoiceBySignerId(id).then(function(res2) {
                        const list = [...res.data, ...res2.data];
                        setListInvoiceById(list);
                    })
                })  
            } catch (error) {
                console.log(error)
            }
        }
        getInvoiceById();
    },[])
        
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    function Contract() {
        history.push('/contract')
    }
    function Invoice() {
        history.push('/invoice');
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
    function ListSigned(e) {
        e.preventDefault();
        setPostList( 
            postList.filter(data =>{
            if(data.status===3){
                return data
                }
            })
        )
    }
    function ListNotSigned(e) {
        e.preventDefault();
        setPostList( 
            postList.filter(data =>{
            if(data.status!==3){
                return data
                }
            })
        )
    }
    const list = [...listAllInvoice,...listAllContract];
    const list2 = [...listContractById,...listInvoiceById];
    if(getUser().Role==='1'){
        currentPosts.push(list.slice(indexOfFirstPost, indexOfLastPost));
    }
    if(getUser().Role==='2'){
        currentPosts.push(list2.slice(indexOfFirstPost, indexOfLastPost));
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
                                <DropdownToggle style={{height:'60%', borderRadius:'5px'}} color="primary">+Create</DropdownToggle>
                                <DropdownMenu>
                                    <Form className="form-create2">
                                        <FormGroup>
                                            <img style={{marginLeft:'30%'}} src={choo} alt=""/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label style={{marginLeft:'10%'}}>Please select the type of document you want to create</Label>
                                        </FormGroup>
                                        <FormGroup style={{marginLeft:'30%'}}>
                                            <Button color="primary" style={{width:'100px'}} onClick={Contract}>Contract</Button>{' '}
                                            <Button color="primary" style={{width:'100px'}} onClick={Invoice}>Invoice</Button>
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
                                        totalPosts = {getUser().Role==='1' ? list.length : list2.length}
                                        paginate={paginate}
                                />
                            </Col>
                        </FormGroup>
                    </div>
                    <Table hover>
                        <tbody>
                            {currentPosts[0].map((doc, key )=>(
                                <tr key={key}>
                                    <td onClick={()=> history.push({
                                        pathname: '/detail/invoice/' + doc.id + '/' + doc.description,
                                        state: doc
                                    })}>
                                        <Label style={{fontWeight:'bold'}}>Creator name</Label>
                                        <br/>
                                        <Label><GetCreater id={doc.creatorId}/></Label>
                                    </td>
                                    <td onClick={()=> history.push({
                                        pathname: '/detail/invoice/' + doc.id + '/' + doc.description,
                                        state: doc
                                    })}>
                                        <Label style={{fontWeight:'bold'}}>Title document</Label>
                                        <br/>
                                        <Label className="demo">{doc.description}</Label>
                                    </td>
                                    <td onClick={()=> history.push({
                                        pathname: '/detail/invoice/' + doc.id + '/' + doc.description,
                                        state: doc
                                    })}>
                                        <Label style={{fontWeight:'bold'}}>Status</Label>
                                        <br/>
                                        <Label className="step">
                                            <StepDoc activeStep={doc.status}/>
                                        </Label>
                                    </td>
                                    <td onClick={()=> history.push({
                                        pathname: '/detail/invoice/' + doc.id + '/' + doc.description,
                                        state: doc
                                    })}>
                                        <Label></Label>
                                        <br/>
                                        <Label>
                                            <img hidden={doc.status===3 ? false : true} src={done} alt=""/>
                                            <img hidden={doc.status===3 ? true : false} src={notsigned} alt=""/>
                                        </Label>
                                    </td>
                                    <td onClick={()=> history.push({
                                        pathname: '/detail/invoice/' + doc.id + '/' + doc.description,
                                        state: doc
                                    })}>
                                        <Label style={{fontWeight:'bold'}}>Date expire</Label>
                                        <br/>
                                        <Label>{doc.dateExpire.substring(10,0)}</Label>
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