import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import useAuth from "../../hooks/useAuth";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // Public links - visible to all
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/all-contests", label: "All Contests" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
  ];

  // Additional link for logged-in users
  const authLinks = [
    { to: "/", label: "Home" },
    { to: "/all-contests", label: "All Contests" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/about", label: "About" },
    { to: "/become-creator", label: "Become Creator" },
    { to: "/faq", label: "FAQ" },
  ];

  const links = user ? authLinks : publicLinks;

  const navLinks = links.map((link) => (
    <li key={link.to + link.label}>
      <NavLink
        to={link.to}
        className={({ isActive }) =>
          `nav-link ${isActive ? "nav-link-active" : ""}`
        }
      >
        {link.label}
      </NavLink>
    </li>
  ));

  return (
    <nav className="navbar bg-base-100/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-base-200/50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-4 rounded-2xl w-56 nav-dropdown"
          >
            {navLinks}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-10 rounded-full ring-2 ring-cyan-500/30 hover:ring-cyan-500/60 transition-all">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${user.displayName}&background=06b6d4&color=fff`
                  }
                  alt={user.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-50 p-4 rounded-2xl w-64 profile-dropdown"
            >
              {/* User Info Header */}
              <li className="px-3 py-3 border-b border-base-200 mb-2">
                <div className="flex items-center gap-3 hover:bg-transparent cursor-default">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-cyan-500/50">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${user.displayName}&background=06b6d4&color=fff`
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base-content">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-xs text-base-content/60 truncate max-w-[140px]">
                      {user.email}
                    </span>
                  </div>
                </div>
              </li>

              {/* Dashboard Link */}
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-xl hover:bg-base-200 py-2.5"
                >
                  <FaTachometerAlt className="text-cyan-500" />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* Profile Link */}
              <li>
                <Link
                  to="/dashboard/my-profile"
                  className="flex items-center gap-3 rounded-xl hover:bg-base-200 py-2.5"
                >
                  <FaUser className="text-purple-500" />
                  <span>My Profile</span>
                </Link>
              </li>

              {/* Logout Button */}
              <li className="mt-2 pt-2 border-t border-base-200">
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-3 rounded-xl text-red-500 hover:bg-red-500/10 py-2.5 w-full"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-md btn-gradient-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
