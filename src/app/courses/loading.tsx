import { Code2, Brain, Database, Network, Lock, Zap } from "lucide-react";

export default function CoursesLoading() {
  const courses = [
    { icon: Brain, color: "from-blue-500 to-purple-600" },
    { icon: Code2, color: "from-green-500 to-emerald-600" },
    { icon: Database, color: "from-orange-500 to-red-600" },
    { icon: Network, color: "from-purple-500 to-pink-600" },
    { icon: Lock, color: "from-red-500 to-pink-600" },
    { icon: Zap, color: "from-yellow-500 to-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="h-10 bg-gray-700 rounded-lg w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-700 rounded-lg w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Courses Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden animate-pulse"
            >
              {/* Course Icon Skeleton */}
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-lg bg-gradient-to-br ${course.color} 
                flex items-center justify-center shadow-lg`}
              >
                <course.icon className="w-6 h-6 text-white" />
              </div>

              {/* Course Content Skeleton */}
              <div className="p-6 pt-16">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-4" />

                {/* Course Stats Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-gray-700 rounded w-20" />
                  <div className="h-4 bg-gray-700 rounded w-24" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-700 rounded w-16" />
                  <div className="h-6 bg-gray-700 rounded w-20" />
                  <div className="h-6 bg-gray-700 rounded w-14" />
                </div>

                {/* Progress Bar Skeleton */}
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section Skeleton */}
        <div className="mt-16 text-center">
          <div className="h-8 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-700 rounded-lg w-2xl mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
