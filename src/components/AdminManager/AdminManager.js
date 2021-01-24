import { Button, Form, FormGroup } from 'reactstrap';
import React from 'react';
import { Link,useHistory} from 'react-router-dom';
import './AdminManager.css';
import logo from './../../images/logo.png';
import { removeUserSession } from '../../utils/Common';
function AdminManager(props){
        const history = useHistory();
        const companyRegister = () => history.push('/company-register'); 
        const companyList = () => history.push('/company-list'); 
        function Logout(e) {
            e.preventDefault();
            removeUserSession();
            props.history.push('/');
        }
        return (
            <div>
                <div>
                    <form className="logout">
                        <Link to='' onClick={Logout}>Logout</Link>
                    </form>
                </div>
                <div>
                    <img src={logo} alt=""/>
                    <h1 style={{color:'blue'}}>ADMINISTRATOR</h1>
                </div>

                <div className="bt">
                    <Form style={{width:'500px', marginRight:'auto', marginLeft:'auto'}}>
                        <FormGroup>
                            <Button style={{padding:'15px 10px 15px'}} color="primary" size="lg" block onClick={companyRegister}>Company Register</Button>
                        </FormGroup>
                        <FormGroup>
                            <Button style={{padding:'15px 10px 15px'}} color="primary" size="lg" block onClick={companyList}>Company List</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>    
        );
    }

export default AdminManager;