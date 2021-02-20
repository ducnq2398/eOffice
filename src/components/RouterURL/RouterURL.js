import { BrowserRouter as Router,Redirect,Route, Switch } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminManager from "../AdminManager/AdminManager";
import Login from "../Login/Login";
import CompanyRegister from "../CompanyRegister/CompanyRegister";
import CompanyList from "../CompanyList/CompanyList";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EditCompany from "../EditCompany/EditCompany";
import { getToken, getUser } from "../../utils/Common";
import ResetPassword from "../ForgotPassword/ResetPassword";
import UserManagement from "../AdminCompany/UserManagement/UserManagement";
import CreateDocument from "../CreateDocument/CreateDocument";
import Dashboard from "../Dashboard/Dashboard";
import Document from "../Document/Document";
import Error from "../Error/Error";
import DepartmentManagerment from "../AdminCompany/DepartmentManagement/DepartmentManagement";
import Notification from "../Notification/Notification";
import CreateInvoice from "../CreateDocument/CreateInvoice";
import InvoiceContent from "../CreateDocument/InvoiceContent";
import Profile from "../Profile/Profile";
import ContractContent from "../CreateDocument/ContractContent";

function RouterURL(){
    const user = getUser();
    const PrivateRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken()
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/', state:{from: props.location} }}/>}/>
    )

    const AdminRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() && user.roleId===1 
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/', state:{from: props.location} }}/>}/>
    )
    const UserRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() 
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/', state:{from: props.location} }}/>}/>
    )

    return(
        <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={AdminLogin}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/reset-password" component={ResetPassword}/>
                <Route path="/error" component={Error}/>
                <Route path="/contract" component={CreateDocument}/>
                <Route path="/invoice" component={CreateInvoice}/>
                <UserRoute path="/dashboard" component={Dashboard}/>
                <UserRoute path="/invoice-confirm" component={InvoiceContent}/>
                <UserRoute path="/contract-confirm" component={ContractContent}/>
                <UserRoute path="/document" component={Document}/>
                <UserRoute path="/notification" component={Notification}/>
                <Route path="/department" component={DepartmentManagerment}/>
                <Route path="/user-management" component={UserManagement}/>
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