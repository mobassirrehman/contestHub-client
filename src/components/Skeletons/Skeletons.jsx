// Skeleton components for loading states

// Contest Card Skeleton
export const ContestCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-200 h-full animate-pulse">
      {/* Image Skeleton */}
      <figure className="h-48 bg-base-300"></figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Title */}
        <div className="h-6 bg-base-300 rounded w-3/4"></div>

        {/* Description */}
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-base-300"></div>
            <div className="w-7 h-7 rounded-full bg-base-300 -ml-2"></div>
            <div className="h-4 bg-base-300 rounded w-12"></div>
          </div>
          <div className="h-5 bg-base-300 rounded w-16"></div>
        </div>

        {/* Button */}
        <div className="h-12 bg-base-300 rounded-lg mt-4"></div>
      </div>
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <tr className="animate-pulse">
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="py-4">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </td>
      ))}
    </tr>
  );
};

// Profile Card Skeleton
export const ProfileCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-100 rounded-xl animate-pulse">
      <div className="w-16 h-16 rounded-full bg-base-300"></div>
      <div className="flex-1">
        <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-24"></div>
      </div>
    </div>
  );
};

// Leaderboard Row Skeleton
export const LeaderboardRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-base-100 rounded-xl animate-pulse">
      <div className="w-8 h-8 rounded-full bg-base-300"></div>
      <div className="w-12 h-12 rounded-full bg-base-300"></div>
      <div className="flex-1">
        <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-20"></div>
      </div>
      <div className="h-6 bg-base-300 rounded w-16"></div>
    </div>
  );
};

// Stats Card Skeleton
export const StatsCardSkeleton = () => {
  return (
    <div className="p-6 bg-base-100 rounded-2xl animate-pulse">
      <div className="w-14 h-14 rounded-xl bg-base-300 mb-4"></div>
      <div className="h-8 bg-base-300 rounded w-20 mb-2"></div>
      <div className="h-4 bg-base-300 rounded w-24"></div>
    </div>
  );
};

// Contest Details Skeleton
export const ContestDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 bg-base-300 rounded w-48 mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="h-72 md:h-96 bg-base-300 rounded-2xl"></div>

          {/* Title & Description */}
          <div>
            <div className="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>

          {/* Task Instructions */}
          <div className="p-6 bg-base-200 rounded-xl">
            <div className="h-6 bg-base-300 rounded w-40 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Countdown Card */}
          <div className="p-6 bg-base-200 rounded-2xl">
            <div className="h-5 bg-base-300 rounded w-32 mb-4"></div>
            <div className="flex justify-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-base-300 rounded-lg mb-2"></div>
                  <div className="h-3 bg-base-300 rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Prize Card */}
          <div className="p-6 bg-base-200 rounded-2xl">
            <div className="h-5 bg-base-300 rounded w-24 mb-4"></div>
            <div className="h-10 bg-base-300 rounded w-32"></div>
          </div>

          {/* Action Button */}
          <div className="h-14 bg-base-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default {
  ContestCardSkeleton,
  TableRowSkeleton,
  ProfileCardSkeleton,
  LeaderboardRowSkeleton,
  StatsCardSkeleton,
  ContestDetailsSkeleton,
};
