"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
require("jspdf-autotable");


// Define TypeScript interface for form data
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
    companyName,
    companyLogo,
    employeeName,
    employeeId,
    designation,
    department,
    payPeriodFrom,
    payPeriodTo,
    workingDaysPaidFor,
    noOfLops,
    earnings,
    deductions,
    netPay,
    paymentMethod,
  } = formData;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Helper function to add Rupee symbol if missing
    const formatAmount = (amount: string) =>
      amount.includes("₹") ? amount : `₹${amount}`;

    // Set font and colors
    doc.setFont("helvetica");
    doc.setFontSize(10);
    const primaryColor = [41, 128, 185] as [number, number, number];
    const secondaryColor = [149, 165, 166] as [number, number, number];

    // Header with Company Logo and Payslip Title
    // doc.addImage("/placeholder.svg", "PNG", 20, 20, 15, 15); // Company Logo 
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(`${companyName} - Payslip`, 20, 25);
    doc.setFontSize(12);
    doc.text(`Pay Period: ${payPeriodFrom} to ${payPeriodTo}`, 20, 35);

    // Employee details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("Employee Details", 20, 55);
    doc.setDrawColor(...secondaryColor);
    doc.line(20, 57, pageWidth - 20, 57);

    const employeeDetails = [
      ["Employee Name", employeeName, "Employee ID", employeeId],
      ["Designation", designation, "Department", department],
      ["Working Days", workingDaysPaidFor, "LOPs", noOfLops],
    ];

    autoTable(doc, {
      startY: 60,
      head: [],
      body: employeeDetails,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 1 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { fontStyle: "bold", cellWidth: 40 },
        3: { cellWidth: 60 },
      },
    });

    // Earnings Table
    doc.setFontSize(12);
    doc.text("Earnings", 20, (doc as any).lastAutoTable.finalY + 15);
    doc.line(
      20,
      (doc as any).lastAutoTable.finalY + 17,
      pageWidth - 20,
      (doc as any).lastAutoTable.finalY + 17
    );

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [["Description", "Amount"]],
      body: earnings.map((field) => [field.name, formatAmount(field.amount)]),
      theme: "striped",
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 60, halign: "right" },
      },
    });

    // Deductions Table
    doc.setFontSize(12);
    doc.text("Deductions", 20, (doc as any).lastAutoTable.finalY + 15);
    doc.line(
      20,
      (doc as any).lastAutoTable.finalY + 17,
      pageWidth - 20,
      (doc as any).lastAutoTable.finalY + 17
    );

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [["Description", "Amount"]],
      body: deductions.map((field) => [field.name, formatAmount(field.amount)]),
      theme: "striped",
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 60, halign: "right" },
      },
    });

    // Net Pay and Payment Method
    // doc.setFillColor(...secondaryColor);
    doc.rect(
      20,
      (doc as any).lastAutoTable.finalY + 10,
      pageWidth - 40,
      25,
      "F"
    );
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Net Pay:", 25, (doc as any).lastAutoTable.finalY + 25);
    doc.setFontSize(16);
    doc.text(
      formatAmount(netPay),
      pageWidth - 25,
      (doc as any).lastAutoTable.finalY + 25,
      { align: "right" }
    );
    doc.setFontSize(10);
    doc.text(
      `Payment Method: ${paymentMethod}`,
      25,
      (doc as any).lastAutoTable.finalY + 30
    );

    // Footer note
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text(
      "This is a computer-generated payslip and does not require a signature.",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    // Download the PDF
    doc.save(`Payslip_${employeeName}_${employeeId}.pdf`);
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
            src={companyLogo}
            alt="Company Logo"
            width={48}
            height={48}
            className="rounded-md"
            style={{ aspectRatio: "48/48", objectFit: "cover" }}
          />
          <div className="grid gap-1">
            <div className="text-lg font-semibold">{companyName}</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Pay Period: {payPeriodFrom} - {payPeriodTo}
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
      <CardFooter>
        <div className="w-full">
          <div className="text-xs text-muted-foreground text-center mb-2">
            This is a computer-generated payslip and does not require a
            signature.
          </div>
          <Separator />
          <div className="flex gap-8 m-4 justify-center">
            <Button onClick={downloadPDF}>Download as PDF</Button>
            <Button onClick={sendEmail}>Send via Email</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PayslipSummary;
