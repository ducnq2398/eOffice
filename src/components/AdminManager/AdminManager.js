import React from 'react';
import './../../css/AdminManager.css';
import banner from '../../images/banner.png';
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin';
function AdminManager(){
        return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                  <img className="img" src={banner} alt=""/>
                </div>   
            </div>    
        );
    }

export default AdminManager;