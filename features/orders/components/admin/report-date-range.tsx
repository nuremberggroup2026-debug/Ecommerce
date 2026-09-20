"use client";

import { CalendarDays } from "lucide-react";
import { ReportPreset } from "@/features/orders/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



type Props = {
  preset: ReportPreset;
  from: string;
  to: string;
  specificYear: string;
  years: string[];
  onPresetChange: (value: ReportPreset) => void;
  onSpecificYearChange: (year: string) => void;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export default function ReportDateRange({
  preset,
  from,
  to,
  specificYear,
  years,
  onPresetChange,
  onSpecificYearChange,
  onFromChange,
  onToChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Date preset */}
      <div className="space-y-2">
        <Label>Date Range</Label>

        <Select
          value={preset}
          onValueChange={(value) => onPresetChange(value as ReportPreset)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="last7Days">Last 7 Days</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
            <SelectItem value="specificYear">Specific Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Specific year */}
      {preset === "specificYear" && (
        <div className="space-y-2">
          <Label>Year</Label>

          <Select value={specificYear} onValueChange={onSpecificYearChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Custom dates */}
      {preset === "custom" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="report-from">From</Label>

            <div className="relative">
              <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

              <Input
                id="report-from"
                type="date"
                value={from}
                onChange={(event) => onFromChange(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-to">To</Label>

            <div className="relative">
              <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

              <Input
                id="report-to"
                type="date"
                value={to}
                onChange={(event) => onToChange(event.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      )}

      {/* Selected range */}
      {preset !== "custom" && (
        <div className="bg-muted/50 rounded-md border p-3 text-sm">
          <p className="text-muted-foreground mb-1">Selected range</p>

          <p className="font-medium">
            {from} → {to}
          </p>
        </div>
      )}
    </div>
  );
}
