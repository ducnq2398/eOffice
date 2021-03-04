import { BrowserRouter as Router, Redirect, Route , Switch } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminManager from "../AdminManager/AdminManager";
import Login from "../Login/Login";
import CompanyRegister from "../CompanyRegister/CompanyRegister";
import CompanyList from "../CompanyList/CompanyList";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EditCompany from "../EditCompany/EditCompany";
import {getToken, getUser } from "../../utils/Common";
import ResetPassword from "../ForgotPassword/ResetPassword";
import UserManagement from "../AdminCompany/UserManagement/UserManagement";
import CreateContract from "../CreateDocument/CreateContract";
import Dashboard from "../Dashboard/Dashboard";
import Document from "../Document/Document";
import Error from "../Error/Error";
import DepartmentManagerment from "../AdminCompany/DepartmentManagement/DepartmentManagement";
import Notification from "../Notification/Notification";
import CreateInvoice from "../CreateDocument/CreateInvoice";
import InvoiceContent from "../CreateDocument/InvoiceContent";
import Profile from "../Profile/Profile";
import ContractContent from "../CreateDocument/ContractContent";
import InvoiceDetail from "../DetailDocument/InvoiceDetail";
import ContractDetail from "../DetailDocument/ContractDetail";
import { useEffect, useState } from "react";

function RouterURL(){
    const [user, setUser] = useState([]);
    useEffect(()=>{
        function getUser() {
            const user = localStorage.getItem('user');
            if(user){
                setUser(JSON.parse(user))
            }
        }
        getUser();
    },[])
    
    const PrivateRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() && user.Role==='0'
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/error', state:{from: props.location} }}/>}/>
    )

    const AdminRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() && user.Role==='1' 
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/error', state:{from: props.location} }}/>}/>
    )
    const UserRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() && user.Role!=='0'
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/error', state:{from: props.location} }}/>}/>
    )
    return(
        <div>
            <Switch>
                <Route path="/error" component={Error}/>
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={AdminLogin}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/reset-password" component={ResetPassword}/>
                <Route path="/error" component={Error}/>
                <UserRoute path="/contract" component={CreateContract}/>
                <UserRoute path="/invoice" component={CreateInvoice}/>
                <UserRoute path="/dashboard" component={Dashboard}/>
                <UserRoute path="/invoice-confirm" component={InvoiceContent}/>
                <UserRoute path="/contract-confirm" component={ContractContent}/>
                <UserRoute path="/document" component={Document}/>
                <UserRoute path="/detail/invoice/:id/:name" component={InvoiceDetail}/>
                <UserRoute path="/detail/contract/:id/:name" component={ContractDetail}/>
                <UserRoute path="/notification" component={Notification}/>
                <AdminRoute path="/department" component={DepartmentManagerment}/>
                <AdminRoute path="/user-management" component={UserManagement}/>
                <PrivateRoute path="/admin-manager" component={AdminManager}/>
                <PrivateRoute path="/company-register" component={CompanyRegister}/>
                <PrivateRoute path="/company-list" component={CompanyList}/>
                <PrivateRoute path="/edit-company" component={EditCompany}/>
                <UserRoute path="/profile" component={Profile}/>
            </Switch>
        </div>
    );
}
export default RouterURL;