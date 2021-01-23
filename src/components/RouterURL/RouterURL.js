import { BrowserRouter as Router,Route } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminManager from "../AdminManager/AdminManager";
import Login from "../Login/Login";
import CompanyRegister from "../CompanyRegister/CompanyRegister";
import CompanyList from "../CompanyList/CompanyList";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import EditCompany from "../EditCompany/EditCompany";

function RouterURL(){
    return(
        <Router>
            <Route exact path="/" component={Login}/>
            <Route path="/admin" component={AdminLogin}/>
            <Route path="/admin-manager" component={AdminManager}/>
            <Route path="/company-register" component={CompanyRegister}/>
            <Route path="/company-list" component={CompanyList}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/edit-company" component={EditCompany}/>
        </Router>
    );
}
export default RouterURL;