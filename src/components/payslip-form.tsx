'use client';
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PayslipSummary from "./payslip-summary";
import { Separator } from "./ui/separator";

const InputWithLabel: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
  <div className="grid gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      type="text"
      className="border border-gray-300 p-2 rounded"
      value={value}
      onChange={onChange}
    />
  </div>
);

export const PayslipForm = () => {
  const [earnings, setEarnings] = useState<{ name: string; amount: string }[]>([
    { name: "Basic Salary", amount: "₹40,000" },
    { name: "Allowances", amount: "₹5,000" },
    { name: "Bonus", amount: "₹5,000" },
  ]);

  const [deductions, setDeductions] = useState<
    { name: string; amount: string }[]
  >([
    { name: "Provident Fund", amount: "₹5,000" },
    { name: "Income Tax", amount: "₹3,000" },
    { name: "Professional Tax", amount: "₹200" },
  ]);

  // Function to calculate net pay
  const calculateNetPay = () => {
    const totalEarnings = earnings.reduce(
      (acc, item) =>
        acc + parseFloat(item.amount.replace("₹", "").replace(",", "")),
      0
    );
    const totalDeductions = deductions.reduce(
      (acc, item) =>
        acc + parseFloat(item.amount.replace("₹", "").replace(",", "")),
      0
    );
    const netPay = totalEarnings - totalDeductions;
    return `₹${netPay.toLocaleString()}`;
  };

  const [formData, setFormData] = useState({
    employeeName: "Raj Kumar",
    employeeId: "EMP-0123",
    designation: "Software Engineer",
    department: "Engineering",
    payPeriod: "June 1, 2023 - June 30, 2023",
    earnings: earnings,
    deductions: deductions,
    netPay: calculateNetPay(),
    paymentMethod: "Bank Transfer",
  });

  const [showSummary, setShowSummary] = useState(false);

  const handleAddField = (type: "earnings" | "deductions") => {
    if (type === "earnings") {
      setEarnings([...earnings, { name: "", amount: "" }]);
    } else if (type === "deductions") {
      setDeductions([...deductions, { name: "", amount: "" }]);
    }
  };

  const handleFieldChange = (
    type: "earnings" | "deductions",
    index: number,
    key: "name" | "amount",
    value: string
  ) => {
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

  const generatePayslip = () => {
    setFormData({
      ...formData,
      earnings: earnings,
      deductions: deductions,
      netPay: calculateNetPay(),
    });
    setShowSummary(true);
  };

  if (showSummary) {
    return <PayslipSummary formData={formData} />;
  }

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
            <div className="text-sm text-muted-foreground">Payslip Form</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 py-6">
        <div className="grid gap-4">
          <InputWithLabel
            label="Employee Name"
            value={formData.employeeName}
            onChange={(e) =>
              setFormData({ ...formData, employeeName: e.target.value })
            }
          />
          <InputWithLabel
            label="Employee ID"
            value={formData.employeeId}
            onChange={(e) =>
              setFormData({ ...formData, employeeId: e.target.value })
            }
          />
          <InputWithLabel
            label="Designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
          />
          <InputWithLabel
            label="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />
          <InputWithLabel
            label="Pay Period"
            value={formData.payPeriod}
            onChange={(e) =>
              setFormData({ ...formData, payPeriod: e.target.value })
            }
          />
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Earnings</div>
            {earnings.map((field, index) => (
              <div key={index} className="flex gap-2">
                <InputWithLabel
                  label="Earnings name"
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange("earnings", index, "name", e.target.value)
                  }
                />
                <InputWithLabel
                  label="Amount"
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
              </div>
            ))}
            <Button onClick={() => handleAddField("earnings")}>
              Add Earnings
            </Button>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Deductions</div>
            {deductions.map((field, index) => (
              <div key={index} className="flex gap-2">
                <InputWithLabel
                  label="Deduction name"
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
                <InputWithLabel
                  label="Amount"
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
              </div>
            ))}
            <Button onClick={() => handleAddField("deductions")}>
              Add Deductions
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-4">
        <Button onClick={generatePayslip}>Generate Payslip</Button>
      </CardFooter>
    </Card>
  );
};
