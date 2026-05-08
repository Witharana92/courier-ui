import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

type Props = {
  items: MenuItem[];
};

function Sidebar({ items }: Props) {
  return (

    <div className="w-64 bg-white border-r border-gray-100 min-h-screen p-4">

      <h1 className="text-3xl font-bold mb-10">
        SmartExpress
      </h1>

      <div className="space-y-2">

        {items.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-500 transition"
          >

            <span>{item.icon}</span>

            <span>{item.label}</span>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;