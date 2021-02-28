import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import '../../css/Stepper.css';
import '../../css/StepDetail.css';
import signerinvoice from '../../images/signinvoice.png';
import showall from '../../images/showall.png';
import completed from '../../images/completeInvoice.png';
import completed1 from '../../images/complete.png';
import logo from '../../images/eoffice.png';
import { useHistory } from 'react-router-dom';

function StepDetail({activeStep}) {
    function getStep(){
        return ['Create Invoice', 'Person sign','Invoice Completed'];
    }
    const steps = getStep();
    const history = useHistory();
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
            <div hidden={activeStep!==3 ? true : false}>
                <img style={{marginTop:'10px'}} src={completed1} alt=""/>
                <img style={{marginTop:'10px'}} src={signerinvoice} alt=""/>
                <img style={{marginTop:'10px'}} src={completed} alt=""/>
                <img style={{marginTop:'10px'}} src={showall} alt=""/>
            </div>
        </div>
    )
}
export default StepDetail;