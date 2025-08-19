'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface TestCase {
  name: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface TestResult {
  name: string;
  passed: boolean;
  output?: string;
  expected?: string;
  error?: string;
}

interface TestRunnerProps {
  code: string;
  tests: TestCase[];
  onTestComplete: (results: TestResult[]) => void;
}

export default function TestRunner({ code, tests, onTestComplete }: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const runTests = async () => {
    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setIsRunning(true);
    const testResults: TestResult[] = [];

    try {
      for (const test of tests) {
        try {
          // Execute the code with the test input
          const result = await executePythonCode(code, test.input);
          const passed = result.trim() === test.expectedOutput.trim();
          
          testResults.push({
            name: test.name,
            passed,
            output: result,
            expected: test.expectedOutput
          });
        } catch (error) {
          testResults.push({
            name: test.name,
            passed: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    } catch (error) {
      console.error('Test execution error:', error);
    }

    setResults(testResults);
    onTestComplete(testResults);
    setIsRunning(false);
  };

  // Real Python code execution using Piston API
  const executePythonCode = async (code: string, testInput: string): Promise<string> => {
    try {
      // Create test code by combining user code with test input
      let testCode = code;
      
      // If the code contains a function, we need to call it with the test input
      if (code.includes('def count_marketers')) {
        // Extract the function call from test input
        const functionCall = testInput.replace('count_marketers(', '').replace(')', '');
        testCode = `${code}\n\n# Test execution\nresult = count_marketers(${functionCall})\nprint(result)`;
      } else if (code.includes('def sum_array')) {
        const functionCall = testInput.replace('sum_array(', '').replace(')', '');
        testCode = `${code}\n\n# Test execution\nresult = sum_array(${functionCall})\nprint(result)`;
      } else if (code.includes('name =')) {
        // For variable assignment, just run the code as is
        testCode = code;
      }

      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [
            {
              name: 'main.py',
              content: testCode
            }
          ],
          stdin: '',
          args: []
        })
      });

      const result = await response.json();
      
      if (result.run) {
        if (result.run.stderr) {
          throw new Error(result.run.stderr);
        } else {
          return result.run.stdout || '';
        }
      } else {
        throw new Error('Failed to execute code');
      }
    } catch (error) {
      throw new Error(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getPassedCount = () => results.filter(r => r.passed).length;
  const getTotalCount = () => results.length;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Test Runner</h3>
        <div className="flex items-center gap-2">
          {results.length > 0 && (
            <div className="text-sm text-gray-400">
              {getPassedCount()}/{getTotalCount()} tests passed
            </div>
          )}
          <button
            onClick={runTests}
            disabled={isRunning}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Run Tests
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Cases Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Test Cases:</h4>
        <div className="space-y-2">
          {tests.map((test, index) => (
            <div key={index} className="text-sm">
              <div className="text-gray-300">
                <span className="font-medium">{test.name}:</span>
                <span className="text-gray-400 ml-2">{test.input}</span>
              </div>
              <div className="text-gray-400 ml-4">
                Expected: {test.expectedOutput}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Results */}
      {results.length > 0 && (
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-white mb-2">Results:</h4>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.passed
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    result.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.name}
                  </span>
                </div>
                
                {!result.passed && (
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Expected: <code className="bg-gray-700 px-1 rounded">{result.expected}</code></div>
                    <div>Got: <code className="bg-gray-700 px-1 rounded">{result.output || result.error}</code></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Quality Check */}
      <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Code Quality Tips</span>
        </div>
        <ul className="text-xs text-blue-300 space-y-1">
          <li>• Make sure your function handles edge cases</li>
          <li>• Test with different inputs to verify correctness</li>
          <li>• Consider performance for larger inputs</li>
          <li>• Use meaningful variable names</li>
          <li>• Check for syntax errors before running tests</li>
        </ul>
      </div>
    </div>
  );
}
