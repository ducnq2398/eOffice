import { Container, Input } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import '../../css/CreateDoc.css'

function CreateDocument(){
    const [url, setUrl] = useState('');
    function onChange(e){
        const file = e.target.files;
        const reader = new FileReader()
        reader.readAsDataURL(file[0]);
        reader.onload = (e) =>{
            console.log("data", e.target.result)
        }
        setUrl(URL.createObjectURL(file[0]));
    };
    console.log(url)
    return(
        <div>
            <Sidebar/>
            <div className="main-panel">
                <Container fluid={true}>
                    <Header/>
                    <Input style={{width:'50%', marginTop:'20px', marginLeft:'auto', marginRight:'auto'}} type="file" accept=".pdf" onChange={onChange} />
                    <div>
                        <PDF pdf={url}/>
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default CreateDocument;