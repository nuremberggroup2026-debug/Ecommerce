import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/*<aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold mb-8">E-Commerce</h1>
        <nav className="space-y-3">
          <button className="w-full text-left p-3 rounded bg-gray-100">Dashboard</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Products</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Orders</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Customers</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Categories</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Inventory</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Discounts</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Reviews</button>
          <button className="w-full text-left p-3 rounded hover:bg-gray-100">Settings</button>
        </nav>
      </aside>*/}

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="bg-black text-white px-5 py-2 rounded">
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Total Sales</h3>
            <p className="text-3xl font-bold">$24,500</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Orders</h3>
            <p className="text-3xl font-bold">1,250</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Customers</h3>
            <p className="text-3xl font-bold">860</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-gray-500">Products</h3>
            <p className="text-3xl font-bold">320</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>#10245</span>
                <span>Completed</span>
              </div>
              <div className="flex justify-between">
                <span>#10246</span>
                <span>Pending</span>
              </div>
              <div className="flex justify-between">
                <span>#10247</span>
                <span>Shipped</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-gray-100 rounded">Add Product</button>
              <button className="p-4 bg-gray-100 rounded">View Orders</button>
              <button className="p-4 bg-gray-100 rounded">Manage Users</button>
              <button className="p-4 bg-gray-100 rounded">Reports</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}