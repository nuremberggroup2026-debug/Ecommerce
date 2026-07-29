import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

// ======================================================
// محاكاة جلب البيانات من API
// لاحقًا استبدلها بـ fetch أو axios
// ======================================================

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728dge2f",
      amount: 120,
      status: "success",
      email: "b@example.com",
    },
    {
      id: "82af132f",
      amount: 350,
      status: "processing",
      email: "john@example.com",
    },
    {
      id: "82af987f",
      amount: 480,
      status: "failed",
      email: "alex@example.com",
    },
    {
      id: "193ab12f",
      amount: 220,
      status: "pending",
      email: "sarah@example.com",
    },
    {
      id: "663bc44f",
      amount: 90,
      status: "success",
      email: "jack@example.com",
    },
    {
      id: "663bc45f",
      amount: 180,
      status: "processing",
      email: "mike@example.com",
    },
    {
      id: "663bc46f",
      amount: 410,
      status: "success",
      email: "emma@example.com",
    },
    {
      id: "663bc47f",
      amount: 70,
      status: "failed",
      email: "noah@example.com",
    },
    {
      id: "663bc48f",
      amount: 510,
      status: "pending",
      email: "olivia@example.com",
    },
  ]
}

// ======================================================
// الصفحة الرئيسية
// ======================================================

export default async function DemoPage() {

  // جلب البيانات
  const data = await getData()

  return (
    <div className="container mx-auto py-10">

      {/* عنوان الصفحة */}
      <h1 className="mb-6 text-3xl font-bold">
        Payments
      </h1>

      {/* إرسال البيانات والأعمدة إلى DataTable */}
      <DataTable
        columns={columns}
        data={data}
      />

    </div>
  )
}
