export default function ReadingSessionLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Bar Skeleton */}
      <div className="flex items-center justify-between w-full px-14 py-4 bg-white border-b border-gray-200 max-sm:px-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Passage Content Skeleton */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-6 animate-pulse" />

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6" />

          {/* Paragraph Skeletons */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-6" />

          {/* Checkbox & Button Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
