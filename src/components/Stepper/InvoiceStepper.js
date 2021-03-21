import { Stepper } from "@progress/kendo-react-layout";

const items = [
  { label: "Send", icon: "k-i-flip-vertical" },
  { label: "Signed", icon: "k-i-track-changes" },
];
function InvoiceStepper({value}) {
  return <Stepper value={value} items={items} />;
}
export default InvoiceStepper;