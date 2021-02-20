import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
function StepDoc({activeStep}){
    function getStep(){
        return ['Send', 'Signer Signed', 'Guest Signed'];
    }
    const steps = getStep();
    return(
        <div>
            <Stepper activeStep={activeStep} style={{textAlign:'left'}} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </div>
    );
}
export default StepDoc;