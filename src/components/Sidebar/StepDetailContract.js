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
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userListAPI from '../../api/userListAPI';
import Tooltip from '@material-ui/core/Tooltip';
import { getUser } from '../../utils/Common';
import companyListAPI from '../../api/companyListAPI';

function StepDetailContract({activeStep}) {
    function getStep(){
        return ['Create Contract', 'Person 1 sign','Person 2 sign','Contract Completed'];
    }
    const [signer, setSigner] = useState([]);
    const [company, setCompany] = useState([]);
    const steps = getStep();
    const history = useHistory();
    const location = useLocation();
    useEffect(()=>{
        async function getSigner() {
            try {
                const res = await userListAPI.getUserById(location.state.signerId);
                setSigner(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSigner();
    },[])

    useEffect(()=>{
        async function getCompany() {
            const id = getUser().CompanyId;
            try {
                const res = await companyListAPI.getCompanyById(id);
                setCompany(res.data);
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
                <Tooltip  placement="right">
                    <img style={{marginTop:'10px'}} src={signercontract} alt=""/>
                </Tooltip>
                <Tooltip  placement="right">
                    <img style={{marginTop:'10px'}} src={signercontract} alt=""/>
                </Tooltip> 
                <Tooltip  placement="right">
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