import { Button, Container, Input, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import StepInvoice from "../Sidebar/StepInvoice";
import PDF from "../PDF/PDF";
import { useState ,useEffect, useMemo} from "react";
import '../../css/CreateDoc.css';
import up from '../../images/upload.png';
import {useHistory } from "react-router-dom";
import {useDropzone} from 'react-dropzone';
import { getUser } from "../../utils/Common";
import demo from '../../images/demo.png';
import userListAPI from "../../api/userListAPI";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'groove',
    borderWidth: 2,
    borderRadius: 5,
    height: '50px',
    backgroundColor: '#000000f',
    color: 'black',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
function CreateInvoice() {
    const [listSinger, setListSigner] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState([]);
    const [signer, setSigner] = useState();
    const [dataUpload, setDataUpload] =useState({
        title : '',
        signer: '',
        date: '',
    });
    const {getRootProps, getInputProps,isDragActive,
        isDragAccept,
        isDragReject} = useDropzone({
        accept:'.pdf',
        onDrop: (acceptFile) =>{
            setFile(
                acceptFile.map((url) => Object.assign(url,{
                    preview: URL.createObjectURL(url)
                }))
            )
            setActiveStep(1)
            setShow(true)
        }
    })
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
    function handleOnChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setDataUpload({
            ...dataUpload,
            [name] : value,
        })
    }
    function handleNext(){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    function handlePrev() {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if(activeStep===0){
            history.push('/dashboard');
        }
    }
    useEffect(() =>{
        async function fetchSigner() {
            try {
                const response = await userListAPI.getUserById(dataUpload.signer);
                setSigner(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSigner();
    },[dataUpload.signer])
    function handleContent() {
        history.push({
            pathname: '/invoice-confirm',
            state: {
                file: file.map(url=>(
                    url.preview
                )),
                data: dataUpload,
                signer: signer
            }
        })
    }
    console.log(signer)
    useEffect(()=>{
        const companyId = getUser().companyId;
        async function fetListUser(){
            try {
                const response = await userListAPI.getUserByCompanyId(companyId);
                setListSigner(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListUser();
    },[]);
    return(
        <div>
            <StepInvoice activeStep={activeStep}/>
            <div className="main-panel">
                <Header/>
                <Container fluid={true}>
                    <Row>
                        <Col>
                            <Form className="form-upload">
                                <FormGroup>
                                    <Label>Document information input</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" disabled defaultValue="Invoice"/>
                                </FormGroup>
                                <FormGroup>
                                    <div {... getRootProps({style})}>
                                        <input {... getInputProps()}/>
                                        <div>
                                            <img style={{float:'left'}} src={up} alt=""/>
                                            {file.map(url =>(
                                                <div key={url.name}>
                                                    <p>{url.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Input disabled={activeStep===1 ? false : true} type="text" name="title" placeholder="Title" required onChange={handleOnChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Input disabled={activeStep===2 ? false : true} type="select" name="signer" onChange={handleOnChange}>
                                        <option value="">Select signer</option>
                                        {listSinger.map(signer =>(
                                            <option key={signer.id} value={signer.id}>{signer.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input disabled={activeStep===3 ? false : true} type="date" name="date" placeholder="Expiration date" onChange={handleOnChange}/>
                                </FormGroup>
                                <FormGroup hidden={activeStep !==4 ? false : true}>
                                    <Button color="primary" outline onClick={handlePrev}>Return</Button> {' '}
                                    <Button color="primary" outline onClick={handleNext}>Next</Button>
                                </FormGroup>
                                <FormGroup hidden={activeStep===4 ? false : true}>
                                    <Button color="primary">Cancel</Button> {' '}
                                    <Button color="primary" onClick={handleContent}>Next</Button> 
                                </FormGroup>
                            </Form>
                                
                        </Col>
                        <Col>
                            <Form className="form-doc">
                                <FormGroup row>
                                    <div hidden={show} style={{marginTop:'4rem'}}>
                                        <img src={demo} alt="demo" width="600" height="600"/>
                                    </div>
                                    <div>
                                        {file.map(url =>(
                                            <div key={url.name}>
                                                <PDF pdf={url.preview}/>
                                            </div>
                                        ))}
                                    </div>
                                </FormGroup>
                            </Form>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
export default CreateInvoice;