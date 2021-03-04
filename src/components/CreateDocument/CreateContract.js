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
import {Multiselect} from 'multiselect-react-dropdown';
import next from '../../images/next.png';
import back from '../../images/back.png';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'groove',
    borderWidth: 2,
    borderRadius: 5,
    height: '50px',
    width: '80%',
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
    const [dataUpload, setDataUpload] =useState({
        title : '',
        signer: '',
        company_guest: '',
        signer_guest: '',
        date: '',
    });
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })
    const [cursor, setCursor] = useState({
        x: 0,
        y: 0
    })
    const [viewer, setViewer] = useState([]);
    const [viewerGuest, setViewerGuest] = useState([]);
    function onSelect(data) {       
        setViewer(data)
    }
    function onRemove(data) {  
        setViewer(data)
    }
    function onSelect1(data) {       
        setViewerGuest(data)
    }
    function onRemove1(data) {  
        setViewerGuest(data)
    }
    const [numPages, setNumPages] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    
    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
        setPageNumber(1);
        
    }

    function changPage(offset){
        setPageNumber(prev => prev +offset);
    }
    function previousPage() {
        changPage(-1);
    }
    
    function nextPage() {
        changPage(1);
    }
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
            const companyId = getUser().CompanyId;
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
        const list = [];
        list.push(dataUpload.signer);
        list.push(dataUpload.signer_guest);
        const listViewerId = [];
        viewer.map(view=>{
            listViewerId.push(view.id);
        })
        viewerGuest.map(view=>{
            listViewerId.push(view.id);
            viewer.push(view);
        })
        history.push({
            pathname: '/contract-confirm',
            state: {
                file: file,
                data: dataUpload,
                viewer: viewer,
                listSignId: list,
                listViewerId: listViewerId,
                signLocation : position,
                numberPage: numPages
            }
        })
    }
    function getLocation(e) {
        setPosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY 
        })
    }
    useEffect(() => {addEventListeners();
        return () => removeEventListeners();
    },[]);
        
    const addEventListeners = () => {
        document.addEventListener("mousemove", onMouseMove);
    };
    
    const removeEventListeners = () => {
        document.removeEventListener("mousemove", onMouseMove);
    };   
    const onMouseMove = (e) => {
        setCursor({x: e.clientX, y: e.clientY})
    };
    
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
                                    <Input style={{textAlign:'center', width:'80%', marginLeft:'auto',marginRight:'auto'}} disabled={true} type="text" defaultValue="Contract"/>
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
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please input title of contract</Label>
                                    <Input style={{width:'80%', marginLeft:'auto', marginRight:'auto'}} type="text" name="title" placeholder="Title" required onChange={handleOnChange}/>
                                </div>
                                <div hidden={activeStep===2 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please select signer to sign the contract</Label>
                                    <Input style={{width:'80%', marginLeft:'auto', marginRight:'auto'}} type="select" name="signer" onChange={handleOnChange} required>
                                        <option value="">Select signer</option>
                                        {listSinger.map(signer =>(
                                            <option key={signer.id} value={signer.id}>{signer.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===3 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please select company guest</Label>
                                    <Input style={{width:'80%', marginLeft:'auto', marginRight:'auto'}} type="select" name="company_guest" onChange={handleOnChange} required>
                                        <option value="">Select company guest</option>
                                            {listCompany.map(company =>(
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===4 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please select a guest to sign the contract</Label>
                                    <Input style={{width:'80%', marginLeft:'auto', marginRight:'auto'}} type="select" name="signer_guest" onChange={handleOnChange} required>
                                        <option value="">Select signer guest</option>
                                            {listGuest.map(guest =>(
                                                <option key={guest.id} value={guest.id}>{guest.name}</option>
                                        ))}
                                    </Input>
                                </div>
                                <div hidden={activeStep===5 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please select viewer can view the contract</Label>
                                    <Multiselect options={listSinger} displayValue="name" onSelect={onSelect} onRemove={onRemove} placeholder="Select viewer company" />
                                    <div style={{marginTop:'20px'}}>
                                        <Multiselect options={listGuest} displayValue="name" onSelect={onSelect1} onRemove={onRemove1} placeholder="Select viewer guest" />
                                    </div>
                                </div>
                                <div hidden={activeStep===6 ? false : true} style={{marginTop:'30%'}}>
                                    <Label style={{fontSize:'25px', color:'blue'}}>Please select the contract expiration date</Label>
                                    <Input style={{width:'80%', marginLeft:'auto', marginRight:'auto'}} type="date" name="date" placeholder="Expiration date" onChange={handleOnChange} required/>
                                </div>
                                
                                <div style={{marginTop:'20px'}}>
                                    <Button hidden={activeStep===0 ? true : false} color="primary" onClick={handlePrev}>Return</Button> {' '}
                                    <Button hidden={activeStep===6 ? true : false} style={{width:'72px'}} color="primary" onClick={handleNext}>Next</Button>
                                    <Button hidden={activeStep===6 ? false : true}style={{width:'72px'}} color="primary" onClick={handleContent}>Next</Button>
                                </div>
                        </Col>
                    <Col>
                        <Form className="form-doc">
                            <FormGroup row>
                                <div hidden={show} style={{marginTop:'4rem'}}>
                                    <img src={demo} alt="demo" width="600" height="600"/>
                                </div>
                                <div id="pdf">
                                    {file.map(url =>(
                                        <div key={url.name}>
                                            {/* <PDF pdf={url.preview}/> */}
                                            {/* <iframe  src={url.preview} type="application/pdf"/> */}
                                            <div>
                                                    <Document 
                                                        file={url.preview}
                                                        onLoadSuccess={onDocumentLoadSuccess}
                                                        onClick={getLocation}
                                                    >
                                                    <Page pageNumber={pageNumber} />
                                                    </Document>
                                                    <div>
                                                        <p hidden={pageNumber===0} style={{fontWeight:'bold', marginBottom:'0rem'}}>
                                                            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                                                        </p>
                                                        <Button hidden={pageNumber===0} type="button" color="link"  disabled={pageNumber <= 1} onClick={previousPage}>
                                                            <img src={back} alt="back" width="15px" height="15px"/>
                                                        </Button> {' '}
                                                        <Button
                                                            hidden={pageNumber===0}
                                                            type="button" color="link"
                                                            disabled={pageNumber >= numPages}
                                                            onClick={nextPage}
                                                            >
                                                            <img src={next} width="15px" height="15px" alt="next"/>
                                                        </Button>
                                                    </div>
                                                    <div className="cursor" style={{
                                                        left: `${cursor.x}px`,
                                                        top: `${cursor.y}px`
                                                    }}/>
                                            </div>
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