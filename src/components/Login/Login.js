import './Login.css';
import logo from './../../images/logo.png';
import {Link} from 'react-router-dom';

function Login(){
    return(
        <div>
            <div className="logo">
                <img src={logo} alt=""/>
            </div>
            <div className="login">
                <form method="post">
                    <input type="email" placeholder="Enter email" required="required"/>
                    <input type="password" placeholder="Enter password" required="required"/>
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Sign In</button>
                </form>
            </div>               
        </div>
    );
}
export default Login;