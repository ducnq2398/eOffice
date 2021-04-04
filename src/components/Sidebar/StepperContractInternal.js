import Stepper from "@material-ui/core/Stepper";
import "../../css/Stepper.css";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
function StepperContractInternal({ activeStep }) {
  function getStep() {
    return [
      "Upload file",
      "Title description",
      "Select signer 1",
      "Select signer 2",
      "Select viewer",
      "Select the expiration date",
      "Complete",
    ];
  }
  const steps = getStep();
  return (
    <div className="root">
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{ textAlign: "left" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="bot">
        <p>Requirements | Terms of Service</p>
        <p>@2021 EOffice inc.</p>
      </div>
    </div>
  );
}
export default StepperContractInternal;
