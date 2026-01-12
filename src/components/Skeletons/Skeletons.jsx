const SkeletonLoader = ({ type = "cards", count = 6 }) => {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-lg border border-base-200 animate-pulse"
          >
            <figure className="h-48 bg-base-300"></figure>
            <div className="card-body p-5">
              <div className="h-6 bg-base-300 rounded w-3/4"></div>
              <div className="space-y-2 mt-2">
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-4 bg-base-300 rounded w-2/3"></div>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-base-200">
                <div className="h-4 bg-base-300 rounded w-20"></div>
                <div className="h-5 bg-base-300 rounded w-16"></div>
              </div>
              <div className="h-12 bg-base-300 rounded-lg mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-base-300 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="animate-pulse">
        <div className="h-64 md:h-96 bg-base-300 rounded-2xl mb-6"></div>
        <div className="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white/10 rounded-2xl animate-pulse">
            <div className="w-14 h-14 bg-base-300 rounded-xl mb-4 mx-auto"></div>
            <div className="h-8 bg-base-300 rounded w-20 mx-auto mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-24 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
