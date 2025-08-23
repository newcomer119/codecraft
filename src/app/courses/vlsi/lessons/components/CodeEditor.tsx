'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  )
});

interface CodeEditorProps {
  starterCode: string;
  language: string;
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
  onShowSolution: () => void;
  isRunning: boolean;
  testResults: Array<{
    name: string;
    passed: boolean;
    output?: string;
    expected?: string;
    error?: string;
  }>;
  solution: string;
  showSolution: boolean;
}

export default function CodeEditor({
  starterCode,
  onCodeChange,
  onShowSolution,
  testResults,
  solution,
  showSolution
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'test' | 'solution'>('main');
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string>('');
  const [executionError, setExecutionError] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const editorRef = useRef<unknown>(null);

  // Update code when starterCode changes
  useEffect(() => {
    setCode(starterCode);
  }, [starterCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  const executeCode = async () => {
    if (!code.trim()) return;
    
    setIsExecuting(true);
    setOutput('');
    setExecutionError('');

    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: 'iverilog',
          version: '11.0.0',
          files: [
            {
              name: 'main.v',
              content: code
            }
          ],
          stdin: '',
          args: []
        })
      });

      const result = await response.json();
      
      if (result.run) {
        if (result.run.stderr) {
          setExecutionError(result.run.stderr);
        } else {
          setOutput(result.run.stdout || 'Verilog code compiled successfully (no output)');
        }
      } else {
        setExecutionError('Failed to compile Verilog code');
      }
    } catch (error) {
      setExecutionError(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'main':
        return (
          <MonacoEditor
            height="100%"
            defaultLanguage="verilog"
            value={code}
            onChange={(value) => handleCodeChange(value || '')}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              parameterHints: { enabled: true },
              hover: { enabled: true },
              formatOnPaste: true,
              formatOnType: true,
              readOnly: false, // Ensure main tab is editable
            }}
          />
        );
      case 'test':
        return (
          <div className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-auto">
            <div className="text-gray-400 mb-2"># Test cases will be run automatically</div>
            <div className="text-gray-400"># You can see the results below after running your code</div>
            <div className="text-gray-400 mt-4"># For Verilog, tests will verify:</div>
            <div className="text-gray-400"># - Syntax correctness</div>
            <div className="text-gray-400"># - Module functionality</div>
            <div className="text-gray-400"># - Output signal behavior</div>
          </div>
        );
      case 'solution':
        return (
          <MonacoEditor
            height="100%"
            defaultLanguage="verilog"
            value={solution}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              readOnly: true, // Solution tab should be read-only
            }}
          />
        );
      default:
        return null;
    }
  };

  const getTabStyle = (tab: string) => {
    const isActive = activeTab === tab;
    return `px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300 cursor-pointer'
    }`;
  };

  const handleTabChange = (tab: 'main' | 'test' | 'solution') => {
    setActiveTab(tab);
    // Clear output when switching tabs
    setOutput('');
    setExecutionError('');
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      {/* File Tabs */}
      <div className="flex space-x-1 px-6 bg-gray-900 border-b border-gray-800">
        <div
          className={getTabStyle('main')}
          onClick={() => handleTabChange('main')}
        >
          main.v
        </div>
        <div
          className={getTabStyle('test')}
          onClick={() => handleTabChange('test')}
        >
          test.v
        </div>
        <div
          className={getTabStyle('solution')}
          onClick={() => handleTabChange('solution')}
        >
          solution.v
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="h-64">
        {getTabContent()}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <button
            onClick={executeCode}
            disabled={isExecuting}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Compile Verilog
              </>
            )}
          </button>
          
          <button
            onClick={onShowSolution}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        </div>
      </div>

      {/* Code Output */}
      {(output || executionError) && (
        <div className="border-t border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Compilation Output</h3>
          <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm">
            {executionError ? (
              <div className="text-red-400">
                <div className="font-semibold mb-2">Error:</div>
                <pre className="whitespace-pre-wrap">{executionError}</pre>
              </div>
            ) : (
              <div className="text-green-400">
                <div className="font-semibold mb-2">Success:</div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border-t border-gray-800 p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Test Results</h3>
          <div className="space-y-2">
            {testResults.map((test, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  test.passed
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-red-500/50 bg-red-500/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {test.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${
                    test.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {test.name}
                  </span>
                </div>
                
                {!test.passed && (
                  <div className="text-sm text-gray-300">
                    <div>Expected: {test.expected}</div>
                    <div>Got: {test.output || test.error}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
