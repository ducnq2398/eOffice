import Stepper from '@material-ui/core/Stepper';
import '../../css/Stepper.css';
import logo from '../../images/eoffice.png';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useHistory } from 'react-router-dom';
function VerticalLinearStepper({activeStep}){
    const history = useHistory();
    function getStep(){
        return ['Upload file', 'Title description', 'Select signer', 'Select company guest','Select guest and viewer', 'Select the expiration date', 'Complete'];
    }
    const steps = getStep();
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
    );
}
export default VerticalLinearStepper;