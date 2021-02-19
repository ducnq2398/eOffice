import { Container, Form, FormGroup, Label, Row,Col, Table } from "reactstrap";
import Header from "../Nav/Header";
import '../../css/Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";


function Dashboard(){
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
                                                <tr>
                                                    <td>Document_01</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
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
                                                <tr>
                                                    <td>Document_01</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
                                                <tr>
                                                    <td>Document_02</td>
                                                    <td>Not signed yet</td>
                                                    <td>21/01/2021</td>
                                                </tr>
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
                        </Col>
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default Dashboard;