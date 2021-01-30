import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table, Form, FormGroup, Input, Row, Col } from "reactstrap";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import Panigation from "../Panigation/Panigation";
import companyListAPI from "../../api/companyListAPI";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import '../../css/CompanyList.css';
import find from '../../images/search.png';

function CompanyList(){
    const [filter, setFilter] = useState(false);
    const toggle = () => setFilter(prevState => ! prevState);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [postList, setPostList] = useState([]);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    }
    useEffect(()=>{
        async function fetListData(){
            try {
                const response = await companyListAPI.getAll();
                setPostList(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListData();
    },[]);
    
    const handleChange = event =>{
        setSearch(event.target.value);
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
                                    <Input type="search" className="form-control rounded" value={search} onChange={handleChange} placeholder="Search by name company"/>
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
                            <th>Edits/Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(data => (
                            <tr key={data.id}>
                                    <th>{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.admin}</td>
                                    <td>{data.dateCreate}</td>
                                    <td>{data.status===1? <p style={{color:'green'}}>Active</p> : <p style={{color:'red'}}>Deactive</p>}</td>
                                    <td>{data.phone}</td>
                                    <td>
                                        <Link to="/edit-company">Edit/Detail</Link>
                                    </td>
                            </tr>))}  
                    </tbody>    
            </Table>
            <div className="pani">
                <Panigation
                    currentPage={currentPage}
                    postsPerPage={postPerPage}
                    totalPosts = {postList.length}
                    paginate={paginate}
                />
            </div>
            </Container>
            </div>
        </div>
    );
}
export default CompanyList;