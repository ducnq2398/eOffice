import { Container } from "reactstrap";
import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";

function DepartmentManagerment() {
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>

                </Container>
            </div>
        </div>
    )
}
export default DepartmentManagerment;