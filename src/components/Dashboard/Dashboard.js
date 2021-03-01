import { Container, Form, FormGroup, Label, Row,Col, Table} from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import done from '../../images/true.png';
import invoiceAPI from "../../api/invoiceAPI";
import { getUser } from "../../utils/Common";
import contractAPI from "../../api/contractAPI";

function Dashboard(){
    const history = useHistory();
    const [listInvoice, setListInvoice] = useState([]);
    const [listContract, setListContract] = useState([]);
    const [listContractById] = useState([]);
    const [listInvoiceById] = useState([]);
    const [currentPage] = useState(1);
    const [postPerPage] = useState(5);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPostsContract = [];
    const currentPostsInvoice = [];

    useEffect(()=>{
        async function getAllDocument() {
            const id = getUser().CompanyId;
            try {
                const res = await invoiceAPI.getInvoiceByCompanyId(id);
                setListInvoice(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllDocument();
    },[])
    useEffect(()=>{
        async function getAllDocument() {
            const id = getUser().CompanyId;
            try {
                const res = await contractAPI.getContractByCompanyId(id);
                setListContract(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllDocument();
    },[])
    useEffect(()=>{
        async function getDocumentById() {
            const id = getUser().Id;
            try {
                await contractAPI.getContractBySignerId(id).then(function(res){
                    res.data.forEach(element => {
                        listContractById.push(element)
                    });
                })        
            } catch (error) {
                console.log(error)
            }
        }
        getDocumentById();
    },[])
    useEffect(()=>{
        async function getDocumentById() {
            const id = getUser().Id;
            try {             
                await contractAPI.getContractByViewerId(id).then(function(res){
                    res.data.forEach(element => {
                        listContractById.push(element)
                    });
                })
                
            } catch (error) {
                console.log(error)
            }
        }
        getDocumentById();
    },[])
    useEffect(()=>{
        async function getDocumentById() {
            const id = getUser().Id;
            try {          
                
            } catch (error) {
                console.log(error)
            }
        }
        getDocumentById();
    },[])
    useEffect(()=>{
        async function getDocumentById() {
            const id = getUser().Id;
            try {
                await invoiceAPI.getInvoiceByViewerId(id).then(function(res){
                    res.data.forEach(element => {
                        listInvoiceById.push(element)
                    });
                })
            } catch (error) {
                console.log(error)
            }
        }
        getDocumentById();
    },[])
    if(getUser().Role==='1'){
        currentPostsContract.push(listContract.slice(indexOfFirstPost, indexOfLastPost));
        currentPostsInvoice.push(listInvoice.slice(indexOfFirstPost, indexOfLastPost));
    }
    if(getUser().Role==='2'){
        currentPostsContract.push(listContractById.slice(indexOfFirstPost, indexOfLastPost));
        currentPostsInvoice.push(listInvoiceById.slice(indexOfFirstPost, indexOfLastPost));
    }
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <div>
                        <Row>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Label className="title">Contract</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Table hover>
                                        <tbody style={{textAlign:'left'}}>
                                                {currentPostsContract[0].map(data =>(
                                                    <tr key={data.id} onClick={()=> history.push({
                                                        pathname: '/detail/contract/' + data.id + '/' + data.description,
                                                        state: data
                                                    })}>
                                                        <td>
                                                            <p className="demo-2" >{data.description}</p>    
                                                        </td>
                                                        <td>{data.status!==3 ? <img src={notsigned} alt=""/> : <img src={done} alt=""/>}</td>
                                                        <td>{data.dateExpire.substring(10,0)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </FormGroup>
                                </Form>
                                <div>
                                    <Link to="/document">See more</Link>
                                </div>
                            </Col>
                            <Col>
                                <Form>
                                    <FormGroup>
                                        <Label className="title">Invoice</Label>
                                    </FormGroup>
                                    <FormGroup>
                                        <Table hover>
                                            <tbody style={{textAlign:'left'}}>
                                                {currentPostsInvoice[0].map(data =>(
                                                    <tr key={data.id} onClick={()=> history.push({
                                                        pathname: '/detail/invoice/' + data.id + '/' + data.description,
                                                        state: data
                                                    })}>
                                                        <td>
                                                            <p className="demo-2">{data.description}</p>
                                                        </td>
                                                        <td>{data.status!==3 ? <img src={notsigned} alt=""/> : <img src={done} alt=""/>}</td>
                                                        <td>{data.dateExpire.substring(10,0)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </FormGroup>
                                </Form>
                                <div>
                                    <Link to="/document">See more</Link>
                                </div>
                            </Col>
                        </Row>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label className="title">Activity Log</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Table responsive>
                                        <tbody>
                                            <tr>
                                                <td style={{float:'left', textAlign:'left'}}>
                                                    <Label>The contract documents has been signed by guest.</Label>
                                                    <br/>
                                                    <Link to="/notification">View detail</Link>
                                                
                                                </td>
                                                <td>21/01/2021</td>
                                            </tr>
                                            <tr>
                                                <td style={{float:'left', textAlign:'left'}}>
                                                    <Label>The contract documents has been signed by guest.</Label>
                                                    <br/>
                                                    <Link to="/">View detail</Link>
                                                
                                                </td>
                                                <td>21/01/2021</td>
                                            </tr>       
                                            <tr>
                                                <td style={{float:'left', textAlign:'left'}}>
                                                    <Label>The contract documents has been signed by guest.</Label>
                                                    <br/>
                                                    <Link to="/">View detail</Link>
                                                
                                                </td>
                                                <td>21/01/2021</td>
                                            </tr>   
                                            <tr>
                                                <td style={{float:'left', textAlign:'left'}}>
                                                    <Label>The contract documents has been signed by guest.</Label>
                                                    <br/>
                                                    <Link to="/">View detail</Link>
                                                
                                                </td>
                                                <td>21/01/2021</td>
                                            </tr>
                                            <tr>
                                                <td style={{float:'left', textAlign:'left'}}>
                                                    <Label>The contract documents has been signed by guest.</Label>
                                                    <br/>
                                                    <Link to="/">View detail</Link>
                                                
                                                </td>
                                                <td>21/01/2021</td>
                                            </tr>      
                                        </tbody>
                                       
                                    </Table>
                                </FormGroup>
                            </Form>
                            <div><Link to="/notification">See more</Link></div>
                        </Col>
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default Dashboard;