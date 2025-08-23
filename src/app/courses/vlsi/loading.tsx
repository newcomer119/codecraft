export default function VLSICourseLoading() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-32 h-4 bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-8 bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-2xl h-6 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Overview Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="w-32 h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-lg">
                <div className="w-32 h-4 bg-indigo-700 rounded mb-2 animate-pulse"></div>
                <div className="space-y-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-3 bg-indigo-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Lessons List Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="w-40 h-6 bg-gray-700 rounded mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
                          <div>
                            <div className="w-48 h-5 bg-gray-700 rounded mb-2 animate-pulse"></div>
                            <div className="w-64 h-4 bg-gray-700 rounded animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Progress Skeleton */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-32 h-5 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div className="h-2 bg-indigo-500 rounded-full w-0"></div>
                </div>
                <div className="w-64 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Navigation Skeleton */}
        <div className="mt-12">
          <div className="w-48 h-7 bg-gray-700 rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-lg border border-gray-800 p-4"
              >
                <div className="w-32 h-5 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-700 rounded mb-3 animate-pulse"></div>
                <div className="flex items-center justify-between">
                  <div className="w-24 h-3 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
