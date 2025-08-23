'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Target, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getLessonById, getNextLesson, getPreviousLesson, LessonData } from '../data';
import CodeEditor from '../components/CodeEditor';
import TestRunner from '../components/TestRunner';

interface TestResult {
  name: string;
  passed: boolean;
  output?: string;
  expected?: string;
  error?: string;
}

export default function VLSILessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [currentCode, setCurrentCode] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const lessonData = getLessonById(lessonId);
    if (lessonData) {
      setLesson(lessonData);
      setCurrentCode(lessonData.problem.starterCode);
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Lesson not found</div>
      </div>
    );
  }

  const nextLesson = getNextLesson(lessonId);
  const previousLesson = getPreviousLesson(lessonId);

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const handleTestComplete = (results: TestResult[]) => {
    setTestResults(results);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  const handleNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next' && nextLesson) {
      router.push(`/courses/vlsi/lessons/${nextLesson.id}`);
    } else if (direction === 'previous' && previousLesson) {
      router.push(`/courses/vlsi/lessons/${previousLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel - Problem Description */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Lesson Header */}
          <div className="mb-6">
            <Link 
              href="/courses/vlsi" 
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to VLSI Course
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-400 text-sm mb-4">
              {lesson.description}
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                lesson.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                lesson.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {lesson.difficulty}
              </span>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-400" />
              Problem
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {lesson.problem.statement}
            </p>

            {/* Examples */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Examples:</h4>
              <div className="space-y-2">
                {lesson.problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-700 rounded p-2 text-xs font-mono">
                    <div className="text-gray-300">Input: {example.input}</div>
                    <div className="text-gray-300">Output: {example.output}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Constraints:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {lesson.problem.constraints.map((constraint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hints */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Hints
            </h3>
            <ul className="text-sm text-gray-300 space-y-2">
              {lesson.hints.map((hint, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-400">💡</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation('previous')}
              disabled={!previousLesson}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => handleNavigation('next')}
              disabled={!nextLesson}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-800 disabled:text-gray-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor & Tests */}
      <div className="w-3/5 bg-gray-950">
        <div className="p-6">
          {/* Code Editor */}
          <div className="mb-6">
            <CodeEditor
              starterCode={lesson.problem.starterCode}
              language={lesson.problem.language}
              onCodeChange={handleCodeChange}
              onRunCode={() => {}} // Not needed anymore
              onShowSolution={handleShowSolution}
              isRunning={false} // Not needed anymore
              testResults={testResults}
              solution={lesson.solution}
              showSolution={showSolution}
            />
          </div>

          {/* Test Runner */}
          <TestRunner
            code={currentCode}
            tests={lesson.tests}
            onTestComplete={handleTestComplete}
          />

          {/* Progress Indicator */}
          {testResults.length > 0 && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">Progress</h3>
                <span className="text-sm text-gray-400">
                  {testResults.filter(r => r.passed).length}/{testResults.length} tests passed
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(testResults.filter(r => r.passed).length / testResults.length) * 100}%` 
                  }}
                />
              </div>
              {testResults.every(r => r.passed) && (
                <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Congratulations! All tests passed!</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
