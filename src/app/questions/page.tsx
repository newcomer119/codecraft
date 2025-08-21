import Link from "next/link";
import { CheckCircle, Clock, TrendingUp, Star } from "lucide-react";
import { questions } from "./data";

// Mock user progress data - in a real app, this would come from user's database
const userProgress = {
  1: "solved",
  2: "attempted",
  5: "solved"
} as const;

const difficultyColors = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20"
};

const statusIcons = {
  solved: <CheckCircle className="w-4 h-4 text-green-400" />,
  attempted: <Clock className="w-4 h-4 text-yellow-400" />,
  todo: <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
};

import NavigationHeader from "@/components/NavigationHeader";

export default function QuestionsPage() {
  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Coding Questions</h1>
              <p className="text-gray-400">Practice coding problems and improve your skills</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Solved: {Object.values(userProgress).filter(p => p === "solved").length}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Attempted: {Object.values(userProgress).filter(p => p === "attempted").length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option value="">All Categories</option>
                <option value="Array">Array</option>
                <option value="String">String</option>
                <option value="Linked List">Linked List</option>
                <option value="Stack">Stack</option>
              </select>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                <option value="">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="todo">Todo</option>
              </select>
            </div>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
              <div className="col-span-1">Status</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Acceptance</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Questions */}
          <div className="divide-y divide-gray-800">
            {questions.map((question) => (
              <div key={question.id} className="px-6 py-4 hover:bg-gray-800/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    {statusIcons[userProgress[question.id as keyof typeof userProgress] || "todo"]}
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/questions/${question.id}`}
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        {question.title}
                      </Link>
                      {question.premium && (
                        <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{question.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{question.companies.slice(0, 2).join(", ")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty as keyof typeof difficultyColors]}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="col-span-2 text-gray-300 text-sm">
                    {question.category}
                  </div>
                  <div className="col-span-2 text-gray-300 text-sm">
                    {/* Mock acceptance rate - in real app this would come from database */}
                    {Math.floor(Math.random() * 30) + 70}%
                  </div>
                  <div className="col-span-1">
                    <Link
                      href={`/questions/${question.id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Solve
                    </Link>
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
