import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaTrophy,
  FaUsers,
  FaClipboardList,
  FaPlusCircle,
  FaTasks,
  FaUser,
  FaCrown,
  FaCheckCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  const userLinks = [
    {
      to: "/dashboard/my-participated",
      icon: <FaClipboardList />,
      label: "My Participated Contests",
    },
    {
      to: "/dashboard/my-winning",
      icon: <FaTrophy />,
      label: "My Winning Contests",
    },
    { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
  ];

  const creatorLinks = [
    {
      to: "/dashboard/add-contest",
      icon: <FaPlusCircle />,
      label: "Add Contest",
    },
    {
      to: "/dashboard/my-created-contests",
      icon: <FaClipboardList />,
      label: "My Created Contests",
    },
    {
      to: "/dashboard/contest-submissions",
      icon: <FaTasks />,
      label: "Contest Submissions",
    },
  ];

  const adminLinks = [
    { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
    {
      to: "/dashboard/manage-contests",
      icon: <FaCheckCircle />,
      label: "Manage Contests",
    },
  ];

  const renderLinks = (links) => {
    return links.map((link) => (
      <li key={link.to}>
        <NavLink
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-primary-content"
                : "hover:bg-base-300"
            }`
          }
        >
          {link.icon}
          <span className="hidden lg:inline">{link.label}</span>
        </NavLink>
      </li>
    ));
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar bg-base-200 lg:hidden sticky top-0 z-10">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-square"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <div className="flex-1 px-2">
            <Logo></Logo>
          </div>
          <ThemeToggle></ThemeToggle>
        </nav>
        <div className="p-4 lg:p-8 min-h-screen bg-base-100">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 lg:w-72 min-h-screen bg-base-200 flex flex-col">
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center justify-between">
              <Logo></Logo>
              <ThemeToggle></ThemeToggle>
            </div>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-primary-content"
                        : "hover:bg-base-300"
                    }`
                  }
                >
                  <MdDashboard />
                  <span className="hidden lg:inline">Dashboard</span>
                </NavLink>
              </li>

              <div className="divider text-xs opacity-50">USER</div>
              {renderLinks(userLinks)}

              {(role === "creator" || role === "admin") && (
                <>
                  <div className="divider text-xs opacity-50">CREATOR</div>
                  {renderLinks(creatorLinks)}
                </>
              )}

              {role === "admin" && (
                <>
                  <div className="divider text-xs">ADMIN</div>
                  {renderLinks(adminLinks)}
                </>
              )}
            </ul>
          </nav>
          <div className="p-4 border-t border-base-300">
            <Link to="/" className="btn btn-outline btn-sm w-full gap-2">
              <FaHome />
              <span className="hidden lg:inline">Back to Home</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
