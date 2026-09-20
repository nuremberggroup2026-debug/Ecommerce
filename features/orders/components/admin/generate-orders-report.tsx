"use client";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import GenerateOrdersReportDialog from "./generate-orders-report-dialog";

export default function GenerateOrdersReport() {
  return (
    <GenerateOrdersReportDialog>
      <Button type="button" className="bg-black hover:bg-gray-800">
        <FileText />
        Generate Orders Report
      </Button>
    </GenerateOrdersReportDialog>
  );
}
