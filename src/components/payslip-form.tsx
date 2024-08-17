"use client";
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

const InputWithLabel: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange }) => (
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
  const [companyLogo, setCompanyLogo] = useState("/placeholder.svg");
  const [companyName, setCompanyName] = useState("Hela and Heed");
  const [workingDaysPaidFor, setWorkingDaysPaidFor] = useState("20");
  const [noOfLops, setNoOfLops] = useState("2");

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
    companyName: companyName,
    companyLogo: companyLogo,
    employeeName: "Raj Kumar",
    employeeId: "EMP-0123",
    designation: "Software Engineer",
    department: "Engineering",
    payPeriod: "June 1, 2023 - June 30, 2023",
    workingDaysPaidFor: workingDaysPaidFor,
    noOfLops: noOfLops,
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
      companyName: companyName,
      companyLogo: companyLogo,
      workingDaysPaidFor,
      noOfLops,
      earnings: earnings,
      deductions: deductions,
      netPay: calculateNetPay(),
    });
    setShowSummary(true);
  };

  return (
    <>
      <div className="flex justify-between p-4 space-x-4">
        <div className="w-1/2">
          <Card className="w-full max-w-2xl">
            <CardHeader className="flex border-b pb-4">
              <h1 className="text-xs font-bold text-center">
                Please fill in the details to generate the payslip or add new
                fields of your choice
              </h1>
              <div className="grid gap-6 py-6">
                <InputWithLabel
                  label="Company Logo URL"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                />
                <div className="grid gap-1 flex-1">
                  <InputWithLabel
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-4">
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
                <InputWithLabel
                  label="Working Days Paid For"
                  value={workingDaysPaidFor}
                  onChange={(e) => setWorkingDaysPaidFor(e.target.value)}
                />
                <InputWithLabel
                  label="Number of LOPs"
                  value={noOfLops}
                  onChange={(e) => setNoOfLops(e.target.value)}
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
                          handleFieldChange(
                            "earnings",
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
        </div>
        {showSummary && (
          <div className="w-1/2">
            <PayslipSummary formData={formData} />
          </div>
        )}
      </div>
    </>
  );
};

export default PayslipForm;
