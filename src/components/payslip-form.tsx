"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PayslipSummary from "./payslip-summary";
import { Separator } from "./ui/separator";

interface FinancialEntry {
  name: string;
  amount: string;
}

const InputWithLabel: React.FC<{
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, onChange, type = "text" }) => (
  <div className="grid gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      className="border border-gray-300 p-2 rounded"
      value={value}
      onChange={onChange}
    />
  </div>
);

export const PayslipForm = () => {
  const [companyLogo, setCompanyLogo] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [workingDaysPaidFor, setWorkingDaysPaidFor] = useState<string>("");
  const [noOfLops, setNoOfLops] = useState<string>("");
  const [payPeriodFrom, setPayPeriodFrom] = useState<string>("");
  const [payPeriodTo, setPayPeriodTo] = useState<string>("");
  const [netPay, setNetPay] = useState<string>(""); 

  const [earnings, setEarnings] = useState<FinancialEntry[]>([]);
  const [deductions, setDeductions] = useState<FinancialEntry[]>([]);

  const [formData, setFormData] = useState({
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
    earnings: [] as FinancialEntry[],
    deductions: [] as FinancialEntry[],
    netPay: "₹0",
    paymentMethod: "",
  });

  const handleAddField = (type: "earnings" | "deductions") => {
    const newEntry: FinancialEntry = { name: "", amount: "" };
    if (type === "earnings") {
      setEarnings([...earnings, newEntry]);
    } else if (type === "deductions") {
      setDeductions([...deductions, newEntry]);
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

  const handleSampleData = () => {
    setCompanyLogo("./placeholder.svg");
    setCompanyName("Sample Company");
    setWorkingDaysPaidFor("20");
    setEmployeeName("John Doe");
    setEmployeeId("EMP001");
    setDesignation("Software Engineer");
    setDepartment("Engineering");
    setNoOfLops("2");
    setPayPeriodFrom("2024-08-01");
    setPayPeriodTo("2024-08-31");

    setEarnings([
      { name: "Basic Salary", amount: "₹40,000" },
      { name: "Allowances", amount: "₹5,000" },
      { name: "Bonus", amount: "₹5,000" },
    ]);

    setDeductions([
      { name: "Provident Fund", amount: "₹5,000" },
      { name: "Income Tax", amount: "₹3,000" },
      { name: "Professional Tax", amount: "₹200" },
    ]);
  };

  useEffect(() => {
    setFormData({
      companyName: companyName,
      companyLogo: companyLogo,
      employeeName: employeeName,
      employeeId: employeeId,
      designation: designation,
      department:  department,
      payPeriodFrom: payPeriodFrom,
      payPeriodTo: payPeriodTo,
      workingDaysPaidFor: workingDaysPaidFor,
      noOfLops: noOfLops,
      earnings: earnings,
      deductions: deductions,
      netPay: calculateNetPay(),
      paymentMethod: formData.paymentMethod,
    });
  }, [
    companyLogo,
    companyName,
    workingDaysPaidFor,
    noOfLops,
    earnings,
    deductions,
    payPeriodFrom,
    payPeriodTo,
    formData.employeeName,
    formData.employeeId,
    formData.designation,
    formData.department,
  ]);

  return (
    <>
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
                    setEmployeeName(e.target.value)
                  }
                />
                <InputWithLabel
                  label="Employee ID"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setEmployeeId(e.target.value)
                  }
                />
                <InputWithLabel
                  label="Designation"
                  value={formData.designation}
                  onChange={(e) =>
                    setDesignation(e.target.value)
                  }

                />
                <InputWithLabel
                  label="Department"
                  value={formData.department}
                  onChange={(e) =>
                    setDepartment(e.target.value)}
                />
                <InputWithLabel
                  label="Pay Period From"
                  value={payPeriodFrom}
                  onChange={(e) => 
                    setPayPeriodFrom(e.target.value)

                  }
                  type="date"
                />
                <InputWithLabel
                  label="Pay Period To"
                  value={payPeriodTo}
                  onChange={(e) => setPayPeriodTo(e.target.value)}
                  type="date"
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
                        label="Deductions name"
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
          </Card>
        </div>
        <div className="w-1/2">
          <PayslipSummary formData={formData} />
        </div>
      </div>
    </>
  );
};
