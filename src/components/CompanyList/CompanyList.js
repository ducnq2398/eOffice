import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Table } from "reactstrap";
import './CompanyList.css';
import logo from './../../images/logo.png';
import {useHistory} from 'react-router-dom';
import { useEffect, useState } from "react";
import Panigations from "../Panigation/Panigation";
import PostList from "../PostList/PostList";
import companyListAPI from "../../api/companyListAPI";


function CompanyList(){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
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
                const parmas = {
                    page : 1,
                };
                const response = await companyListAPI.getAll(parmas);
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
            <Container>
                <div>
                    <img src={logo} alt="" onClick={home}/>
                </div>
                <div className="banner">
                    Company List
                </div>
                <div className="search_form">
                    <span>
                        <input type="search" className="form-control rounded" placeholder="Search by name company" value={searchTerm} onChange={handleChange}/>
                        <Dropdown isOpen={filter}toggle={toggle}>
                            <DropdownToggle caret>
                                Filter
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Active</DropdownItem>
                                <DropdownItem>Deactive</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                </div>
            </Container>
            <PostList posts={postList}/>
            <Panigations
                panigation={panigation}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
export default CompanyList;