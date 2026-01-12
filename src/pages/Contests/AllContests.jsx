import { useState, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router";
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
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../components/ContestCard/ContestCard";
import SkeletonLoader from "../../components/Skeletons/Skeletons";

const AllContests = () => {
  const axiosPublic = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "all";
  const initialSort = searchParams.get("sort") || "newest";
  const initialPriceRange = searchParams.get("price") || "all";

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState(initialType);
  const [sortBy, setSortBy] = useState(initialSort);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 8;

  useEffect(() => {
    const typeFromUrl = searchParams.get("type") || "all";
    const searchFromUrl = searchParams.get("search") || "";
    const sortFromUrl = searchParams.get("sort") || "newest";
    const priceFromUrl = searchParams.get("price") || "all";

    setActiveTab(typeFromUrl);
    setSearchQuery(searchFromUrl);
    setSortBy(sortFromUrl);
    setPriceRange(priceFromUrl);
    setCurrentPage(1);
  }, [location.search]);
  // Categories
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

  // Price ranges for filtering
  const priceRanges = [
    { id: "all", label: "All Prizes" },
    { id: "0-1000", label: "Under $1,000" },
    { id: "1000-5000", label: "$1,000 - $5,000" },
    { id: "5000-10000", label: "$5,000 - $10,000" },
    { id: "10000+", label: "$10,000+" },
  ];

  // Sort options
  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "prize-high", label: "Prize: High to Low" },
    { id: "prize-low", label: "Prize: Low to High" },
    { id: "deadline", label: "Ending Soon" },
    { id: "popular", label: "Most Participants" },
  ];

  // Fetch contests
  const {
    data: allContests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/contests");
      return res.data;
    },
  });

  // Filter and sort contests
  const filteredContests = useMemo(() => {
    let result = [...allContests];

    // Filter by category
    if (activeTab !== "all") {
      result = result.filter((contest) => contest.type === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (contest) =>
          contest.name?.toLowerCase().includes(query) ||
          contest.description?.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      if (priceRange === "0-1000") {
        result = result.filter((c) => c.prizeMoney < 1000);
      } else if (priceRange === "1000-5000") {
        result = result.filter(
          (c) => c.prizeMoney >= 1000 && c.prizeMoney < 5000
        );
      } else if (priceRange === "5000-10000") {
        result = result.filter(
          (c) => c.prizeMoney >= 5000 && c.prizeMoney < 10000
        );
      } else if (priceRange === "10000+") {
        result = result.filter((c) => c.prizeMoney >= 10000);
      }
    }

    // Sort contests
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "prize-high":
        result.sort((a, b) => (b.prizeMoney || 0) - (a.prizeMoney || 0));
        break;
      case "prize-low":
        result.sort((a, b) => (a.prizeMoney || 0) - (b.prizeMoney || 0));
        break;
      case "deadline":
        result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "popular":
        result.sort(
          (a, b) => (b.participantsCount || 0) - (a.participantsCount || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [allContests, activeTab, searchQuery, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredContests.length / contestsPerPage);
  const paginatedContests = filteredContests.slice(
    (currentPage - 1) * contestsPerPage,
    currentPage * contestsPerPage
  );

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("type", activeTab);
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (priceRange !== "all") params.set("price", priceRange);
    setSearchParams(params);
  }, [activeTab, searchQuery, sortBy, priceRange, setSearchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, priceRange, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const clearFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortBy("newest");
    setPriceRange("all");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    activeTab !== "all" ||
    searchQuery ||
    sortBy !== "newest" ||
    priceRange !== "all";

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 py-12 lg:py-16">
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

            {/* Search Bar */}
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg transition-all hover:opacity-90"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-6"
        >
          {/* Category Tabs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-base-content/60" />
              <span className="text-sm font-medium text-base-content/60">
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
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-base-200 text-base-content/70 hover:bg-base-300"
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range & Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Price Range Filter */}
            <div className="flex-1">
              <label className="text-sm font-medium text-base-content/60 mb-2 block">
                Prize Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-base-200"
              >
                {priceRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex-1">
              <label className="text-sm font-medium text-base-content/60 mb-2 flex items-center gap-2">
                <FaSortAmountDown />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full rounded-xl bg-base-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-base-content/60">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                Loading contests...
              </span>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-base-content">
                  {paginatedContests.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-base-content">
                  {filteredContests.length}
                </span>{" "}
                contests
                {activeTab !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-cyan-500 capitalize">
                      {activeTab.replace("-", " ")}
                    </span>
                  </span>
                )}
              </>
            )}
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Clear All Filters
            </button>
          )}
        </motion.div>

        {/* Contest Grid - 4 columns on xl */}
        {isLoading ? (
          <SkeletonLoader type="cards" count={8} />
        ) : paginatedContests.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {paginatedContests.map((contest, index) => (
                <ContestCard
                  key={contest._id}
                  contest={contest}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-circle btn-sm bg-base-200 border-none disabled:opacity-50"
                >
                  <FaChevronLeft />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first, last, current, and adjacent pages
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;

                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-base-content/40">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`btn btn-sm min-w-[40px] ${
                              currentPage === page
                                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-none"
                                : "bg-base-200 border-none hover:bg-base-300"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-circle btn-sm bg-base-200 border-none disabled:opacity-50"
                >
                  <FaChevronRight />
                </button>

                {/* Page Info */}
                <span className="text-sm text-base-content/60 ml-4">
                  Page {currentPage} of {totalPages}
                </span>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-base-200 rounded-2xl"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No Contests Found</h3>
            <p className="text-base-content/60 mb-6 max-w-md mx-auto">
              {searchQuery
                ? `No contests match your search "${searchQuery}". Try different keywords.`
                : `No contests available with the selected filters. Try adjusting your criteria.`}
            </p>
            <button
              onClick={clearFilters}
              className="btn bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-none"
            >
              Clear Filters & Browse All
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllContests;
