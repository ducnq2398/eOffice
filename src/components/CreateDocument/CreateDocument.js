import { Button, Container, Input } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import { useState } from "react";
import '../../css/CreateDoc.css'
import VerticalLinearStepper from "../Sidebar/Stepper";
import { Link, useHistory } from "react-router-dom";

function CreateDocument(){
    const [url, setUrl] = useState('');
    const [filename, setFileName] = useState('');
    const history = useHistory();
    function onChange(e){
        const file = e.target.files;
        setFileName(file);
        setUrl(URL.createObjectURL(file[0]));
        
    };
    function handleClick(){
        history.push('/document-title');
        localStorage.setItem('pdf', url);
        localStorage.setItem('filename', filename);
    }
    return(
        <div>
            <VerticalLinearStepper activeStep={0} />
            <div className="main-panel">
                <Container fluid={true}>
                    <Header/>
                    <Input style={{width:'50%', marginTop:'20px', marginLeft:'auto', marginRight:'auto'}} type="file" accept=".pdf" onChange={onChange} />
                    <div>
                        <PDF pdf={url}/>
                    </div>
                </Container>
                <Button style={{marginTop:'10px'}} color="primary" onClick={handleClick}>CONTINUE</Button> 
            </div>
        </div>
    );
}
export default CreateDocument;