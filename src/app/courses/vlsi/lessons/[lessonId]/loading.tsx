export default function VLSILessonLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel - Problem Description Skeleton */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Lesson Header Skeleton */}
          <div className="mb-6">
            <div className="w-32 h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="w-64 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="w-80 h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="w-20 h-5 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Problem Statement Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="w-24 h-5 bg-gray-700 rounded mb-3 animate-pulse"></div>
            <div className="space-y-2 mb-4">
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Examples Skeleton */}
            <div className="mb-4">
              <div className="w-20 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-gray-700 rounded p-2">
                    <div className="w-24 h-3 bg-gray-600 rounded mb-1 animate-pulse"></div>
                    <div className="w-20 h-3 bg-gray-600 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints Skeleton */}
            <div className="mb-4">
              <div className="w-24 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="space-y-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-1 animate-pulse"></div>
                    <div className="w-48 h-3 bg-gray-600 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hints Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="w-20 h-5 bg-gray-700 rounded mb-3 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-gray-600 rounded animate-pulse"></div>
                  <div className="w-56 h-3 bg-gray-600 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div className="flex items-center justify-between">
            <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor & Tests Skeleton */}
      <div className="w-3/5 bg-gray-950">
        <div className="p-6">
          {/* Code Editor Skeleton */}
          <div className="mb-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              {/* File Tabs Skeleton */}
              <div className="flex space-x-1 px-6 bg-gray-900 border-b border-gray-800">
                {['main.v', 'test.v', 'solution.v'].map((tab, i) => (
                  <div key={i} className="px-4 py-2 text-sm font-medium rounded-t-lg bg-gray-800 w-20 h-8 animate-pulse"></div>
                ))}
              </div>

              {/* Code Editor Area Skeleton */}
              <div className="h-64 bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">Loading Verilog Editor...</div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-3">
                  <div className="w-32 h-10 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-32 h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Runner Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-40 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-32 h-8 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Test Cases Preview Skeleton */}
            <div className="mb-4">
              <div className="w-24 h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-sm">
                    <div className="w-48 h-3 bg-gray-700 rounded mb-1 animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-700 rounded ml-4 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
