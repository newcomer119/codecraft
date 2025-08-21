import NavigationHeader from "@/components/NavigationHeader";

export default function QuestionsLoading() {
  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen bg-gray-950">
      {/* Header Skeleton */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-64 animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-10 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-10 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
            <div className="flex-1 max-w-md">
              <div className="h-10 bg-gray-700 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Questions List Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          {/* Table Header Skeleton */}
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="col-span-4 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-gray-700 rounded animate-pulse" />
              <div className="col-span-1 h-4 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          {/* Questions Skeleton */}
          <div className="divide-y divide-gray-800">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse" />
                  </div>
                  <div className="col-span-4">
                    <div className="h-5 bg-gray-700 rounded w-32 mb-2 animate-pulse" />
                    <div className="flex items-center gap-4">
                      <div className="h-3 bg-gray-700 rounded w-16 animate-pulse" />
                      <div className="h-3 bg-gray-700 rounded w-20 animate-pulse" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="h-6 bg-gray-700 rounded w-16 animate-pulse" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                  </div>
                  <div className="col-span-2">
                    <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                  </div>
                  <div className="col-span-1">
                    <div className="h-8 bg-gray-700 rounded w-16 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
