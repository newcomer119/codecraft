import { Metadata } from "next";
import { ChevronLeft, ChevronRight, BookOpen, Target, Clock, CheckCircle, Play } from "lucide-react";
import Link from "next/link";
import { dsaLessons } from "./lessons/data";

export const metadata: Metadata = {
  title: "Data Structures & Algorithms - CodeCraft",
  description: "Learn data structures and algorithms with interactive coding exercises",
};

const chapters = [
  {
    id: "ch1",
    title: "Introduction to Programming",
    lessons: 3,
    completed: 0
  },
  {
    id: "ch2", 
    title: "Basic Data Types",
    lessons: 4,
    completed: 0
  },
  {
    id: "ch3",
    title: "Control Structures",
    lessons: 5,
    completed: 0
  },
  {
    id: "ch4",
    title: "Functions & Methods",
    lessons: 4,
    completed: 0
  },
  {
    id: "ch5",
    title: "Arrays & Lists",
    lessons: 6,
    completed: 0
  },
  {
    id: "ch6",
    title: "Data Structures Introduction",
    lessons: 8,
    completed: 1
  },
  {
    id: "ch7",
    title: "Advanced Data Structures",
    lessons: 10,
    completed: 0
  },
  {
    id: "ch8",
    title: "Algorithm Analysis",
    lessons: 7,
    completed: 0
  }
];

export default function DSACoursePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Courses
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">
              Data Structures & Algorithms
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Master fundamental data structures and algorithms with hands-on practice. 
              Learn through interactive coding exercises and real-world problems.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Overview */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Course Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Lessons:</span>
                  <span className="text-white font-medium">{dsaLessons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="text-yellow-400 font-medium">Beginner to Advanced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">~20 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white font-medium">Python</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <h3 className="text-sm font-medium text-blue-400 mb-2">What you'll learn:</h3>
                <ul className="text-xs text-blue-300 space-y-1">
                  <li>• Programming fundamentals and problem-solving</li>
                  <li>• Data structures: arrays, lists, trees, graphs</li>
                  <li>• Algorithms: sorting, searching, recursion</li>
                  <li>• Time and space complexity analysis</li>
                  <li>• Real-world coding challenges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Lessons List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Interactive Lessons</h2>
              <div className="space-y-4">
                {dsaLessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/dsa/lessons/${lesson.id}`}
                    className="block group"
                  >
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                {lesson.title}
                              </h3>
                              <p className="text-gray-400 text-sm">
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              lesson.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                              lesson.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {lesson.difficulty}
                            </span>
                            <span className="text-gray-500 flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {lesson.tests.length} test cases
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-700 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                            <Play className="w-4 h-4 text-gray-400 group-hover:text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Course Progress */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Course Progress</h3>
                  <span className="text-sm text-gray-400">0% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: '0%' }} />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Start with the first lesson to begin your learning journey!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Navigation */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Course Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{chapter.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{chapter.lessons} lessons</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {chapter.completed}/{chapter.lessons} completed
                  </span>
                  {chapter.completed > 0 && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
