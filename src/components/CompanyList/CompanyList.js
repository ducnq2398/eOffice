import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table, Form, FormGroup, Input, Row, Col } from "reactstrap";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import Panigations from "../Panigation/Panigation";
import companyListAPI from "../../api/companyListAPI";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import '../../css/CompanyList.css';

function CompanyList(){
    const [filter, setFilter] = useState(false);
    const toggle = () => setFilter(prevState => ! prevState);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [panigation, setPanigation] = useState({
        page:1,
        limit: 5,
        totalRows: 6,
    });

    const [postList, setPostList] = useState([]);
    useEffect(()=>{
        async function fetchPostList(){
            try {
                const response = await companyListAPI.getAll();
                console.log('heloo', response.data);
                setPostList(response.data); 
            } catch (error) {
                console.log(error);
            }
        }
        fetchPostList();
    },[filter])

    const handleChange = event =>{
        setSearchTerm(event.target.value);
    }

    function handlePageChange(newPage){
        console.log(newPage);
    }


    return(
        <div>
            <SidebarAdmin/>
            <div className="main-panel">
            <Container fluid={true}>
                <div className="search_form">
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col xs={10}>
                                    <Input type="search" className="form-control rounded" placeholder="Search by name company" value={searchTerm} onChange={handleChange}/>
                                </Col>
                                <Col xs={2}>
                                    <Dropdown isOpen={filter}toggle={toggle}>
                                    <DropdownToggle caret>
                                        Filter
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Active</DropdownItem>
                                        <DropdownItem>Deactive</DropdownItem>
                                    </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </FormGroup>
                        
                    </Form>
                </div>
                <Table className="table_css">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Company Name</th>
                            <th>Aplicant Name</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Edits/Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList.map(data => (
                            <tr key={data.id}>
                                    <th>{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.admin}</td>
                                    <td>{data.dateCreate}</td>
                                    <td>{data.status===1? 'Active' : 'Deactive'}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.address}</td>
                                    <td>
                                        <Link to="/edit-company">Edit/Detail</Link>
                                    </td>
                            </tr>))}  
                    </tbody>    
            </Table>
            <Panigations
                panigation={panigation}
                onPageChange={handlePageChange}
            />
            </Container>
            </div>
        </div>
    );
}
export default CompanyList;