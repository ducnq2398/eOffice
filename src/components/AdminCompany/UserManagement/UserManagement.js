import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";
import './../../../css/UserManagement.css';

function UserManagement(){
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
            </div>
        </div>
    );
}

export default UserManagement;