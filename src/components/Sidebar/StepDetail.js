import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import "../../css/Stepper.css";
import "../../css/StepDetail.css";
import signerinvoice from "../../images/signinvoice.png";
import showall from "../../images/showall.png";
import completed from "../../images/completeInvoice.png";
import completed1 from "../../images/complete.png";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import Tooltip from "@material-ui/core/Tooltip";
import invoiceAPI from "../../api/invoiceAPI";
import moment from "moment";
import { Typography } from "@material-ui/core";

function StepDetail({ activeStep }) {
  function getStep() {
    return ["Create Invoice", "Person sign", "Invoice Completed"];
  }
  const [signer, setSigner] = useState([]);
  const steps = getStep();
  const [signerId, setSignerId] = useState();
  const [document, setDocument] = useState([]);
  const param = useParams();
  useEffect(() => {
    async function getInvoiceById() {
      try {
        const res = await invoiceAPI.getInvoiceById(param.id);
        setDocument(res.data);
        setSignerId(res.data.signerId);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoiceById();
  }, [param.id]);
  useEffect(() => {
    async function getSigner() {
      try {
        const res = await userListAPI.getUserById(signerId);
        setSigner(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner();
  }, [signerId]);

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
      <div hidden={activeStep < 3 ? true : false}>
        <img style={{ marginTop: "10px" }} src={completed1} alt="" />
        <Tooltip
          title={
            <Fragment>
              <div>{"Signer name: " + signer.name}</div>
              <div>
                {"Sign " +
                  moment(document.dateSign).format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </Fragment>
          }
          placement="right"
        >
          <img style={{ marginTop: "10px" }} src={signerinvoice} alt="" />
        </Tooltip>
        <Tooltip
          title={
            "Invoice status: Completed  " +
            moment(document.dateSign).format("DD/MM/YYYY HH:mm:ss")
          }
          placement="right"
        >
          <img style={{ marginTop: "10px" }} src={completed} alt="" />
        </Tooltip>
        <Tooltip
          title={
            <Fragment>
              <Typography>Invoice Completed</Typography>

              <div>{"Signer: " + signer.name}</div>

              <p>
                {"Invoice completed: " +
                  moment(document.dateSign).format("DD/MM/YYYY hh:mm:ss")}
              </p>
            </Fragment>
          }
          placement="right"
        >
          <img style={{ marginTop: "10px" }} src={showall} alt="" />
        </Tooltip>
      </div>
      <div className="bot">
        <p>Requirements | Terms of Service</p>
        <p>@2021 EOffice inc.</p>
      </div>
    </div>
  );
}
export default StepDetail;
