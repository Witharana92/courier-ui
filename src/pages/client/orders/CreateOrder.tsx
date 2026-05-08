import { useState } from "react";
import SingleOrderForm from "./SingleOrderForm";
import BulkOrder from "./BulkOrder";

function CreateOrder() {
  const [tab, setTab] = useState<"single" | "bulk">("single");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Add New Order</h1>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTab("single")}
            className={`px-4 py-2 rounded-lg text-sm ${
              tab === "single"
                ? "bg-red-500 text-white"
                : "text-gray-600"
            }`}
          >
            Single Order
          </button>

          <button
            onClick={() => setTab("bulk")}
            className={`px-4 py-2 rounded-lg text-sm ${
              tab === "bulk"
                ? "bg-red-500 text-white"
                : "text-gray-600"
            }`}
          >
            Bulk Order
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {tab === "single" ? <SingleOrderForm /> : <BulkOrder />}
    </div>
  );
}

export default CreateOrder;