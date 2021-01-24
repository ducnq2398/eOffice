import { BrowserRouter as Router,Redirect,Route } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminManager from "../AdminManager/AdminManager";
import Login from "../Login/Login";
import CompanyRegister from "../CompanyRegister/CompanyRegister";
import CompanyList from "../CompanyList/CompanyList";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EditCompany from "../EditCompany/EditCompany";
import { getToken } from "../../utils/Common";

function RouterURL(){
    const PrivateRoute = ({ component: Component, ...rest}) =>(
        <Route {...rest} render={(props) => 
            getToken() 
            ? <Component {... props}/> 
            : <Redirect to={{pathname: '/', state:{from: props.location} }}/>}/>
    )

    return(
        <Router>
            <Route exact path="/" component={Login}/>
            <Route path="/admin" component={AdminLogin}/>
            <PrivateRoute path="/admin-manager" component={AdminManager}/>
            <PrivateRoute path="/company-register" component={CompanyRegister}/>
            <PrivateRoute path="/company-list" component={CompanyList}/>
            <PrivateRoute path="/forgot-password" component={ForgotPassword}/>
            <PrivateRoute path="/edit-company" component={EditCompany}/>
        </Router>
    );
}
export default RouterURL;