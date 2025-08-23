export interface LessonData {
  id: string;
  title: string;
  description: string;
  problem: {
    statement: string;
    examples: Array<{input: string, output: string}>;
    constraints: string[];
    starterCode: string;
    language: 'verilog';
  };
  tests: Array<{
    name: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }>;
  solution: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const vlsiLessons: LessonData[] = [
  {
    id: "getting-started",
    title: "Getting Started with Verilog",
    description: "Learn the basics of Verilog and set up your first digital circuit simulation.",
    problem: {
      statement: "Create a simple Verilog module that implements a 2-input AND gate. The module should have inputs 'a' and 'b' and output 'out'.",
      examples: [
        { input: "a=0, b=0", output: "out=0" },
        { input: "a=0, b=1", output: "out=0" },
        { input: "a=1, b=0", output: "out=0" },
        { input: "a=1, b=1", output: "out=1" }
      ],
      constraints: [
        "Use module declaration with proper port definitions",
        "Implement the AND logic using assign statement",
        "Follow Verilog syntax rules",
        "Include proper module name and port names"
      ],
      starterCode: `module and_gate(
    input a,
    input b,
    output out
);

endmodule`,
      language: 'verilog'
    },
    tests: [
      {
        name: "AND gate truth table test 1",
        input: "a=0, b=0",
        expectedOutput: "out=0",
        isHidden: false
      },
      {
        name: "AND gate truth table test 2",
        input: "a=0, b=1",
        expectedOutput: "out=0",
        isHidden: false
      },
      {
        name: "AND gate truth table test 3",
        input: "a=1, b=0",
        expectedOutput: "out=0",
        isHidden: false
      },
      {
        name: "AND gate truth table test 4",
        input: "a=1, b=1",
        expectedOutput: "out=1",
        isHidden: false
      }
    ],
    solution: `module and_gate(
    input a,
    input b,
    output out
);
    assign out = a & b;
endmodule`,
    hints: [
      "Use the 'assign' keyword to create combinational logic",
      "The AND operator in Verilog is '&'",
      "Make sure your module name matches the filename",
      "Check that all ports are properly declared"
    ],
    difficulty: 'easy'
  },
  {
    id: "verilog-basics",
    title: "Verilog Language Basics",
    description: "Learn fundamental Verilog syntax, data types, and basic operators.",
    problem: {
      statement: "Create a Verilog module that demonstrates different data types and operators. Include wire, reg, and parameter declarations.",
      examples: [
        { input: "in1=3, in2=5", output: "sum=8, product=15, flag=1" },
        { input: "in1=2, in2=4", output: "sum=6, product=8, flag=0" }
      ],
      constraints: [
        "Declare at least one wire and one reg",
        "Use parameter for constants",
        "Implement arithmetic operations",
        "Include comparison operators"
      ],
      starterCode: `module verilog_basics(
    input [3:0] in1,
    input [3:0] in2,
    output [4:0] sum,
    output [7:0] product,
    output flag
);

endmodule`,
      language: 'verilog'
    },
    tests: [
      {
        name: "Basic arithmetic test",
        input: "in1=3, in2=5",
        expectedOutput: "sum=8, product=15, flag=1",
        isHidden: false
      },
      {
        name: "Comparison test",
        input: "in1=2, in2=4",
        expectedOutput: "sum=6, product=8, flag=0",
        isHidden: false
      }
    ],
    solution: `module verilog_basics(
    input [3:0] in1,
    input [3:0] in2,
    output [4:0] sum,
    output [7:0] product,
    output flag
);
    parameter THRESHOLD = 3;
    
    wire [3:0] temp;
    reg flag_reg;
    
    assign sum = in1 + in2;
    assign product = in1 * in2;
    assign temp = in1 + in2;
    assign flag = (temp > THRESHOLD) ? 1 : 0;
endmodule`,
    hints: [
      "Use 'parameter' for constant values",
      "Wire types are used for combinational logic",
      "Reg types can store values",
      "Use conditional operator '?' for simple if-else logic"
    ],
    difficulty: 'easy'
  },
  {
    id: "verilog-vectors",
    title: "Working with Vectors",
    description: "Learn to work with multi-bit signals, vector operations, and bit manipulation.",
    problem: {
      statement: "Create a module that performs bit manipulation on 8-bit vectors. Implement bit shifting, concatenation, and bit selection.",
      examples: [
        { input: "data=8'b10101010", output: "shifted=8'b01010101, reversed=8'b01010101" },
        { input: "data=8'b11001100", output: "shifted=8'b01100110, reversed=8'b00110011" }
      ],
      constraints: [
        "Use 8-bit input and output vectors",
        "Implement right shift operation",
        "Use concatenation operator",
        "Include bit selection for specific bits"
      ],
      starterCode: `module vector_ops(
    input [7:0] data,
    output [7:0] shifted,
    output [7:0] reversed
);

endmodule`,
      language: 'verilog'
    },
    tests: [
      {
        name: "Vector operations test 1",
        input: "data=8'b10101010",
        expectedOutput: "shifted=8'b01010101, reversed=8'b01010101",
        isHidden: false
      },
      {
        name: "Vector operations test 2",
        input: "data=8'b11001100",
        expectedOutput: "shifted=8'b01100110, reversed=8'b00110011",
        isHidden: false
      }
    ],
    solution: `module vector_ops(
    input [7:0] data,
    output [7:0] shifted,
    output [7:0] reversed
);
    assign shifted = data >> 1;
    assign reversed = {data[0], data[1], data[2], data[3], 
                      data[4], data[5], data[6], data[7]};
endmodule`,
    hints: [
      "Use '>>' operator for right shift",
      "Concatenation uses curly braces '{}'",
      "Bit selection uses square brackets '[bit_number]'",
      "Remember that bit 0 is the rightmost bit"
    ],
    difficulty: 'medium'
  },
  {
    id: "modules-hierarchy",
    title: "Modules and Hierarchy",
    description: "Learn to create hierarchical designs by instantiating multiple modules and connecting them.",
    problem: {
      statement: "Create a 4-bit full adder using four 1-bit full adder modules. Demonstrate module instantiation and port mapping.",
      examples: [
        { input: "a=4'b0011, b=4'b0101, cin=0", output: "sum=4'b1000, cout=0" },
        { input: "a=4'b1111, b=4'b0001, cin=0", output: "sum=4'b0000, cout=1" }
      ],
      constraints: [
        "Create a 1-bit full adder module first",
        "Instantiate four 1-bit adders",
        "Connect carry signals between stages",
        "Use proper port mapping syntax"
      ],
      starterCode: `module full_adder_1bit(
    input a,
    input b,
    input cin,
    output sum,
    output cout
);

endmodule

module full_adder_4bit(
    input [3:0] a,
    input [3:0] b,
    input cin,
    output [3:0] sum,
    output cout
);

endmodule`,
      language: 'verilog'
    },
    tests: [
      {
        name: "4-bit addition test 1",
        input: "a=4'b0011, b=4'b0101, cin=0",
        expectedOutput: "sum=4'b1000, cout=0",
        isHidden: false
      },
      {
        name: "4-bit addition test 2",
        input: "a=4'b1111, b=4'b0001, cin=0",
        expectedOutput: "sum=4'b0000, cout=1",
        isHidden: false
      }
    ],
    solution: `module full_adder_1bit(
    input a,
    input b,
    input cin,
    output sum,
    output cout
);
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (a & cin) | (b & cin);
endmodule

module full_adder_4bit(
    input [3:0] a,
    input [3:0] b,
    input cin,
    output [3:0] sum,
    output cout
);
    wire [3:1] carry;
    
    full_adder_1bit fa0(a[0], b[0], cin, sum[0], carry[1]);
    full_adder_1bit fa1(a[1], b[1], carry[1], sum[1], carry[2]);
    full_adder_1bit fa2(a[2], b[2], carry[2], sum[2], carry[3]);
    full_adder_1bit fa3(a[3], b[3], carry[3], sum[3], cout);
endmodule`,
    hints: [
      "Use 'wire' for internal connections",
      "Module instantiation syntax: module_name instance_name(port_connections)",
      "Connect carry_out of one stage to carry_in of next stage",
      "Use bit selection for individual bits of vectors"
    ],
    difficulty: 'medium'
  },
  {
    id: "procedures",
    title: "Verilog Procedures",
    description: "Learn to use always blocks, procedural assignments, and control structures in Verilog.",
    problem: {
      statement: "Create a module with an always block that implements a simple counter with reset and enable functionality.",
      examples: [
        { input: "reset=1, enable=0, clk=rising_edge", output: "count=0" },
        { input: "reset=0, enable=1, clk=rising_edge", output: "count=count+1" }
      ],
      constraints: [
        "Use always block with clock sensitivity",
        "Implement synchronous reset",
        "Include enable logic",
        "Use non-blocking assignments in always block"
      ],
      starterCode: `module counter(
    input clk,
    input reset,
    input enable,
    output reg [3:0] count
);

endmodule`,
      language: 'verilog'
    },
    tests: [
      {
        name: "Counter reset test",
        input: "reset=1, enable=0, clk=rising_edge",
        expectedOutput: "count=0",
        isHidden: false
      },
      {
        name: "Counter enable test",
        input: "reset=0, enable=1, clk=rising_edge",
        expectedOutput: "count=count+1",
        isHidden: false
      }
    ],
    solution: `module counter(
    input clk,
    input reset,
    input enable,
    output reg [3:0] count
);
    always @(posedge clk) begin
        if (reset) begin
            count <= 4'b0000;
        end
        else if (enable) begin
            count <= count + 1;
        end
    end
endmodule`,
    hints: [
      "Use 'always @(posedge clk)' for clocked logic",
      "Use 'if-else' statements for control logic",
      "Use non-blocking assignments '<=' in always blocks",
      "Remember to handle all cases in your if-else structure"
    ],
    difficulty: 'medium'
  }
];

export const getLessonById = (id: string): LessonData | undefined => {
  return vlsiLessons.find(lesson => lesson.id === id);
};

export const getNextLesson = (currentId: string): LessonData | null => {
  const currentIndex = vlsiLessons.findIndex(lesson => lesson.id === currentId);
  if (currentIndex === -1 || currentIndex === vlsiLessons.length - 1) {
    return null;
  }
  return vlsiLessons[currentIndex + 1];
};

export const getPreviousLesson = (currentId: string): LessonData | null => {
  const currentIndex = vlsiLessons.findIndex(lesson => lesson.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return vlsiLessons[currentIndex - 1];
};
