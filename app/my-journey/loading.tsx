export default function MyJourneyLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Profile Header Skeleton */}
        <section className="flex justify-between gap-4 max-sm:flex-col items-center mb-8">
          <div className="flex gap-4 items-center">
            {/* Profile Image Skeleton */}
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 animate-pulse" />
            <div>
              {/* Name Skeleton */}
              <div className="h-9 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
              {/* Email Skeleton */}
              <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </section>

        {/* Stats Cards Skeleton - Match actual card styling */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* Emoji placeholder */}
                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
                {/* Number placeholder */}
                <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
              {/* Label placeholder */}
              <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </section>

        {/* Subscription Card Skeleton - Match gradient style */}
        <section className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg p-6 mb-8 shadow-md">
          <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <div className="flex-1">
              {/* "Current Plan" label */}
              <div className="h-3 w-24 bg-gray-400 rounded mb-2 animate-pulse opacity-60" />
              {/* Plan name */}
              <div className="h-7 w-32 bg-gray-400 rounded mb-3 animate-pulse" />
              {/* Sessions info */}
              <div className="h-4 w-72 bg-gray-400 rounded animate-pulse opacity-60" />
            </div>
          </div>
        </section>

        {/* Completed Passages Skeleton - Match accordion style */}
        <div className="bg-white rounded-lg border-2 border-gray-200 px-6 mb-6">
          <div className="py-4">
            <div className="h-8 w-72 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Recent Activity Skeleton - Match accordion style */}
        <div className="bg-white rounded-lg border-2 border-gray-200 px-6">
          <div className="py-4">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
