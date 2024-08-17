import Image from "next/image";
import { PayslipForm } from "@/components/payslip-form";

export default function Home() {
  return (
    <>
      <h1>
        Please fill in the details to generate the payslip or add new fields of
        your choice
      </h1>
      <PayslipForm />
    </>
  );
}
