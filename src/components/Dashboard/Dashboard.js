import { Container, Form, FormGroup, Label, Row,Col, Table, Tooltip } from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import done from '../../images/true.png';
import invoiceAPI from "../../api/invoiceAPI";

function Dashboard(){
    const history = useHistory();
    const [postList, setPostList] = useState([]);
    const [listInvoice, setListInvoice] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = listInvoice.slice(indexOfFirstPost, indexOfLastPost);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const [tooltipOpen1, setTooltipOpen1] = useState(false);
    const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
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
                                        <tbody>
                                                {currentPosts.map(data =>(
                                                    <tr key={data.id} onClick={()=> history.push({
                                                        pathname: '/detail/' + data.id + '/' + data.description,
                                                        state: data
                                                    })}>
                                                        <td>
                                                            <p className="demo-2" id="TooltipExample1">{data.description}</p>
                                                            <Tooltip placement="right" isOpen={tooltipOpen1} target="TooltipExample1" toggle={toggle1}>
                                                                {data.description}
                                                            </Tooltip>
                                                        </td>
                                                        <td>{data.status!==3 ? <img src={notsigned} alt=""/> : <img src={done} alt="" width="40px" height="30px"/>}</td>
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
                                            <tbody>
                                                {currentPosts.map(data =>(
                                                    <tr key={data.id} onClick={()=> history.push({
                                                        pathname: '/detail/' + data.id + '/' + data.description,
                                                        state: data
                                                    })}>
                                                        <td>
                                                            <p className="demo-2" id="TooltipExample">{data.description}</p>
                                                            <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                                                                {data.description}
                                                            </Tooltip>
                                                        </td>
                                                        <td>{data.status!==3 ? <img src={notsigned} alt=""/> : <img src={done} alt="" width="40px" height="30px"/>}</td>
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