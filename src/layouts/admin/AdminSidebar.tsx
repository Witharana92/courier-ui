import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {

  const location = useLocation();

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow"
      : "text-gray-700 hover:bg-red-50 hover:text-red-500";

  return (

    <div className="w-72 min-h-screen bg-white border-r border-gray-200 p-4 overflow-y-auto shadow-sm">

      {/* LOGO */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          SmartExpress
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Admin Panel
        </p>

      </div>

      {/* DASHBOARD */}
      <Link
        to="/admin/dashboard"
        className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition ${isActive("/admin/dashboard")}`}
      >

        <span>🏠</span>

        <span className="font-medium">
          Dashboard
        </span>

      </Link>

      {/* ALL ORDERS */}
      <Link
        to="/admin/all-orders"
        className={`flex items-center gap-3 p-3 rounded-xl mb-1 transition ${isActive("/admin/all-orders")}`}
      >

        <span>📦</span>

        <span>
          All Orders
        </span>

      </Link>

      {/* ORDERS */}
      <Section
        title="Orders"
        icon="📋"
        open={openSection === "orders"}
        onClick={() => toggle("orders")}
      >

        <MenuLink
          to="/admin/branch-orders"
          label="Branch Orders"
          active={isActive("/admin/branch-orders")}
        />

      </Section>

      {/* BARCODE */}
      <Link
        to="/admin/barcode"
        className={`flex items-center gap-3 p-3 rounded-xl mb-1 transition ${isActive("/admin/barcode")}`}
      >

        <span>🏷️</span>

        <span>
          Barcode Print
        </span>

      </Link>

      {/* PICKUP */}
      <Section
        title="Pickup Operation"
        icon="🚚"
        open={openSection === "pickup"}
        onClick={() => toggle("pickup")}
      >

        <MenuLink
          to="/admin/pickup-merchant"
          label="Pickup from Merchant"
          active={isActive("/admin/pickup-merchant")}
        />

        <MenuLink
          to="/admin/pickup-branch"
          label="Received at Pickup Branch"
          active={isActive("/admin/pickup-branch")}
        />

        <MenuLink
          to="/admin/pickup-shuttle"
          label="Received at Shuttle"
          active={isActive("/admin/pickup-shuttle")}
        />

      </Section>

      {/* BRANCH OPS */}
      <Section
        title="Branch Operations"
        icon="🏢"
        open={openSection === "branch"}
        onClick={() => toggle("branch")}
      >

        <MenuLink to="/admin/collect" label="Collect Orders" />
        <MenuLink to="/admin/assign" label="Assign Orders" />
        <MenuLink to="/admin/reassign" label="Re-Assign Rider" />
        <MenuLink to="/admin/delivery" label="Confirm Delivery" />
        <MenuLink to="/admin/partial" label="Partial Delivery" />
        <MenuLink to="/admin/clearance" label="Order Clearance" />
        <MenuLink to="/admin/reschedule" label="Reschedule Orders" />

      </Section>

      {/* PICKUP REQUEST */}
      <Section
        title="Pickup Request"
        icon="📥"
        open={openSection === "pickupReq"}
        onClick={() => toggle("pickupReq")}
      >

        <MenuLink to="/admin/pickup-dashboard" label="Pickup Dashboard" />
        <MenuLink to="/admin/all-pickups" label="All Pickup Requests" />
        <MenuLink to="/admin/change-pickup" label="Change Pickup Status" />

      </Section>

      {/* REPORTS */}
      <Section
        title="Reports"
        icon="📊"
        open={openSection === "reports"}
        onClick={() => toggle("reports")}
      >

        <MenuLink to="/admin/admin-reports" label="Administrative Reports" />
        <MenuLink to="/admin/status-report" label="Status Count Report" />

      </Section>

      {/* MANIFEST */}
      <Section
        title="Manifest"
        icon="🧾"
        open={openSection === "manifest"}
        onClick={() => toggle("manifest")}
      >

        <MenuLink to="/admin/branch-manifest" label="Branch Manifest" />
        <MenuLink to="/admin/rider-manifest" label="Rider Manifest" />
        <MenuLink to="/admin/return-ho" label="Return to HO" />

      </Section>

      {/* FOOTER */}
      <div className="mt-8 border-t border-gray-200 pt-4 space-y-1">

        <Link
          to="/admin/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
        >

          <span>👤</span>
          <span>My Profile</span>

        </Link>

        <Link
          to="/admin/cities"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
        >

          <span>🏙️</span>
          <span>Cities</span>

        </Link>

        <Link
          to="/admin/notify"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
        >

          <span>🔔</span>
          <span>Notify</span>

        </Link>

      </div>

    </div>
  );
}

/* SECTION */
function Section({ title, icon, children, open, onClick }: any) {

  return (

    <div className="mb-1">

      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
      >

        <div className="flex items-center gap-3">

          <span>{icon}</span>

          <span>{title}</span>

        </div>

        <span className="text-sm">
          {open ? "▾" : "▸"}
        </span>

      </button>

      {open && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-red-100 pl-3">
          {children}
        </div>
      )}

    </div>
  );
}

/* SUB MENU */
function MenuLink({ to, label, active }: any) {

  return (

    <Link
      to={to}
      className={`block p-2 rounded-lg text-sm transition ${active || "text-gray-600 hover:bg-red-50 hover:text-red-500"
        }`}
    >

      {label}

    </Link>
  );
}

export default AdminSidebar;