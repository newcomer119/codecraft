'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { executeCode } from '@/lib/piston';

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
      alert('Please write some Verilog code first!');
      return;
    }

    setIsRunning(true);
    const testResults: TestResult[] = [];

    try {
      for (const test of tests) {
        try {
          // Execute the Verilog code with the test input
          const result = await executeVerilogCode(code, test.input);
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

  // Real Verilog code execution using Piston API with iverilog
  const executeVerilogCode = async (code: string, testInput: string): Promise<string> => {
    try {
      // Create test code by combining user code with test input
      let testCode = code;
      
      // For Verilog, we need to create a testbench to verify the module
      if (code.includes('module and_gate')) {
        // Test AND gate functionality
        const inputs = testInput.split(',').map(input => input.trim());
        const aValue = inputs.find(input => input.startsWith('a='))?.split('=')[1] || '0';
        const bValue = inputs.find(input => input.startsWith('b='))?.split('=')[1] || '0';
        
        testCode = `${code}

// Testbench for AND gate
module testbench;
    reg a, b;
    wire out;
    
    and_gate dut(a, b, out);
    
    initial begin
        a = ${aValue};
        b = ${bValue};
        #10;
        $display("Output: out=%b", out);
        $finish;
    end
endmodule`;
        
        console.log('Created AND gate testbench:', { aValue, bValue, testInput });
      } else if (code.includes('module verilog_basics')) {
        // Test verilog basics functionality
        const inputs = testInput.split(',').map(input => input.trim());
        const in1Value = inputs.find(input => input.startsWith('in1='))?.split('=')[1] || '0';
        const in2Value = inputs.find(input => input.startsWith('in2='))?.split('=')[1] || '0';
        
        testCode = `${code}

// Testbench for verilog basics
module testbench;
    reg [3:0] in1, in2;
    wire [4:0] sum;
    wire [7:0] product;
    wire flag;
    
    verilog_basics dut(in1, in2, sum, product, flag);
    
    initial begin
        in1 = ${in1Value};
        in2 = ${in2Value};
        #10;
        $display("sum=%d, product=%d, flag=%b", sum, product, flag);
        $finish;
    end
endmodule`;
      } else if (code.includes('module vector_ops')) {
        // Test vector operations
        const inputs = testInput.split(',').map(input => input.trim());
        const dataValue = inputs.find(input => input.startsWith('data='))?.split('=')[1] || '8\'b00000000';
        
        testCode = `${code}

// Testbench for vector operations
module testbench;
    reg [7:0] data;
    wire [7:0] shifted, reversed;
    
    vector_ops dut(data, shifted, reversed);
    
    initial begin
        data = ${dataValue};
        #10;
        $display("shifted=%b, reversed=%b", shifted, reversed);
        $finish;
    end
endmodule`;
      } else if (code.includes('module full_adder_4bit')) {
        // Test 4-bit full adder
        const inputs = testInput.split(',').map(input => input.trim());
        const aValue = inputs.find(input => input.startsWith('a='))?.split('=')[1] || '4\'b0000';
        const bValue = inputs.find(input => input.startsWith('b='))?.split('=')[1] || '4\'b0000';
        const cinValue = inputs.find(input => input.startsWith('cin='))?.split('=')[1] || '0';
        
        testCode = `${code}

// Testbench for 4-bit full adder
module testbench;
    reg [3:0] a, b;
    reg cin;
    wire [3:0] sum;
    wire cout;
    
    full_adder_4bit dut(a, b, cin, sum, cout);
    
    initial begin
        a = ${aValue};
        b = ${bValue};
        cin = ${cinValue};
        #10;
        $display("sum=%b, cout=%b", sum, cout);
        $finish;
    end
endmodule`;
      } else if (code.includes('module counter')) {
        // Test counter functionality
        const inputs = testInput.split(',').map(input => input.trim());
        const resetValue = inputs.find(input => input.startsWith('reset='))?.split('=')[1] || '0';
        const enableValue = inputs.find(input => input.startsWith('enable='))?.split('=')[1] || '0';
        
        testCode = `${code}

// Testbench for counter
module testbench;
    reg clk, reset, enable;
    wire [3:0] count;
    
    counter dut(clk, reset, enable, count);
    
    initial begin
        clk = 0;
        forever #5 clk = ~clk;
    end
    
    initial begin
        reset = ${resetValue};
        enable = ${enableValue};
        #20;
        $display("count=%d", count);
        $finish;
    end
endmodule`;
      } else {
        // Generic testbench for other modules
        testCode = `${code}

// Generic testbench
module testbench;
    initial begin
        $display("Testing module functionality");
        $display("Test input: ${testInput}");
        $finish;
    end
endmodule`;
      }

      console.log('Sending to Piston API:', { language: 'verilog', testCode: testCode.substring(0, 200) + '...' });

      // Use the piston API utility instead of direct fetch
      const response = await executeCode({
        language: 'verilog',
        source: testCode,
        stdin: '',
        args: [],
        version: '11.0.0'
      });

      console.log('Piston API response:', response);
      console.log('Response structure:', {
        hasRun: !!response.run,
        hasCompile: !!response.compile,
        runKeys: response.run ? Object.keys(response.run) : 'no run',
        compileKeys: response.compile ? Object.keys(response.compile) : 'no compile'
      });
      
      if (response.run) {
        console.log('Run output:', {
          stdout: response.run.stdout,
          stderr: response.run.stderr,
          code: response.run.code,
          signal: response.run.signal
        });
        
        if (response.run.stderr) {
          // Clean up the error message to be more user-friendly
          let errorMsg = response.run.stderr;
          
          // Remove common iverilog warnings and focus on actual errors
          if (errorMsg.includes('VCD info')) {
            errorMsg = errorMsg.replace(/VCD info.*\n/g, '');
          }
          if (errorMsg.includes('timescale')) {
            errorMsg = errorMsg.replace(/timescale.*\n/g, '');
          }
          
          // If there are still errors, throw them
          if (errorMsg.trim()) {
            throw new Error(`Compilation/Simulation Error:\n${errorMsg.trim()}`);
          }
        }
        
        // If no stderr or only warnings, return stdout
        return response.run.stdout || 'Verilog code compiled and simulated successfully';
      } else if (response.compile) {
        // Handle compile-only response
        console.log('Compile output:', response.compile);
        if (response.compile.stderr) {
          throw new Error(`Compilation Error:\n${response.compile.stderr.trim()}`);
        }
        return 'Verilog code compiled successfully';
      } else {
        throw new Error('Failed to execute Verilog code - no run or compile response from compiler');
      }
    } catch (error) {
      // Provide more helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('Compilation/Simulation Error')) {
          throw error; // Re-throw our formatted errors
        } else if (error.message.includes('fetch')) {
          throw new Error('Network error: Unable to connect to Verilog compiler. Please check your internet connection.');
        } else {
          throw new Error(`Verilog execution error: ${error.message}`);
        }
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  };

  const getPassedCount = () => results.filter(r => r.passed).length;
  const getTotalCount = () => results.length;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Verilog Test Runner</h3>
        <div className="flex items-center gap-2">
          {results.length > 0 && (
            <div className="text-sm text-gray-400">
              {getPassedCount()}/{getTotalCount()} tests passed
            </div>
          )}
          <button
            onClick={runTests}
            disabled={isRunning}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Run Verilog Tests
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

      {/* Verilog-Specific Tips */}
      <div className="mt-4 p-3 bg-indigo-900/20 border border-indigo-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-400">Verilog Design Tips</span>
        </div>
        <ul className="text-xs text-indigo-300 space-y-1">
          <li>• Ensure proper module declaration and port definitions</li>
          <li>• Use assign statements for combinational logic</li>
          <li>• Use always blocks for sequential logic</li>
          <li>• Check for syntax errors before compilation</li>
          <li>• Verify port connections in module instantiations</li>
          <li>• Use proper data types (wire, reg) for signals</li>
        </ul>
      </div>
    </div>
  );
}
