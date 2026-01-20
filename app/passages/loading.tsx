export default function PassagesLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="flex justify-between items-start mb-8 max-sm:flex-col max-sm:gap-4">
          <div className="flex flex-col gap-4">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-96 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-4 mb-6 max-sm:flex-col">
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Passages Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="h-6 w-20 bg-gray-200 rounded-full mb-4 animate-pulse" />
              <div className="h-7 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
