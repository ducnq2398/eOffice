import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import "../../css/Stepper.css";
import "../../css/StepDetail.css";
import signercontract from "../../images/sign1contract.png";
import showall from "../../images/showall.png";
import completed from "../../images/completeContract.png";
import completed1 from "../../images/complete.png";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import userListAPI from "../../api/userListAPI";
import Tooltip from "@material-ui/core/Tooltip";
import companyListAPI from "../../api/companyListAPI";
import contractAPI from "../../api/contractAPI";
import moment from "moment";
import { Typography } from "@material-ui/core";

function StepDetailContract({ activeStep }) {
  function getStep() {
    return [
      "Create contract",
      "Person 1 sign",
      "Person 2 sign",
      "Contract completed",
    ];
  }
  const [signerA, setSignerA] = useState([]);
  const [signerB, setSignerB] = useState([]);
  const [companyA, setCompanyA] = useState([]);
  const [companyB, setCompanyB] = useState([]);
  const [document, setDocument] = useState([]);
  const steps = getStep();
  const param = useParams();
  useEffect(() => {
    async function getDocument() {
      try {
        const res = await contractAPI.getContractById(param.id);
        setDocument(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDocument();
  }, [param.id]);
  useEffect(() => {
    async function getSigner() {
      try {
        const res = await userListAPI.getUserById(
          document.contractSigners[0].signerId
        );
        setSignerA(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner();
  }, [document.contractSigners]);

  useEffect(() => {
    async function getSigner() {
      try {
        const res = await userListAPI.getUserById(
          document.contractSigners[1].signerId
        );
        setSignerB(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner();
  }, [document.contractSigners]);

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await companyListAPI.getCompanyById(signerA.companyId);
        setCompanyA(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany();
  }, [signerA.companyId]);
  useEffect(() => {
    async function getCompany() {
      try {
        const res = await companyListAPI.getCompanyById(signerB.companyId);
        setCompanyB(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany();
  }, [signerB.companyId]);
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
          placement="right"
          title={
            <Fragment>
              <a>{"Company name:" + companyA.name}</a>
              <br />
              <a>{"Signer: " + signerA.name}</a>
            </Fragment>
          }
        >
          <img style={{ marginTop: "10px" }} src={signercontract} alt="" />
        </Tooltip>
        <Tooltip
          placement="right"
          title={
            <Fragment>
              <a>{"Company name:" + companyB.name}</a>
              <br />
              <a>{"Signer: " + signerB.name}</a>
            </Fragment>
          }
        >
          <img style={{ marginTop: "10px" }} src={signercontract} alt="" />
        </Tooltip>
        <Tooltip
          placement="right"
          title={
            "Contract completed: " +
            moment(document.dateSign).format("DD/MM/YYYY hh:mm:ss")
          }
        >
          <img style={{ marginTop: "10px" }} src={completed} alt="" />
        </Tooltip>
        <Tooltip
          placement="right"
          title={
            <Fragment>
              <Typography>Contract Completed</Typography>
              <p>
                <a>{"Company name: " + companyA.name}</a>
                <br />
                <a>{"Signer: " + signerA.name}</a>
              </p>
              <p>
                <a>{"Company name: " + companyB.name}</a>
                <br />
                <a>{" Signer: " + signerB.name}</a>
              </p>
              <p>
                {"Contract completed:" +
                  moment(document.dateSign).format("DD/MM/YYYY hh:mm:ss")}
              </p>
            </Fragment>
          }
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
export default StepDetailContract;
