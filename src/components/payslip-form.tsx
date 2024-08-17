'use client'
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const PayslipForm = () => {
  // State to manage earnings and deductions
  const [earnings, setEarnings] = useState([
    { name: "Basic Salary", amount: "₹40,000" },
    { name: "Allowances", amount: "₹5,000" },
    { name: "Bonus", amount: "₹5,000" },
  ]);

  const [deductions, setDeductions] = useState([
    { name: "Provident Fund", amount: "₹5,000" },
    { name: "Income Tax", amount: "₹3,000" },
    { name: "Professional Tax", amount: "₹200" },
  ]);

  // Handler to add a new field to earnings or deductions
  const handleAddField = (type: any) => {
    if (type === "earnings") {
      setEarnings([...earnings, { name: "", amount: "" }]);
    } else if (type === "deductions") {
      setDeductions([...deductions, { name: "", amount: "" }]);
    }
  };

  // Handler to update field values
  const handleFieldChange = (type: string, index: number, key: string, value: string) => {
    if (type === "earnings") {
      setEarnings(
        earnings.map((field, i) =>
          i === index ? { ...field, [key]: value } : field
        )
      );
    } else if (type === "deductions") {
      setDeductions(
        deductions.map((field, i) =>
          i === index ? { ...field, [key]: value } : field
        )
      );
    }
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
            <div className="text-sm text-muted-foreground">
              Payslip Generator
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Pay Period:{" "}
          <Input
            type="text"
            className="w-40"
            defaultValue="June 1, 2023 - June 30, 2023"
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Employee Name</div>
            <Input type="text" className="w-full" defaultValue="Raj Kumar" />
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Employee ID</div>
            <Input type="text" className="w-full" defaultValue="EMP-0123" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Designation</div>
            <Input
              type="text"
              className="w-full"
              defaultValue="Software Engineer"
            />
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Department</div>
            <Input type="text" className="w-full" defaultValue="Engineering" />
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
                    <Input
                      type="text"
                      className="w-full"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(
                          "earnings",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      type="text"
                      className="w-24"
                      value={field.amount}
                      onChange={(e) =>
                        handleFieldChange(
                          "earnings",
                          index,
                          "amount",
                          e.target.value
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <Button
                className="mt-2"
                onClick={() => handleAddField("earnings")}
              >
                Add New Field
              </Button>
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Deductions</div>
            <div>
              <ul className="grid gap-1 text-muted-foreground">
                {deductions.map((field, index) => (
                  <li key={index} className="flex justify-between">
                    <Input
                      type="text"
                      className="w-full"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(
                          "deductions",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      type="text"
                      className="w-24"
                      value={field.amount}
                      onChange={(e) =>
                        handleFieldChange(
                          "deductions",
                          index,
                          "amount",
                          e.target.value
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
              <Button
                className="mt-2"
                onClick={() => handleAddField("deductions")}
              >
                Add New Field
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Net Pay</div>
            <div className="text-2xl font-bold">₹41,800</div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Payment Method</div>
            <Input
              type="text"
              className="w-full"
              defaultValue="Bank Transfer"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          This is a computer-generated payslip and does not require a signature.
        </div>
        {/* <Button onClick={() => generatePDF()}>Generate Payslip</Button> */}
      </CardFooter>
    </Card>
  );
};
