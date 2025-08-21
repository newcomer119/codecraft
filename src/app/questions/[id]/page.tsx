"use client";

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, CheckCircle, XCircle, Clock, Star, TrendingUp } from "lucide-react";
import Editor from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import { runTestCases, validateCode, TestResult, TestCase, getSupportedLanguages, getRuntimeVersion } from "@/lib/piston";
import { getQuestionById } from "../data";
import { useParams } from "next/navigation";
import NavigationHeader from "@/components/NavigationHeader";

const languageOptions = getSupportedLanguages();

export default function QuestionPage() {
  const params = useParams();
  const questionId = parseInt(params.id as string);
  const questionData = getQuestionById(questionId);

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState<"description" | "solution" | "submissions">("description");
  const editorRef = useRef<any>(null);

  // Set initial code when questionData is available
  useEffect(() => {
    if (questionData) {
      setCode(questionData.starterCode.python);
    }
  }, [questionData]);

  if (!questionData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Question Not Found</h1>
          <p className="text-gray-400">The question you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(questionData.starterCode[language as keyof typeof questionData.starterCode]);
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first!");
      return;
    }

    // Validate code syntax
    const validation = validateCode(code, selectedLanguage);
    if (!validation.valid) {
      toast.error(`Code validation failed: ${validation.errors.join(", ")}`);
      return;
    }

    setIsRunning(true);
    setTestResults([]);

    try {
      // Run test cases using Piston API
      const testCases: TestCase[] = questionData.testCases.map(tc => ({
        input: tc.input,
        expected: tc.output
      }));

      const results = await runTestCases(code, selectedLanguage, testCases);
      setTestResults(results);
      
      const passedCount = results.filter(r => r.passed).length;
      if (passedCount === results.length) {
        toast.success("All test cases passed! 🎉");
      } else {
        toast.error(`${passedCount}/${results.length} test cases passed`);
      }
    } catch (error) {
      console.error("Code execution error:", error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes("HTTP error! status: 400")) {
          toast.error("Invalid request format. Please check your code syntax.");
        } else if (error.message.includes("Failed to execute code")) {
          toast.error("Code execution failed. Please try again later.");
        } else {
          toast.error(`Execution error: ${error.message}`);
        }
      } else {
        toast.error("Failed to run code. Please try again.");
      }
      
      // Show error message for failed execution
      toast.error("Code execution failed. Please check your code and try again.");
    } finally {
      setIsRunning(false);
    }
  };



  const resetCode = () => {
    setCode(questionData.starterCode[selectedLanguage as keyof typeof questionData.starterCode]);
    setTestResults([]);
  };

  const submitCode = () => {
    // In a real app, this would submit to your backend for evaluation
    toast.success("Code submitted successfully! 🚀");
  };

  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen bg-gray-950 flex">
      {/* Left Panel - Problem Description */}
      <div className="w-2/5 bg-gray-900 border-r border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Problem Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                questionData.difficulty === "Easy" ? "text-green-400 bg-green-400/10 border-green-400/20" :
                questionData.difficulty === "Medium" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" :
                "text-red-400 bg-red-400/10 border-red-400/20"
              }`}>
                {questionData.difficulty}
              </span>
              <span className="text-gray-400 text-sm">{questionData.category}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{questionData.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>15.4K likes</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Premium</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            {[
              { id: "description", label: "Description" },
              { id: "solution", label: "Solution" },
              { id: "submissions", label: "Submissions" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Problem Statement</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {questionData.description}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                <div className="space-y-4">
                  {questionData.examples.map((example, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-400">Example {index + 1}:</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-400">Input: </span><span className="text-white">{example.input}</span></div>
                        <div><span className="text-gray-400">Output: </span><span className="text-white">{example.output}</span></div>
                        <div><span className="text-gray-400">Explanation: </span><span className="text-white">{example.explanation}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {questionData.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Solution tab content</div>
              <div className="text-gray-500 text-sm mt-2">This would show the optimal solution</div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">Submissions tab content</div>
              <div className="text-gray-500 text-sm mt-2">This would show your submission history</div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-3/5 bg-gray-950">
        <div className="p-6">
          {/* Language Selector and Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              >
                {languageOptions.map((lang) => {
                  const runtimeVersion = getRuntimeVersion(lang.value);
                  return (
                    <option key={lang.value} value={lang.value}>
                      {lang.label} {runtimeVersion ? `(${runtimeVersion})` : ''}
                    </option>
                  );
                })}
              </select>
              
              {/* Runtime Info */}
              <div className="text-xs text-gray-500">
                Runtime: {getRuntimeVersion(selectedLanguage) || 'Unknown'}
              </div>
              
              <button
                onClick={resetCode}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
              >
                {isRunning ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isRunning ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={submitCode}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mb-6">
            <Editor
              height="400px"
              defaultLanguage={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test Results */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Test Results</h3>
              {testResults.length > 0 && (
                <div className="text-sm text-gray-400">
                  {testResults.filter(r => r.passed).length}/{testResults.length} passed
                </div>
              )}
            </div>

            {testResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Click "Run Code" to test your solution
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result.passed
                        ? "bg-green-500/10 border-green-500/20"
                        : "bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="font-medium text-white">
                          Test Case {result.testCase}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {result.executionTime.toFixed(0)}ms
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Input: </span>
                        <span className="text-white">{result.input}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Expected: </span>
                        <span className="text-white">{result.expected}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-400">Output: </span>
                        <span className="text-white">{result.actual}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
