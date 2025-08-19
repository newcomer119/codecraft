import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code2, Brain, Database, Network, Lock, Zap, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses - CodeCraft",
  description: "Learn programming with interactive courses on Data Structures, Algorithms, and more",
};

const courses = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and algorithms with hands-on practice",
    icon: Brain,
    color: "from-blue-500 to-purple-600",
    borderColor: "border-blue-500/20",
    hoverColor: "hover:border-blue-400/40",
    lessons: 12,
    difficulty: "Intermediate",
    progress: 0,
    tags: ["Python", "Java", "C++"]
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Build modern web applications with React, Next.js, and full-stack technologies",
    icon: Code2,
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500/20",
    hoverColor: "hover:border-green-400/40",
    lessons: 15,
    difficulty: "Beginner",
    progress: 0,
    tags: ["React", "Next.js", "TypeScript"]
  },
  {
    id: "database",
    title: "Database Design",
    description: "Learn database modeling, SQL, and NoSQL database management",
    icon: Database,
    color: "from-orange-500 to-red-600",
    borderColor: "border-orange-500/20",
    hoverColor: "hover:border-orange-400/40",
    lessons: 8,
    difficulty: "Intermediate",
    progress: 0,
    tags: ["SQL", "MongoDB", "PostgreSQL"]
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Design scalable systems and understand distributed architecture",
    icon: Network,
    color: "from-purple-500 to-pink-600",
    borderColor: "border-purple-500/20",
    hoverColor: "hover:border-purple-400/40",
    lessons: 10,
    difficulty: "Advanced",
    progress: 0,
    tags: ["Architecture", "Scalability", "Microservices"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn security fundamentals, ethical hacking, and secure coding practices",
    icon: Lock,
    color: "from-red-500 to-pink-600",
    borderColor: "border-red-500/20",
    hoverColor: "hover:border-red-400/40",
    lessons: 14,
    difficulty: "Intermediate",
    progress: 0,
    tags: ["Security", "Ethical Hacking", "Cryptography"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Explore artificial intelligence, machine learning algorithms, and neural networks",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    borderColor: "border-yellow-500/20",
    hoverColor: "hover:border-yellow-400/40",
    lessons: 16,
    difficulty: "Advanced",
    progress: 0,
    tags: ["Python", "TensorFlow", "PyTorch"]
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Interactive Programming Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn programming concepts through hands-on practice with our interactive code editor. 
              Master data structures, algorithms, and modern development practices.
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group block"
            >
              <div className={`relative bg-gray-900 rounded-xl border ${course.borderColor} ${course.hoverColor} 
                transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden`}
              >
                {/* Course Icon */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-lg bg-gradient-to-br ${course.color} 
                  flex items-center justify-center shadow-lg`}
                >
                  <course.icon className="w-6 h-6 text-white" />
                </div>

                {/* Course Content */}
                <div className="p-6 pt-16">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${course.color} rounded-full transition-all duration-300`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {course.progress === 0 ? "Not started" : `${course.progress}% complete`}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            More Courses Coming Soon
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're constantly adding new courses and updating existing ones. 
            Stay tuned for advanced topics, specialized tracks, and industry-focused content.
          </p>
        </div>
      </div>
    </div>
  );
}
