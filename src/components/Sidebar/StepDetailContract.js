import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import '../../css/Stepper.css';
import '../../css/StepDetail.css';
import signercontract from '../../images/sign1contract.png';
import showall from '../../images/showall.png';
import completed from '../../images/completeInvoice.png';
import completed1 from '../../images/complete.png';
import logo from '../../images/eoffice.png';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userListAPI from '../../api/userListAPI';
import Tooltip from '@material-ui/core/Tooltip';
import { getUser } from '../../utils/Common';
import companyListAPI from '../../api/companyListAPI';
import contractAPI from '../../api/contractAPI';
import moment from 'moment';

function StepDetailContract({activeStep}) {
    function getStep(){
        return ['Create contract', 'Person 1 sign','Person 2 sign','Contract completed'];
    }
    const [signerA, setSignerA] = useState([]);
    const [signerB, setSignerB] = useState([]);
    const [companyA, setCompanyA] = useState([]);
    const [companyB, setCompanyB] = useState([]);
    const [document, setDocument] = useState([]);
    const steps = getStep();
    const history = useHistory();
    const param = useParams();
    useEffect(()=>{
        async function getDocument(){
            try {
                const res = await contractAPI.getContractById(param.id);
                setDocument(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getDocument();
    },[]);
    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(document.contractSigners[0].signerId);
                setSignerA(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[])

    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(document.contractSigners[1].signerId);
                setSignerB(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[])

    useEffect(()=>{
        async function getCompany() {
            try {
                const res = await companyListAPI.getCompanyById(signerA.companyId);
                setCompanyA(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany();
    },[])
    useEffect(()=>{
        async function getCompany() {
            try {
                const res = await companyListAPI.getCompanyById(signerB.companyId);
                setCompanyB(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany();
    },[])
    return(
        <div className="root">
            <div className="logo">
                <img src={logo} alt="" onClick={()=> history.push('/dashboard')} />
            </div>
            <Stepper activeStep={activeStep} orientation="vertical" style={{textAlign:'left'}}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div hidden={activeStep<3 ? true : false}>
                <img style={{marginTop:'10px'}} src={completed1} alt=""/>
                <Tooltip  placement="right" title={'Company name:'+ companyA.name + 'Signer '+ signerA.name}>
                    <img style={{marginTop:'10px'}} src={signercontract} alt=""/>
                </Tooltip>
                <Tooltip  placement="right" title={'Company name:'+ companyB.name + 'Signer '+ signerB.name}>
                    <img style={{marginTop:'10px'}} src={signercontract} alt=""/>
                </Tooltip> 
                <Tooltip  placement="right" title={'Contract completed:' + moment(document.dateSign).format('DD/MM/YYYY hh:mm:ss')}>
                    <img style={{marginTop:'10px'}} src={completed} alt=""/>
                </Tooltip>
                <img style={{marginTop:'10px'}} src={showall} alt=""/>
            </div>
            <div className="bot">
                <p>Requirements | Terms of Service</p>
                <p>@2021 EOffice inc.</p>
            </div>
        </div>
    )
}
export default StepDetailContract;