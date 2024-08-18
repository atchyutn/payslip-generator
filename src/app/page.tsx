import Image from "next/image";
import { PayslipForm } from "@/components/payslip-form";
import PayslipSummary from "@/components/payslip-summary";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center m-5">PaySlip Generator</h1>
      <h1 className="text-xs font-bold text-center">
        Please fill in the details to generate the payslip or add new fields of
        your choice
      </h1>
      <PayslipForm />
    </>
  );
}
