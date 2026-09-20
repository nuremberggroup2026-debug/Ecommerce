import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Rect,
  Circle,
} from "@react-pdf/renderer";
import type {
  OrdersReportDataType,
  OrderStatus,
} from "@/features/orders/types";

// Design system: Minimal, formal, compact business report matching AURA visual identity
const COLORS = {
  primary: "#111827", // Neutral 900
  secondary: "#374151", // Neutral 700
  muted: "#6B7280", // Neutral 500
  lightMuted: "#9CA3AF", // Neutral 400
  border: "#E5E7EB", // Neutral 200
  borderLight: "#F3F4F6", // Neutral 100
  bgCard: "#F9FAFB", // Neutral 50
  bgHeader: "#F9FAFB", // Table header background (shadcn datatable style)
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: COLORS.white,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    color: COLORS.primary,
    fontSize: 7.5,
    lineHeight: 1.3,
  },

  // Subtle top accent line
  topAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
  },

  // Compact Header
  header: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandLogoMark: {
    width: 20,
    height: 20,
  },
  brandName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    color: COLORS.primary,
  },
  brandSuffix: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: COLORS.muted,
    marginLeft: 2,
  },
  headerDivider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  reportTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    letterSpacing: -0.2,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  headerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerMetaLabel: {
    fontSize: 7,
    fontFamily: "Helvetica",
    color: COLORS.muted,
    textTransform: "uppercase",
  },
  headerMetaValue: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },

  // Side-by-Side Section (Summary + Top Products)
  dashboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },

  // Section titles
  subSectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },

  // Summary (Left: 58% width)
  summaryCol: {
    width: "57%",
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 4,
  },
  summaryCard: {
    width: "32%",
    backgroundColor: COLORS.bgCard,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  summaryCardLabel: {
    fontSize: 6.2,
    fontFamily: "Helvetica",
    color: COLORS.muted,
    marginBottom: 2,
  },
  summaryCardValue: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },

  // Top Products (Right: 43% width)
  topProductsCol: {
    width: "41%",
  },
  topProductsTable: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  topProductHeaderRow: {
    flexDirection: "row",
    backgroundColor: COLORS.bgHeader,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  topProductRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    paddingVertical: 2.5,
    paddingHorizontal: 5,
  },
  topProductRowLast: {
    borderBottomWidth: 0,
  },
  topRankCell: {
    width: "14%",
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.muted,
  },
  topNameCell: {
    width: "66%",
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.primary,
    paddingRight: 4,
  },
  topQtyCell: {
    width: "20%",
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    textAlign: "right",
  },

  // Main Section: Order Details Data Table (shadcn datatable style)
  ordersSection: {
    flex: 1,
  },
  ordersSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ordersSectionTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  ordersCountBadge: {
    fontSize: 7,
    fontFamily: "Helvetica",
    color: COLORS.muted,
  },

  // DataTable Styles
  dataTable: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.bgHeader,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingVertical: 4.5,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  tableHeaderCell: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderLight,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
  },
  tableRowAlt: {
    backgroundColor: "#FCFCFD",
  },

  // Column Widths (Sum = 100%)
  colOrderNumber: {
    width: "16%",
  },
  colDate: {
    width: "10%",
  },
  colCustomer: {
    width: "21%",
    paddingRight: 4,
  },
  colProducts: {
    width: "23%",
    paddingRight: 4,
  },
  colStatus: {
    width: "11%",
  },
  colPayment: {
    width: "7%",
  },
  colSubtotal: {
    width: "6%",
    textAlign: "right",
  },
  colTotal: {
    width: "6%",
    textAlign: "right",
  },

  // Cell typography
  cellOrderNumber: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
  cellDate: {
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.secondary,
  },
  cellCustomer: {
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.primary,
  },
  cellProductLine: {
    fontSize: 6,
    fontFamily: "Helvetica",
    color: COLORS.primary,
    lineHeight: 1.2,
  },
  cellPayment: {
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.secondary,
  },
  cellSubtotal: {
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.muted,
  },
  cellTotal: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },

  // Status Text (colored font only, no background)
  statusText: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
  },

  // Empty State
  emptyState: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bgCard,
  },
  emptyStateText: {
    fontSize: 7,
    fontFamily: "Helvetica",
    color: COLORS.muted,
    textAlign: "center",
  },

  // Footer (Fixed across all pages)
  footer: {
    position: "absolute",
    bottom: 14,
    left: 24,
    right: 24,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 6.5,
    fontFamily: "Helvetica",
    color: COLORS.muted,
  },
  footerPageNum: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.primary,
  },
});

// Formatters
function formatCurrency(amount: number | string | undefined | null): string {
  const num = typeof amount === "string" ? parseFloat(amount) : (amount ?? 0);
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(date: Date | string | undefined | null): string {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getStatusTextColor(status: string): string {
  switch (status?.toUpperCase()) {
    case "DELIVERED":
      return "#059669"; // Emerald 600
    case "PENDING":
    case "PROCESSING":
      return "#D97706"; // Amber 600
    case "SHIPPED":
      return "#2563EB"; // Blue 600
    case "CANCELLED":
      return "#DC2626"; // Red 600
    default:
      return "#4B5563"; // Gray 600
  }
}

export type OrdersReportPDFProps = {
  data: OrdersReportDataType;
  dateRange: {
    from: string | Date;
    to: string | Date;
  };
  statusFilter?: OrderStatus | "ALL" | string;
};

export function OrdersReportPDFDocument({
  data,
  dateRange,
  statusFilter,
}: OrdersReportPDFProps) {
  const { ordersSummary, topSoldProducts = [], orderDetails = [] } = data;

  const displayStatus =
    !statusFilter || statusFilter === "ALL" || statusFilter.toLowerCase() === "all"
      ? "All Statuses"
      : statusFilter;

  return (
    <Document
      title={`Orders-Report-${formatDate(dateRange.from)}-to-${formatDate(dateRange.to)}`}
      author="AURA Store"
      subject="Orders Report"
    >
      <Page size="A4" style={styles.page}>
        {/* Subtle accent bar at the very top of each page */}
        <View style={styles.topAccentBar} fixed />

        {/* ======================================================== */}
        {/* 1. COMPACT HEADER                                        */}
        {/* ======================================================== */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Svg style={styles.brandLogoMark} viewBox="0 0 24 24">
              <Rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                fill="#111827"
              />
              <Circle cx="12" cy="12" r="4" fill="#FFFFFF" />
            </Svg>

            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.brandName}>AURA</Text>
              <Text style={styles.brandSuffix}>STORE</Text>
            </View>

            <View style={styles.headerDivider} />

            <Text style={styles.reportTitle}>Orders Report</Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.headerMetaRow}>
              <Text style={styles.headerMetaLabel}>RANGE:</Text>
              <Text style={styles.headerMetaValue}>
                From  {formatDate(dateRange.from)}  To {formatDate(dateRange.to)}
              </Text>
            </View>

            <View style={styles.headerMetaRow}>
              <Text style={styles.headerMetaLabel}>FILTER:</Text>
              <Text style={styles.headerMetaValue}>{displayStatus}</Text>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 2 & 3. COMPACT SIDE-BY-SIDE SUMMARY & TOP PRODUCTS       */}
        {/* ======================================================== */}
        <View style={styles.dashboardRow}>
          {/* Summary Cards Grid (Left) */}
          <View style={styles.summaryCol}>
            <Text style={styles.subSectionTitle}>Summary Overview</Text>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Total Orders</Text>
                <Text style={styles.summaryCardValue}>
                  {ordersSummary?.allOrdersCount?.toLocaleString() ?? 0}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Items Sold</Text>
                <Text style={styles.summaryCardValue}>
                  {ordersSummary?.allSoldItems?.toLocaleString() ?? 0}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Total Delivered Amount (JOD)</Text>
                <Text style={styles.summaryCardValue}>
                  {formatCurrency(ordersSummary?.totalDeliveredOrdersAmount)}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Order Delivered</Text>
                <Text style={styles.summaryCardValue}>
                  {ordersSummary?.totalDeliveredOrdersCount?.toLocaleString() ?? 0}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Order Pending</Text>
                <Text style={styles.summaryCardValue}>
                  {ordersSummary?.totalPendingOrdersCount?.toLocaleString() ?? 0}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryCardLabel}>Order Cancelled</Text>
                <Text style={styles.summaryCardValue}>
                  {ordersSummary?.totalCancelledOrdersCount?.toLocaleString() ?? 0}
                </Text>
              </View>
            </View>
          </View>

          {/* Top 5 Sold Products Table (Right) */}
          <View style={styles.topProductsCol}>
            <Text style={styles.subSectionTitle}>Top 5 Sold Products</Text>

            {topSoldProducts && topSoldProducts.length > 0 ? (
              <View style={styles.topProductsTable}>
                <View style={styles.topProductHeaderRow}>
                  <Text style={[styles.topRankCell, { color: COLORS.secondary }]}>
                    #
                  </Text>
                  <Text style={[styles.topNameCell, { color: COLORS.secondary }]}>
                    Product
                  </Text>
                  <Text style={[styles.topQtyCell, { color: COLORS.secondary }]}>
                    Qty
                  </Text>
                </View>

                {topSoldProducts.slice(0, 5).map((product, index) => {
                  const isLast =
                    index === Math.min(topSoldProducts.length, 5) - 1;
                  return (
                    <View
                      key={`${product.name}-${index}`}
                      style={[
                        styles.topProductRow,
                        isLast ? styles.topProductRowLast : undefined,
                      ]}
                    >
                      <Text style={styles.topRankCell}>#{index + 1}</Text>
                      <Text style={styles.topNameCell}>
                        {product.name}
                      </Text>
                      <Text style={styles.topQtyCell}>
                        {product.quantitySold.toLocaleString()}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={[styles.topProductsTable, styles.emptyState]}>
                <Text style={styles.emptyStateText}>No sales recorded</Text>
              </View>
            )}
          </View>
        </View>

        {/* ======================================================== */}
        {/* 4. ORDER DETAILS: SHADCN DATATABLE STYLE                 */}
        {/* ======================================================== */}
        <View style={styles.ordersSection}>
          <View style={styles.ordersSectionHeader}>
            <Text style={styles.ordersSectionTitle}>Order Details</Text>
            <Text style={styles.ordersCountBadge}>
              {orderDetails.length} order{orderDetails.length === 1 ? "" : "s"} total
            </Text>
          </View>

          <View style={styles.dataTable}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colOrderNumber]}>
                Order #
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colDate]}>
                Date
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colCustomer]}>
                Customer
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colProducts]}>
                Products & Qty
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colStatus]}>
                Status
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colPayment]}>
                Pay
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colSubtotal]}>
                Sub (JOD)
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colTotal]}>
                Total (JOD)
              </Text>
            </View>

            {/* Table Body */}
            {orderDetails && orderDetails.length > 0 ? (
              orderDetails.map((order, idx) => {
                const isAlt = idx % 2 === 1;

                return (
                  <View
                    key={order.orderNumber}
                    style={[styles.tableRow, isAlt ? styles.tableRowAlt : undefined]}
                    wrap={false}
                  >
                    {/* Order Number */}
                    <View style={styles.colOrderNumber}>
                      <Text style={styles.cellOrderNumber}>
                        {order.orderNumber}
                      </Text>
                    </View>

                    {/* Date (Date only without timing) */}
                    <View style={styles.colDate}>
                      <Text style={styles.cellDate}>
                        {formatDate(order.createdAt)}
                      </Text>
                    </View>

                    {/* Customer Email */}
                    <View style={styles.colCustomer}>
                      <Text style={styles.cellCustomer}>
                        {order.email || "—"}
                      </Text>
                    </View>

                    {/* Products & Qty */}
                    <View style={styles.colProducts}>
                      {order.products && order.products.length > 0 ? (
                        order.products.map((p, pIdx) => (
                          <Text
                            key={`${p.name}-${pIdx}`}
                            style={styles.cellProductLine}
                          >
                            • {p.name} × {p.quantity}
                          </Text>
                        ))
                      ) : (
                        <Text style={styles.cellProductLine}>—</Text>
                      )}
                    </View>

                    {/* Status (Font colored only, no background) */}
                    <View style={styles.colStatus}>
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusTextColor(order.status) },
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>

                    {/* Payment Method */}
                    <View style={styles.colPayment}>
                      <Text style={styles.cellPayment}>
                        {order.paymentMethod || "—"}
                      </Text>
                    </View>

                    {/* Subtotal */}
                    <View style={styles.colSubtotal}>
                      <Text style={styles.cellSubtotal}>
                        {formatCurrency(order.subtotal)}
                      </Text>
                    </View>

                    {/* Total */}
                    <View style={styles.colTotal}>
                      <Text style={styles.cellTotal}>
                        {formatCurrency(order.totalAmount)}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No orders found matching the selected criteria.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ======================================================== */}
        {/* 5. FIXED FOOTER (All Pages)                              */}
        {/* ======================================================== */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            AURA Store • Orders Report • Currency: JOD • Confidential
          </Text>

          <Text
            style={styles.footerPageNum}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

/**
 * Client-side utility function to generate and download the Orders Report PDF.
 */
export async function downloadOrdersReportPDF(
  data: OrdersReportDataType,
  dateRange: { from: string | Date; to: string | Date },
  statusFilter?: OrderStatus | "ALL" | string,
) {
  const { pdf } = await import("@react-pdf/renderer");

  const doc = (
    <OrdersReportPDFDocument
      data={data}
      dateRange={dateRange}
      statusFilter={statusFilter}
    />
  );

  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);

  const fromStr =
    dateRange.from instanceof Date
      ? dateRange.from.toISOString().split("T")[0]
      : String(dateRange.from);
  const toStr =
    dateRange.to instanceof Date
      ? dateRange.to.toISOString().split("T")[0]
      : String(dateRange.to);

  const filename = `Orders-Report-${fromStr}-to-${toStr}.pdf`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
