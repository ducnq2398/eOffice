import { Container, Form, FormGroup, Label, Row,Col, Table} from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import doneinvoice from '../../images/invoicecompleted.png';
import done from '../../images/true.png';
import invoiceAPI from "../../api/invoiceAPI";
import { getUser } from "../../utils/Common";
import contractAPI from "../../api/contractAPI";
import ScaleLoader from "react-spinners/ScaleLoader";

function Dashboard(){
    const history = useHistory();
    const [listAllInvoice, setListAllInvoice] = useState([]);
    const [listAllContract, setListAllContract] = useState([]);
    const [listContractById, setListContractById] = useState([]);
    const [listInvoiceById, setListInvoiceById] = useState([]);
    const [currentPage] = useState(1);
    const [postPerPage] = useState(5);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPostsContract = [];
    const currentPostsInvoice = [];
    let [loadingInvoice, setLoadingInvoice] = useState(true);
    let [loadingContract, setLoadingContract] = useState(true);

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
        setTimeout(()=>{
            setLoadingContract(false)
        },1000)
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
        setTimeout(()=>{
            setLoadingInvoice(false)
        },1000)
        getAllInvoice();
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
    },[getUser().Id])

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
    },[getUser().Id])

    if(getUser().Role==='1'){
        currentPostsContract.push(listAllContract.slice(indexOfFirstPost, indexOfLastPost));
        currentPostsInvoice.push(listAllInvoice.slice(indexOfFirstPost, indexOfLastPost));
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
                                        {loadingContract ? <ScaleLoader  color={"#2512DF"} loading={loadingContract} size={35} /> :                                       
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
                                                        <td>{data.status<3 ? <img src={notsigned} alt=""/> : <img src={done} alt=""/>}</td>
                                                        <td>{data.dateCreate.substring(10,0)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        }
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
                                        {
                                            loadingInvoice ? <ScaleLoader  color={"#2512DF"} loading={loadingInvoice} size={35} /> : 
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
                                                        <td>{data.status<3 ? <img src={notsigned} alt=""/> : <img src={doneinvoice} alt=""/>}</td>
                                                        <td>{data.dateCreate.substring(10,0)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        }
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