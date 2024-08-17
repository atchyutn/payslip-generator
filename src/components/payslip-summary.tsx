import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define TypeScript interface for form data
interface FormData {
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  payPeriod: string;
  earnings: { name: string; amount: string }[];
  deductions: { name: string; amount: string }[];
  netPay: string;
  paymentMethod: string;
}

interface PayslipSummaryProps {
  formData: FormData;
}

const PayslipSummary: React.FC<PayslipSummaryProps> = ({ formData }) => {
  const {
    employeeName,
    employeeId,
    designation,
    department,
    payPeriod,
    earnings,
    deductions,
    netPay,
    paymentMethod,
  } = formData;

  const downloadPDF = () => {
    // Implement PDF download logic here
    alert("Download PDF functionality is not yet implemented.");
  };

  const sendEmail = () => {
    // Implement send email logic here
    alert("Send email functionality is not yet implemented.");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="Company Logo"
            width={48}
            height={48}
            className="rounded-md"
            style={{ aspectRatio: "48/48", objectFit: "cover" }}
          />
          <div className="grid gap-1">
            <div className="text-lg font-semibold">Acme Inc.</div>
            <div className="text-sm text-muted-foreground">Payslip Summary</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Pay Period: {payPeriod}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Employee Name</div>
            <div>{employeeName}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Employee ID</div>
            <div>{employeeId}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Designation</div>
            <div>{designation}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Department</div>
            <div>{department}</div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Earnings</div>
            <div>
              <ul className="grid gap-1 text-muted-foreground">
                {earnings.map((field, index) => (
                  <li key={index} className="flex justify-between">
                    <div>{field.name}</div>
                    <div>{field.amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Deductions</div>
            <div>
              <ul className="grid gap-1 text-muted-foreground">
                {deductions.map((field, index) => (
                  <li key={index} className="flex justify-between">
                    <div>{field.name}</div>
                    <div>{field.amount}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Net Pay</div>
            <div className="text-2xl font-bold">{netPay}</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Payment Method</div>
            <div>{paymentMethod}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          This is a computer-generated payslip and does not require a signature.
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadPDF}>Download as PDF</Button>
          <Button onClick={sendEmail}>Send via Email</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PayslipSummary;
