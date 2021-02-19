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
                <Route path="/create" component={CreateDocument}/>
                <Route path="/invoice" component={CreateInvoice}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/invoice-confirm" component={InvoiceContent}/>
                <Route path="/document" component={Document}/>
                <Route path="/notification" component={Notification}/>
                <Route path="/department" component={DepartmentManagerment}/>
                <Route path="/user-management" component={UserManagement}/>
                <Route path="/admin-manager" component={AdminManager}/>
                <Route path="/company-register" component={CompanyRegister}/>
                <Route path="/company-list" component={CompanyList}/>
                <Route path="/edit-company" component={EditCompany}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/error" component={Error}/>
            </Switch>
        </div>
    );
}
export default RouterURL;