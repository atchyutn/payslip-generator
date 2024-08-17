import Image from "next/image";
import { PayslipForm } from "@/components/payslip-form";
import PayslipSummary from "@/components/payslip-summary";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center m-5">
        PaySlip Generator
      </h1>
      <PayslipForm />
    </>
  );
}
