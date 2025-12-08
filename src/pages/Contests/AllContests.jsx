import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPaintBrush,
  FaPen,
  FaGamepad,
  FaBullhorn,
  FaCode,
  FaCamera,
  FaLayerGroup,
  FaFilter,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard/ContestCard";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const AllContests = () => {
  const axiosPublic = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "all";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState(initialType);

  const categories = [
    { id: "all", name: "All Categories", icon: <FaLayerGroup /> },
    { id: "image-design", name: "Image Design", icon: <FaPaintBrush /> },
    { id: "article-writing", name: "Article Writing", icon: <FaPen /> },
    { id: "gaming-review", name: "Gaming Review", icon: <FaGamepad /> },
    {
      id: "marketing-strategy",
      name: "Marketing Strategy",
      icon: <FaBullhorn />,
    },
    { id: "web-development", name: "Web Development", icon: <FaCode /> },
    { id: "photography", name: "Photography", icon: <FaCamera /> },
  ];

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contests", activeTab, searchQuery],
    queryFn: async () => {
      let url = "/contests?";
      if (activeTab !== "all") {
        url += `type=${activeTab}&`;
      }
      if (searchQuery) {
        url += `search=${searchQuery}`;
      }
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("type", activeTab);
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params);
  }, [activeTab, searchQuery, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-900 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Explore Contests
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Discover and participate in exciting contests across various
              categories. Find the perfect competition for your skills.
            </p>

            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contests by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-24 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-gray-500" />
            <span className="text-sm font-medium text-gray-500">
              Filter by Category
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-base-200 text-gray-600 hover:bg-base-300"
                }`}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-gray-500">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                Loading contests...
              </span>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {contests.length}
                </span>{" "}
                contests
                {activeTab !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-cyan-600 capitalize">
                      {activeTab.replace("-", " ")}
                    </span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}
                    for "<span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </>
            )}
          </p>

          {(activeTab !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </motion.div>

        {isLoading ? (
          <SkeletonLoader type="cards" count={6} />
        ) : contests.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {contests.map((contest, index) => (
              <ContestCard key={contest._id} contest={contest} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-base-200 rounded-2xl"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No Contests Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchQuery
                ? `No contests match your search "${searchQuery}". Try different keywords.`
                : `No contests available in this category yet. Check back later!`}
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
            >
              Browse All Contests
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllContests;
