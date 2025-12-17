import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaSearch,
  FaUserShield,
  FaUserEdit,
  FaUserTie,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SkeletonLoader from "../../../components/Skeletons/Skeletons";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: usersData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users", currentPage, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=${limit}&searchText=${searchText}`
      );
      return res.data;
    },
  });

  const { users = [], totalPages = 1, totalUsers = 0 } = usersData;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { icon: <FaUserShield />, class: "badge-error", text: "Admin" },
      creator: { icon: <FaUserTie />, class: "badge-primary", text: "Creator" },
      user: { icon: <FaUser />, class: "badge-success", text: "User" },
    };
    const badge = badges[role] || badges.user;
    return (
      <span className={`badge ${badge.class} gap-1`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const handleRoleChange = async (user, newRole) => {
    if (user.role === newRole) return;

    const result = await Swal.fire({
      title: "Change User Role?",
      html: `
                <div class="text-left">
                    <p class="mb-2">Change role for:</p>
                    <p class="font-bold">${user.displayName}</p>
                    <p class="text-gray-500 text-sm">${user.email}</p>
                    <div class="mt-4 flex items-center justify-center gap-2">
                        <span class="badge badge-ghost">${user.role}</span>
                        <span>→</span>
                        <span class="badge badge-primary">${newRole}</span>
                    </div>
                </div>
            `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Change Role",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${user._id}/role`, { role: newRole });

        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: `${user.displayName} is now a ${newRole}.`,
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      } catch (error) {
        console.error("Role change error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not change user role.",
        });
      }
    }
  };

  const handleDelete = async (user) => {
    if (user.role === "role") {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "You cannot delete your own account!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${
        user.displayName || user.email
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${user._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not delete the user.",
        });
      }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <FaUsers className="text-cyan-500" />
          Manage Users
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage all registered users
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg">
            <FaUsers className="text-2xl text-cyan-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name or email..."
              className="grow bg-transparent outline-none"
            />
          </label>
          <button type="submit" className="btn btn-gradient-primary">
            Search
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-base-200 rounded-xl overflow-hidden"
      >
        {isLoading ? (
          <div className="p-6">
            <SkeletonLoader type="table" count={5} />
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-base-300">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover">
                      <td className="font-medium">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                              <img
                                src={
                                  user.photoURL ||
                                  "https://i.ibb.co.com/mC3FBP9V/user-placeholder.jpg"
                                }
                                alt={user.displayName}
                              />
                            </div>
                          </div>
                          <div className="font-medium">{user.displayName}</div>
                        </div>
                      </td>
                      <td className="text-gray-500">{user.email}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td className="text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="dropdown dropdown-end">
                            <label
                              tabIndex={0}
                              className="btn btn-sm btn-ghost"
                            >
                              <FaUserEdit />
                              Change Role
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-40"
                            >
                              <li>
                                <button
                                  onClick={() => handleRoleChange(user, "user")}
                                  className={
                                    user.role === "user" ? "active" : ""
                                  }
                                >
                                  <FaUser /> User
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user, "creator")
                                  }
                                  className={
                                    user.role === "creator" ? "active" : ""
                                  }
                                >
                                  <FaUserTie /> Creator
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleRoleChange(user, "admin")
                                  }
                                  className={
                                    user.role === "admin" ? "active" : ""
                                  }
                                >
                                  <FaUserShield /> Admin
                                </button>
                              </li>
                            </ul>
                          </div>

                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(user)}
                              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10"
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t border-base-300">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`btn btn-sm ${
                      currentPage === i + 1
                        ? "btn btn-gradient-primary"
                        : "btn-ghost"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-ghost"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 flex items-center justify-center">
              <FaUsers></FaUsers>{" "}
            </div>
            <h3 className="text-xl font-semibold mb-2">No Users Found</h3>
            <p className="text-gray-500">
              {searchText
                ? "Try a different search term."
                : "No users registered yet."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageUsers;
