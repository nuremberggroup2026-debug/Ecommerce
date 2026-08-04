import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import {data} from "@/app/(admin)/dashboard/products/data"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return data
    
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}