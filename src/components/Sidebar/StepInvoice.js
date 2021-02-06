import Stepper from '@material-ui/core/Stepper';
import '../../css/Stepper.css';
import logo from '../../images/eoffice.png';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
function StepInvoice({activeStep}){
    function getStep(){
        return ['Upload file', 'Title description', 'Select signer', 'Select the expiration date', 'Complete'];
    }
    const steps = getStep();
    return(
        <div className="root">
            <div className="logo">
                <img src={logo} alt="" />
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
export default StepInvoice;