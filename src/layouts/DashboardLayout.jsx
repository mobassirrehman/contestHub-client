import { NavLink, Outlet, Link } from "react-router";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaTrophy,
  FaUser,
  FaPlusCircle,
  FaFolderOpen,
  FaUsers,
  FaCheckCircle,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Menu items based on role
  const userMenuItems = [
    {
      to: "/dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
      end: true,
    },
  ];

  const participantMenuItems = [
    {
      to: "/dashboard/my-participated",
      icon: FaClipboardList,
      label: "My Participated Contests",
    },
    {
      to: "/dashboard/my-winning",
      icon: FaTrophy,
      label: "My Winning Contests",
    },
    {
      to: "/dashboard/my-profile",
      icon: FaUser,
      label: "My Profile",
    },
  ];

  const creatorMenuItems = [
    {
      to: "/dashboard/add-contest",
      icon: FaPlusCircle,
      label: "Add Contest",
    },
    {
      to: "/dashboard/my-created-contests",
      icon: FaFolderOpen,
      label: "My Created Contests",
    },
  ];

  const adminMenuItems = [
    {
      to: "/dashboard/manage-users",
      icon: FaUsers,
      label: "Manage Users",
    },
    {
      to: "/dashboard/manage-contests",
      icon: FaCheckCircle,
      label: "Manage Contests",
    },
  ];

  const NavItem = ({ item }) => (
    <li>
      <NavLink
        to={item.to}
        end={item.end}
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-500 font-medium border-l-4 border-cyan-500"
              : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
          }`
        }
      >
        <item.icon className="text-lg flex-shrink-0" />
        <span className="truncate">{item.label}</span>
      </NavLink>
    </li>
  );

  const MenuSection = ({ title, items }) => (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-base-content/40 uppercase tracking-wider px-4 mb-2">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </ul>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-cyan-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-base-100 border-r border-base-200 flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-base-200 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="btn btn-ghost btn-sm btn-square lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* Dashboard Link */}
          <ul className="space-y-1 mb-6">
            {userMenuItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </ul>

          {/* User Section - Available to all */}
          <MenuSection title="User" items={participantMenuItems} />

          {/* Creator Section */}
          {(role === "creator" || role === "admin") && (
            <MenuSection title="Creator" items={creatorMenuItems} />
          )}

          {/* Admin Section */}
          {role === "admin" && (
            <MenuSection title="Admin" items={adminMenuItems} />
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-base-200">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base-content/70 hover:bg-base-200 hover:text-base-content transition-colors"
          >
            <FaHome className="text-lg" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-base-100 border-b border-base-200 px-4 py-3 flex items-center justify-between">
          <button
            className="btn btn-ghost btn-sm btn-square"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="text-xl" />
          </button>
          <Logo />
          <ThemeToggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
