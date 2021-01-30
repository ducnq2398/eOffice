import React from 'react';
import './../../css/AdminManager.css';
import banner from '../../images/banner.png';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
function AdminManager(){
        return (
            <div>
                <SidebarAdmin/>
                <div className="main-panel">
                    <div className="main-wrapper">
                        <img className="img" src={banner} alt=""/>
                    </div>
                </div>   
            </div>    
        );
    }

export default AdminManager;