import NavigationHeader from "@/components/NavigationHeader";

export default function QuestionLoading() {
  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel Skeleton */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Problem Header Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 bg-gray-700 rounded w-20 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
            <div className="h-8 bg-gray-700 rounded w-64 mb-2 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex border-b border-gray-800 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded w-24 mx-2 animate-pulse" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-6 bg-gray-700 rounded w-32 mb-3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="h-6 bg-gray-700 rounded w-24 mb-3 animate-pulse" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg p-4">
                    <div className="h-4 bg-gray-700 rounded w-20 mb-2 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
                      <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
                      <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="h-6 bg-gray-700 rounded w-28 mb-3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="w-3/5 bg-gray-950">
        <div className="p-6">
          {/* Language Selector and Actions Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-10 bg-gray-700 rounded w-20 animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-10 bg-gray-700 rounded w-24 animate-pulse" />
            </div>
          </div>

          {/* Code Editor Skeleton */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mb-6">
            <div className="h-96 bg-gray-900 p-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-16 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-40 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-28 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-36 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Test Results Skeleton */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
            </div>
            <div className="text-center py-8">
              <div className="h-4 bg-gray-700 rounded w-48 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
