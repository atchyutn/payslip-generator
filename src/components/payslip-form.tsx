"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PayslipSummary from "./payslip-summary";
import { Separator } from "./ui/separator";

interface FinancialEntry {
  name: string;
  amount: string;
}

interface FormData {
  companyName: string;
  companyLogo: string;
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  payPeriodFrom: string;
  payPeriodTo: string;
  workingDaysPaidFor: string;
  noOfLops: string;
  earnings: FinancialEntry[];
  deductions: FinancialEntry[];
  netPay: string;
  paymentMethod: string;
}

const InputWithLabel: React.FC<{
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange, type = "text" }) => (
  <div className="grid gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      className="border border-gray-300 p-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FinancialEntryInput: React.FC<{
  entries: FinancialEntry[];
  onAdd: () => void;
  onChange: (index: number, key: keyof FinancialEntry, value: string) => void;
  label: string;
}> = ({ entries, onAdd, onChange, label }) => (
  <div className="grid gap-1">
    <div className="text-sm font-medium">{label}</div>
    {entries.map((entry, index) => (
      <div key={index} className="flex gap-2">
        <InputWithLabel
          label={`${label} name`}
          value={entry.name}
          onChange={(value) => onChange(index, "name", value)}
        />
        <InputWithLabel
          label="Amount"
          value={entry.amount}
          onChange={(value) => onChange(index, "amount", value)}
        />
      </div>
    ))}
    <Button onClick={onAdd}>Add {label}</Button>
  </div>
);

export const PayslipForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyLogo: "",
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    payPeriodFrom: "",
    payPeriodTo: "",
    workingDaysPaidFor: "",
    noOfLops: "",
    earnings: [],
    deductions: [],
    netPay: "₹0",
    paymentMethod: "",
  });

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddField = (type: "earnings" | "deductions") => {
    const newEntry: FinancialEntry = { name: "", amount: "" };
    updateFormData(type, [...formData[type], newEntry]);
  };

  const handleFieldChange = (
    type: "earnings" | "deductions",
    index: number,
    key: keyof FinancialEntry,
    value: string
  ) => {
    const updatedEntries = formData[type].map((entry, i) =>
      i === index ? { ...entry, [key]: value } : entry
    );
    updateFormData(type, updatedEntries);
  };

  const calculateNetPay = (): string => {
    const totalEarnings = formData.earnings.reduce(
      (acc, item) => acc + parseFloat(item.amount.replace(/[₹,]/g, "")),
      0
    );
    const totalDeductions = formData.deductions.reduce(
      (acc, item) => acc + parseFloat(item.amount.replace(/[₹,]/g, "")),
      0
    );
    const netPay = totalEarnings - totalDeductions;
    return `₹${netPay.toLocaleString()}`;
  };

  const handleSampleData = () => {
    setFormData({
      companyLogo: "./placeholder.svg",
      companyName: "Sample Company",
      employeeName: "John Doe",
      employeeId: "EMP001",
      designation: "Software Engineer",
      department: "Engineering",
      workingDaysPaidFor: "20",
      noOfLops: "2",
      payPeriodFrom: "2024-08-01",
      payPeriodTo: "2024-08-31",
      earnings: [
        { name: "Basic Salary", amount: "₹40,000" },
        { name: "Allowances", amount: "₹5,000" },
        { name: "Bonus", amount: "₹5,000" },
      ],
      deductions: [
        { name: "Provident Fund", amount: "₹5,000" },
        { name: "Income Tax", amount: "₹3,000" },
        { name: "Professional Tax", amount: "₹200" },
      ],
      netPay: "₹0",
      paymentMethod: "",
    });
  };

  useEffect(() => {
    updateFormData("netPay", calculateNetPay());
  }, [formData.earnings, formData.deductions]);

  return (
    <div className="flex justify-between p-4 space-x-4">
      <div className="w-1/2">
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex border-b pb-4">
            <div className="flex justify-between w-full">
              <Button onClick={handleSampleData} className="text-sm">
                Add Sample Data
              </Button>
            </div>
            <div className="grid gap-6 py-6">
              <InputWithLabel
                label="Company Logo URL"
                value={formData.companyLogo}
                onChange={(value) => updateFormData("companyLogo", value)}
              />
              <InputWithLabel
                label="Company Name"
                value={formData.companyName}
                onChange={(value) => updateFormData("companyName", value)}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              {["employeeName", "employeeId", "designation", "department"].map(
                (field) => (
                  <InputWithLabel
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field as keyof FormData] as string}
                    onChange={(value) =>
                      updateFormData(field as keyof FormData, value)
                    }
                  />
                )
              )}
              <InputWithLabel
                label="Pay Period From"
                value={formData.payPeriodFrom}
                onChange={(value) => updateFormData("payPeriodFrom", value)}
                type="date"
              />
              <InputWithLabel
                label="Pay Period To"
                value={formData.payPeriodTo}
                onChange={(value) => updateFormData("payPeriodTo", value)}
                type="date"
              />
              <InputWithLabel
                label="Working Days Paid For"
                value={formData.workingDaysPaidFor}
                onChange={(value) =>
                  updateFormData("workingDaysPaidFor", value)
                }
              />
              <InputWithLabel
                label="Number of LOPs"
                value={formData.noOfLops}
                onChange={(value) => updateFormData("noOfLops", value)}
              />
            </div>
            <Separator />
            <FinancialEntryInput
              entries={formData.earnings}
              onAdd={() => handleAddField("earnings")}
              onChange={(index, key, value) =>
                handleFieldChange("earnings", index, key, value)
              }
              label="Earnings"
            />
            <FinancialEntryInput
              entries={formData.deductions}
              onAdd={() => handleAddField("deductions")}
              onChange={(index, key, value) =>
                handleFieldChange("deductions", index, key, value)
              }
              label="Deductions"
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2">
        <PayslipSummary formData={formData} />
      </div>
    </div>
  );
};
