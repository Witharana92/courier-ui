import { getUserRole } from "../../utils/auth";

function ClientNavbar() {
  const role = getUserRole();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}
      <div className="text-lg font-semibold text-gray-800">
        🚚 SmartExpress
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Greeting */}
        <div className="text-sm text-gray-600">
          Welcome, <span className="font-medium text-gray-900">{role}</span> 👋
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold">
          {role?.charAt(0)}
        </div>

        {/* Logout */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default ClientNavbar;