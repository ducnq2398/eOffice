import { Container } from "reactstrap";
import '../../css/Error.css'

function Error(){
    return(
        <div className="main-error">
            <Container fluid={true}>
                <div id="notfound">
                    <div className="notfound">
                    <div className="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>5</span><span>0</span><span>0</span></h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    </div>
                </div> 
            </Container>
        </div>
        
    )
}
export default Error;