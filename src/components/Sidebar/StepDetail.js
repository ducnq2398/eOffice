import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import '../../css/Stepper.css';
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
        </div>
    )
}
export default StepDetail;