import { Button, Form, FormGroup } from 'reactstrap';
import React from 'react';
import { Link,useHistory} from 'react-router-dom';
import './AdminManager.css';
import { getUser} from '../../utils/Common';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
function AdminManager(){
        const user = getUser();
        return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                  <h1 style={{color:'blue'}}>Hello {user.name}</h1>
                </div>   
            </div>    
        );
    }

export default AdminManager;