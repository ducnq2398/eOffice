import Stepper from '@material-ui/core/Stepper';
import '../../css/Stepper.css';
import logo from '../../images/eoffice.png';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
function VerticalLinearStepper({activeStep}){
    function getStep(){
        return ['Document information input', 'Signature setting', 'Enter the destination', 'Document preparation','Determine'];
    }
    const steps = getStep();
    return(
        <div className="root">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <Stepper activeStep={activeStep} orientation="vertical">
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