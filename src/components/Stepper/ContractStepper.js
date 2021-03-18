import { Stepper } from "@progress/kendo-react-layout";

const items = [
  { label: "Send", icon: "k-i-flip-vertical" },
  { label: "Signed 1", icon: "k-i-track-changes" },
  { label: "Signed 2", icon: "k-i-track-changes" },
];
function ContractStepper({ value }) {
  return <Stepper value={value} items={items}  />;
}
export default ContractStepper;
