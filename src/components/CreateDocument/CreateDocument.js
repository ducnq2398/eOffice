import { Button, Container, Input, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import { useState ,useEffect, useMemo} from "react";
import '../../css/CreateDoc.css';
import up from '../../images/upload.png';
import {useDropzone} from 'react-dropzone';
import VerticalLinearStepper from "../Sidebar/Stepper";
import {useHistory } from "react-router-dom";
import companyListAPI from "../../api/companyListAPI";
import userListAPI from "../../api/userListAPI";
import { getUser } from "../../utils/Common";
import demo from '../../images/demo.png';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'groove',
    borderWidth: 2,
    borderRadius: 5,
    height: '50px',
    width: '50%',
    marginLeft:'auto',
    marginRight:'auto',
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
function CreateDocument(){
    
    const [listCompany, setListCompany] = useState([]);
    const [listSinger, setListSigner] = useState([]);
    const [listGuest, setListGuest] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState([]);
    const [signer, setSigner] = useState();
    const [dataUpload, setDataUpload] =useState({
        title : '',
        signer: '',
        company_guest: '',
        signer_guest: '',
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
            [name]:value,
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

    useEffect(()=>{
        async function fetListData(){
            try {
                const response = await companyListAPI.getAll();
                setListCompany(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListData();
    },[]);
    
    useEffect(()=>{
        async function fetListUser(){
            const companyId = getUser().companyId;
            try {
                const response = await userListAPI.getUserByCompanyId(companyId);
                setListSigner(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListUser();
    },[]);
    useEffect(()=>{
        async function fetListGuest(){
            const id = dataUpload.company_guest;
            try {
                const response = await userListAPI.getUserByCompanyId(id);
                setListGuest(response.data)
            } catch (error) {  
                console.log(error)
            }
        }
        fetListGuest();
    },[dataUpload.company_guest]);

    function handleContent() {
        history.push({
            pathname: '/contract-confirm',
            state: {
                file: file.map(url=>(
                    url.preview
                )),
                data: dataUpload,
                signer: signer
            }
        })
    }
    return(
        <div>
            <VerticalLinearStepper activeStep={activeStep} />
            <div className="main-panel">
            <Header/>
            <Container fluid={true}>
                <Row>
                    <Col className="form-upload">
                                <div hidden={activeStep===0 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'30px', fontWeight:'bold', color:'blue'}}>Document information input</Label>
                                    <br/>
                                    <Label>Type Document</Label>
                                    <br/>
                                    <Input style={{textAlign:'center', width:'50%', marginLeft:'auto',marginRight:'auto'}} disabled={true} type="text" defaultValue="Contract"/>
                                    <br/>
                                    <Label>Choose file</Label>
                                    <div {... getRootProps({style})}>
                                        <input {... getInputProps()}/>
                                        <div>
                                            <img style={{float:'left', marginTop:'7px'}} src={up} alt=""/>
                                            {file.map(url =>(
                                                <div key={url.name}>
                                                    <p>{url.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div> 
                                </div>
                                <div hidden={activeStep===1 ? false : true} style={{marginTop:'30%'}}>
                                    <Label>Title Document</Label>
                                    <Input style={{width:'50%', marginLeft:'auto', marginRight:'auto'}} type="text" name="title" placeholder="Title" required onChange={handleOnChange}/>
                                </div>
                                <div hidden={activeStep===2 ? false : true} style={{marginTop:'30%'}}>
                                    <Label>Select Signer</Label>
                                    <Input style={{width:'50%', marginLeft:'auto', marginRight:'auto'}} type="select" name="signer" onChange={handleOnChange} required>
                                        <option value="">Select signer</option>
                                        {listSinger.map(signer =>(
                                            <option key={signer.id} value={signer.id}>{signer.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===3 ? false : true} style={{marginTop:'30%'}}>
                                    <Label>Select Company Guest</Label>
                                    <Input style={{width:'50%', marginLeft:'auto', marginRight:'auto'}} type="select" name="signer" onChange={handleOnChange} required>
                                        <option value="">Select company guest</option>
                                            {listCompany.map(company =>(
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===4 ? false : true} style={{marginTop:'30%'}}>
                                    <Label>Select Signer Guest</Label>
                                    <Input style={{width:'50%', marginLeft:'auto', marginRight:'auto'}} type="select" name="signer" onChange={handleOnChange} required>
                                        <option value="">Select signer guest</option>
                                            {listGuest.map(guest =>(
                                                <option key={guest.id} value={guest.id}>{guest.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===5 ? false : true} style={{marginTop:'30%'}}>
                                    <Label>Expiration Date</Label>
                                    <Input style={{width:'50%', marginLeft:'auto', marginRight:'auto'}} type="date" name="date" placeholder="Expiration date" onChange={handleOnChange} required/>
                                </div>
                                
                                <div style={{marginTop:'20px'}}>
                                    <Button hidden={activeStep===0 ? true : false} color="primary" onClick={handlePrev}>Return</Button> {' '}
                                    <Button hidden={activeStep===5 ? true : false} style={{width:'72px'}} color="primary" onClick={handleNext}>Next</Button>
                                    <Button hidden={activeStep===5 ? false : true}style={{width:'72px'}} color="primary" onClick={handleContent}>Next</Button>
                                </div>
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
export default CreateDocument;