"use client";

import { ReactNode, useMemo, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { OrderStatus } from "@/server/orders/types";

import ReportDateRange from "./report-date-range";
import ReportStatus from "./report-status";
import { downloadOrdersReportPDF } from "./orders-report-pdf";
import type { OrderReportFiltrationObject, ReportPreset } from "../../types";
import { orderReportData } from "../../api/orders.client.api";
import {
  getDateInputValue,
  getPresetDates,
} from "@/lib/helpers/clientSideHelpers";

type Props = {
  children: ReactNode;
};

const MAX_REPORT_DAYS = 370;

export default function GenerateOrdersReportDialog({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<ReportPreset>("thisMonth");

  const [from, setFrom] = useState(() =>
    getDateInputValue(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ),
  );

  const [to, setTo] = useState(() => getDateInputValue(new Date()));

  const [specificYear, setSpecificYear] = useState(
    String(new Date().getFullYear()),
  );

  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");

  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) =>
      String(currentYear - index),
    );
  }, [currentYear]);

  const handlePresetChange = (value: ReportPreset) => {
    setPreset(value);
    setError("");

    const dates = getPresetDates(value);

    setFrom(dates.from);
    setTo(dates.to);
  };

  const handleSpecificYearChange = (year: string) => {
    setSpecificYear(year);

    const selectedYear = Number(year);

    const fromDate = new Date(selectedYear, 0, 1);
    const toDate = new Date(selectedYear, 11, 31);

    setFrom(getDateInputValue(fromDate));
    setTo(getDateInputValue(toDate));
    setError("");
  };

  const handleGenerate = async () => {
    setError("");

    if (!from || !to) {
      setError("Please select both a start date and an end date.");
      return;
    }

    const fromDate = new Date(`${from}T00:00:00`);
    const toDate = new Date(`${to}T00:00:00`);

    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
      setError("Please select valid dates.");
      return;
    }

    if (fromDate > toDate) {
      setError("The start date cannot be after the end date.");
      return;
    }

    const diffInDays =
      (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays > MAX_REPORT_DAYS) {
      setError("The report range cannot exceed one year.");
      return;
    }

    const filterObj: OrderReportFiltrationObject = {
      from,
      to,
      ...(status !== "ALL" && {
        status,
      }),
    };

    console.log("filterObj:", filterObj);

    setIsGenerating(true);
    try {
      const result = await orderReportData(filterObj);

      if (result.success && result.data) {
        await downloadOrdersReportPDF(result.data, { from, to }, status);
        toast.success("Orders report generated successfully.");
        setOpen(false);
      } else {
        setError(result.message || "Failed to generate report.");
      }
    } catch (error) {
      console.error("Failed to generate report:", error);
      setError("Failed to generate the report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 g-black hover:bg-gray-800">
            <FileText className="size-5" />
            Generate Orders Report
          </DialogTitle>

          <DialogDescription>
            Select the date range and optional order status for the report.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <ReportDateRange
            preset={preset}
            from={from}
            to={to}
            specificYear={specificYear}
            years={years}
            onPresetChange={handlePresetChange}
            onSpecificYearChange={handleSpecificYearChange}
            onFromChange={(value) => {
              setFrom(value);
              setError("");
            }}
            onToChange={(value) => {
              setTo(value);
              setError("");
            }}
          />

          <ReportStatus status={status} onStatusChange={setStatus} />

          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isGenerating}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="bg-black hover:bg-gray-800"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin size-4" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="size-4" />
                Generate Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
