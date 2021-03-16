import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table, Form, FormGroup, Input, Row, Col} from "reactstrap";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import companyListAPI from "../../api/companyListAPI";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import '../../css/CompanyList.css';
import GetAdminCompany from "../GetAdminCompany/GetAdminCompany";
import Moment from 'moment';

function CompanyList(){
    const [filter, setFilter] = useState(false);
    const toggle = () => setFilter(prevState => ! prevState);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(15);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [postList, setPostList] = useState([]);
    const indexOfLastPost = (page+1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)
    
    function changePage(event, newPage) {
        setPage(newPage);
      }
    useEffect(()=>{
        async function fetListData(){
            try {
                const response = await companyListAPI.getAll();
                setPostList(response.data)
                setData(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListData();
    },[]);
    function Active() {
        setPostList(
            data.filter(data =>{
                if(data.status===1){
                    return data
                }
            })    
        )
    }
    function listDeactive() {
        setPostList(
            data.filter(data =>{
                if(data.status!==1){
                    return data
                }
            })    
        )
    }
    function All(){
        setPostList(data)
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
                                    <Input type="search" className="form-control rounded" value={search} onChange={event => {setSearch(event.target.value)}} placeholder="Search by name company"/>
                                </Col>
                                <Col xs={2}>
                                    <Dropdown isOpen={filter}toggle={toggle}>
                                    <DropdownToggle color="primary" caret>
                                        Filter
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={All}>All</DropdownItem>
                                        <DropdownItem onClick={Active} >Active</DropdownItem>
                                        <DropdownItem onClick={listDeactive}>Deactive</DropdownItem>
                                    </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </FormGroup>
                        
                    </Form>
                </div>
                <div hidden={search !== "" ? true : false}>
              <TablePagination
                component="div"
                count={postList.length}
                page={page}
                onChangePage={changePage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
            </div>
                <Table hidden={search!== '' ? true : false}>
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
                        {currentPosts.map((data, key) => (
                            <tr key={key}>
                                    <th>{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>
                                        <GetAdminCompany id={data.adminId}/>
                                    </td>
                                    <td>{Moment(data.dateCreate).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{data.status===1? <p style={{color:'green'}}>Active</p> : <p style={{color:'red'}}>Deactive</p>}</td>
                                    <td>{data.phone}</td>
                                    <td>
                                        <Link to={{
                                            pathname: '/edit-company',
                                            state: data
                                        }}>Edit/Detail</Link>
                                    </td>
                            </tr>))}  
                    </tbody>    
                </Table>
                <Table hidden={search==='' ? true : false } className="table_css">
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
                        {data.filter((data) =>{
                            if(data.name.toLowerCase().includes(search.toLowerCase())){
                                return data
                            }
                        }).map(data => (
                            <tr key={data.id}>
                                    <th>{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>
                                        <GetAdminCompany id={data.adminId}/>
                                    </td>
                                    <td>{data.dateCreate}</td>
                                    <td>{data.status===1? <p style={{color:'green'}}>Active</p> : <p style={{color:'red'}}>Deactive</p>}</td>
                                    <td>{data.phone}</td>
                                    <td>
                                        <Link to={{
                                            pathname: '/edit-company',
                                            state: data
                                        }}>Edit/Detail</Link>
                                    </td>
                            </tr>))}  
                    </tbody>    
                </Table>
            </Container>
            </div>
        </div>
    );
}
export default CompanyList;