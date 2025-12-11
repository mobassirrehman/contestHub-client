import { Link, NavLink } from "react-router";
import Logo from "../../components/Logo/Logo";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/all-contests", label: "All Contests" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/faq", label: "FAQ" },
    { to: "/become-creator", label: "Become Creator" },
  ];

  const navLinks = links.map((link) => (
    <li key={link.to}>
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
    <nav className="navbar bg-base-100 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-base-200">
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
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
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
              <div className="w-10 rounded-full transition-all">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/MgsTCcv/user-placeholder.jpg"
                  }
                  alt={user.displayName}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-1 p-3 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-200"
            >
              <li className="px-3 py-3 border-b border-base-200 mb-2">
                <div className="flex items-center gap-3 hover:bg-transparent cursor-default">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={
                          user.photoURL ||
                          "https://i.ibb.co/MgsTCcv/user-placeholder.jpg"
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base-content">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-xs text-base-content/60">
                      {user.email}
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-lg hover:bg-gray-500/10 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-profile"
                  className="flex items-center gap-2 rounded-lg hover:bg-gray-500/10 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </Link>
              </li>
              <li className="mt-2 pt-2 border-t border-base-200">
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 rounded-lg text-red-500 hover:bg-red-500/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
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
