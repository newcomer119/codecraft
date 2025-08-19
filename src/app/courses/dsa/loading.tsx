export default function DSACourseLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel Skeleton */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Course Header Skeleton */}
          <div className="mb-8">
            <div className="h-4 bg-gray-700 rounded w-32 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-700 rounded w-64 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-80 animate-pulse" />
          </div>

          {/* Chapter Navigation Skeleton */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-700 rounded w-20 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 bg-gray-700 rounded w-32 mb-1 animate-pulse" />
                      <div className="h-3 bg-gray-700 rounded w-20 animate-pulse" />
                    </div>
                    <div className="h-3 bg-gray-700 rounded w-12 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Lesson Content Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="h-6 bg-gray-700 rounded w-48 mb-3 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4 animate-pulse" />
            
            <div className="mb-4">
              <div className="h-4 bg-gray-700 rounded w-40 mb-2 animate-pulse" />
              <div className="space-y-1">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-3 bg-gray-700 rounded w-full animate-pulse" />
                ))}
              </div>
            </div>

            {/* Assignment Section Skeleton */}
            <div className="bg-gray-700 rounded-lg p-3 mb-4">
              <div className="h-4 bg-gray-600 rounded w-24 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-600 rounded w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-600 rounded w-5/6 mb-3 animate-pulse" />
              <div className="bg-gray-600 rounded p-2">
                <div className="h-3 bg-gray-500 rounded w-64 mb-1 animate-pulse" />
                <div className="h-3 bg-gray-500 rounded w-48 animate-pulse" />
              </div>
            </div>

            {/* Tip Section Skeleton */}
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="h-4 bg-gray-600 rounded w-32 animate-pulse" />
            </div>
          </div>

          {/* AI Assistant Skeleton */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
              <div>
                <div className="h-4 bg-gray-700 rounded w-40 mb-1 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-24 animate-pulse" />
              </div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-full mb-3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-10 bg-gray-800 rounded-lg animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 bg-purple-600 rounded-lg w-16 animate-pulse" />
                <div className="h-8 bg-gray-700 rounded-lg w-20 animate-pulse" />
                <div className="h-8 bg-gray-700 rounded-lg w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="w-3/5 bg-gray-950">
        {/* Editor Header Skeleton */}
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-6 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-40 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* File Tabs Skeleton */}
        <div className="bg-gray-900 border-b border-gray-800 px-6">
          <div className="flex space-x-1">
            <div className="px-4 py-2 bg-blue-600 rounded-t-lg w-20" />
            <div className="px-4 py-2 bg-gray-800 rounded-t-lg w-24" />
          </div>
        </div>

        {/* Code Editor Skeleton */}
        <div className="flex-1 p-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 h-64">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3 mt-6">
            <div className="h-12 bg-blue-600 rounded-lg w-24 animate-pulse" />
            <div className="h-12 bg-green-600 rounded-lg w-20 animate-pulse" />
            <div className="h-12 bg-gray-700 rounded-lg w-24 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
