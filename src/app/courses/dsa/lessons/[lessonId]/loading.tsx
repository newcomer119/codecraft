export default function LessonLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel Skeleton */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Lesson Header Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-700 rounded w-32 mb-4 animate-pulse" />
            <div className="h-8 bg-gray-700 rounded w-64 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-80 mb-4 animate-pulse" />
            <div className="h-6 bg-gray-700 rounded w-24 animate-pulse" />
          </div>

          {/* Problem Statement Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="h-6 bg-gray-700 rounded w-32 mb-3 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4 animate-pulse" />
            
            <div className="mb-4">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-16 bg-gray-700 rounded animate-pulse" />
                <div className="h-16 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>

            <div className="mb-4">
              <div className="h-4 bg-gray-700 rounded w-28 mb-2 animate-pulse" />
              <div className="space-y-1">
                <div className="h-3 bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-4/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Hints Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="h-6 bg-gray-700 rounded w-20 mb-3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-5/6 animate-pulse" />
              <div className="h-3 bg-gray-700 rounded w-4/5 animate-pulse" />
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-10 bg-gray-700 rounded-lg w-24 animate-pulse" />
            <div className="h-10 bg-gray-700 rounded-lg w-24 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="w-3/5 bg-gray-950">
        <div className="p-6">
          {/* Code Editor Skeleton */}
          <div className="mb-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <div className="flex space-x-1 px-6 bg-gray-900 border-b border-gray-800">
                <div className="px-4 py-2 bg-blue-600 rounded-t-lg w-20" />
                <div className="px-4 py-2 bg-gray-800 rounded-t-lg w-24" />
                <div className="px-4 py-2 bg-gray-800 rounded-t-lg w-28" />
              </div>
              <div className="h-64 bg-gray-900 p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
                  <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
                </div>
              </div>
              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-3">
                  <div className="h-12 bg-green-600 rounded-lg w-24 animate-pulse" />
                  <div className="h-12 bg-blue-600 rounded-lg w-32 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Test Runner Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-10 bg-green-600 rounded-lg w-24 animate-pulse" />
            </div>
            <div className="mb-4">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse" />
              <div className="space-y-2">
                <div className="h-8 bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
