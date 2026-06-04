import { useEffect, useState } from "react";
import api from "../../services/api";

interface WaybillRequest {
  id: number;
  clientId: number;
  noOfWaybills: number;
  status: string;
  requestedDate: string;
  fromBarcode?: string;
  toBarcode?: string;
}

interface Waybill {
  id: number;
  barcode: string;
  clientId: number;
  waybillRequestId: number;
}

function WaybillManagement() {
  const [requests, setRequests] = useState<WaybillRequest[]>([]);
  const [waybills, setWaybills] = useState<Waybill[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const requestsResponse =
        await api.get("/waybill/requests");

      setRequests(requestsResponse.data);

      try {
        const waybillsResponse =
          await api.get("/waybill/all");

        setWaybills(waybillsResponse.data);
      } catch {
        setWaybills([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

const approveRequest = async (id: number) => {
  try {
    const response = await api.post(`/waybill/approve/${id}`);

    console.log("SUCCESS:", response.data);

    alert("Waybills generated successfully");

    loadData();
  } catch (error: any) {
    console.log("FULL ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);

    alert(JSON.stringify(error.response?.data, null, 2));
  }
};

  const pendingCount =
    requests.filter(
      x => x.status === "Pending"
    ).length;

  const completedCount =
    requests.filter(
      x => x.status === "Done"
    ).length;

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Waybill Management 🏷️
      </h1>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white shadow rounded-2xl p-5">
          <p className="text-gray-500">
            Pending Requests
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <p className="text-gray-500">
            Approved Requests
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {completedCount}
          </h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <p className="text-gray-500">
            Total Requests
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {requests.length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-5">
          <p className="text-gray-500">
            Generated Barcodes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {waybills.length}
          </h2>
        </div>

      </div>

      {/* Pending Requests */}

      <div className="bg-white shadow rounded-2xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Client Requests
        </h2>

        {loading ? (

          <div className="py-10 text-center">
            Loading...
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">
                    ID
                  </th>

                  <th className="text-left p-3">
                    Qty
                  </th>

                  <th className="text-left p-3">
                    Requested Date
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>

                  <th className="text-left p-3">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {requests.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center py-6"
                    >
                      No requests found
                    </td>

                  </tr>

                ) : (

                  requests.map(r => (

                    <tr
                      key={r.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {r.id}
                      </td>

                      <td className="p-3">
                        {r.noOfWaybills}
                      </td>

                      <td className="p-3">
                        {
                          new Date(
                            r.requestedDate
                          ).toLocaleString()
                        }
                      </td>

                      <td className="p-3">

                        {r.status ===
                        "Pending" ? (

                          <span
                            className="
                            bg-orange-100
                            text-orange-600
                            px-3
                            py-1
                            rounded-full
                            text-sm"
                          >
                            Pending
                          </span>

                        ) : (

                          <span
                            className="
                            bg-green-100
                            text-green-600
                            px-3
                            py-1
                            rounded-full
                            text-sm"
                          >
                            Done
                          </span>

                        )}

                      </td>

                      <td className="p-3">

                        {r.status ===
                          "Pending" && (

                          <button
                            onClick={() =>
                              approveRequest(
                                r.id
                              )
                            }
                            className="
                            bg-green-500
                            hover:bg-green-600
                            text-white
                            px-4
                            py-2
                            rounded-lg"
                          >
                            Approve
                          </button>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* Generated Ranges */}

      <div className="bg-white shadow rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Generated Barcode Ranges
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Request ID
                </th>

                <th className="text-left p-3">
                  From Barcode
                </th>

                <th className="text-left p-3">
                  To Barcode
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {requests
                .filter(
                  x =>
                    x.status === "Done"
                )
                .map(r => (

                  <tr
                    key={r.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {r.id}
                    </td>

                    <td className="p-3">
                      {r.fromBarcode}
                    </td>

                    <td className="p-3">
                      {r.toBarcode}
                    </td>

                    <td className="p-3">

                      <span
                        className="
                        bg-green-100
                        text-green-600
                        px-3
                        py-1
                        rounded-full
                        text-sm"
                      >
                        Done
                      </span>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default WaybillManagement;