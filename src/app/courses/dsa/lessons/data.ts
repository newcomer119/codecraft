export interface LessonData {
  id: string;
  title: string;
  description: string;
  problem: {
    statement: string;
    examples: Array<{input: string, output: string}>;
    constraints: string[];
    starterCode: string;
    language: 'python' | 'javascript' | 'java';
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

export const dsaLessons: LessonData[] = [
  {
    id: "intro-variables",
    title: "Introduction to Variables",
    description: "Learn how to create and use variables in Python to store and manipulate data.",
    problem: {
      statement: "Create a variable called 'name' and assign it your name. Then print a greeting message using that variable.",
      examples: [
        { input: "name = 'Alice'", output: "Hello Alice!" },
        { input: "name = 'Bob'", output: "Hello Bob!" }
      ],
      constraints: [
        "Use a variable to store the name",
        "Print the greeting message",
        "Use string formatting or concatenation"
      ],
      starterCode: `# Write your code here
name = ""
print("Hello " + name + "!")`,
      language: 'python'
    },
    tests: [
      {
        name: "Basic greeting test",
        input: "name = 'Alice'",
        expectedOutput: "Hello Alice!",
        isHidden: false
      },
      {
        name: "Different name test",
        input: "name = 'Bob'",
        expectedOutput: "Hello Bob!",
        isHidden: false
      },
      {
        name: "Empty name test",
        input: "name = ''",
        expectedOutput: "Hello !",
        isHidden: true
      }
    ],
    solution: `# Solution: Using variables and string concatenation
name = "Alice"
print("Hello " + name + "!")`,
    hints: [
      "Variables are created using the assignment operator (=)",
      "You can concatenate strings using the + operator",
      "Make sure to assign a value to the name variable before using it"
    ],
    difficulty: 'easy'
  },
  {
    id: "count-marketers",
    title: "Counting Elements in Lists",
    description: "Practice working with lists and counting specific elements while handling different cases.",
    problem: {
      statement: "Implement a function called 'count_marketers' that counts how many times 'marketer' appears in a list of job titles. The function should handle different cases (uppercase, lowercase, mixed case).",
      examples: [
        { 
          input: "count_marketers(['programmer', 'marketer', 'doctor', 'marketer'])", 
          output: "2" 
        },
        { 
          input: "count_marketers(['MARKETER', 'marketer', 'Marketer'])", 
          output: "3" 
        }
      ],
      constraints: [
        "Function should be case-insensitive",
        "Return the count as an integer",
        "Handle empty lists",
        "Handle lists with no matches"
      ],
      starterCode: `def count_marketers(job_titles):
    # Write your code here
    pass

# Test your function
test_jobs = ['programmer', 'marketer', 'doctor', 'marketer']
result = count_marketers(test_jobs)
print(result)`,
      language: 'python'
    },
    tests: [
      {
        name: "Basic count test",
        input: "count_marketers(['programmer', 'marketer', 'doctor', 'marketer'])",
        expectedOutput: "2",
        isHidden: false
      },
      {
        name: "Case insensitive test",
        input: "count_marketers(['MARKETER', 'marketer', 'Marketer'])",
        expectedOutput: "3",
        isHidden: false
      },
      {
        name: "Empty list test",
        input: "count_marketers([])",
        expectedOutput: "0",
        isHidden: true
      },
      {
        name: "No matches test",
        input: "count_marketers(['programmer', 'doctor', 'engineer'])",
        expectedOutput: "0",
        isHidden: true
      }
    ],
    solution: `def count_marketers(job_titles):
    count = 0
    for job in job_titles:
        if job.lower() == 'marketer':
            count += 1
    return count

# Test the function
test_jobs = ['programmer', 'marketer', 'doctor', 'marketer']
result = count_marketers(test_jobs)
print(result)`,
    hints: [
      "Use a loop to iterate through the list",
      "Convert each job title to lowercase before comparing",
      "Initialize a counter variable to 0",
      "Increment the counter when you find a match"
    ],
    difficulty: 'medium'
  },
  {
    id: "sum-array",
    title: "Sum of Array Elements",
    description: "Learn to iterate through arrays and calculate the sum of all elements.",
    problem: {
      statement: "Write a function called 'sum_array' that takes an array of numbers and returns the sum of all elements.",
      examples: [
        { input: "sum_array([1, 2, 3, 4, 5])", output: "15" },
        { input: "sum_array([10, -5, 3])", output: "8" }
      ],
      constraints: [
        "Function should handle positive and negative numbers",
        "Return 0 for empty arrays",
        "Handle arrays with single elements"
      ],
      starterCode: `def sum_array(numbers):
    # Write your code here
    pass

# Test your function
test_numbers = [1, 2, 3, 4, 5]
result = sum_array(test_numbers)
print(result)`,
      language: 'python'
    },
    tests: [
      {
        name: "Basic sum test",
        input: "sum_array([1, 2, 3, 4, 5])",
        expectedOutput: "15",
        isHidden: false
      },
      {
        name: "Negative numbers test",
        input: "sum_array([10, -5, 3])",
        expectedOutput: "8",
        isHidden: false
      },
      {
        name: "Empty array test",
        input: "sum_array([])",
        expectedOutput: "0",
        isHidden: true
      },
      {
        name: "Single element test",
        input: "sum_array([42])",
        expectedOutput: "42",
        isHidden: true
      }
    ],
    solution: `def sum_array(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Test the function
test_numbers = [1, 2, 3, 4, 5]
result = sum_array(test_numbers)
print(result)`,
    hints: [
      "Initialize a variable to store the sum",
      "Use a loop to go through each number",
      "Add each number to the running total",
      "Return the final sum"
    ],
    difficulty: 'easy'
  }
];

export const getLessonById = (id: string): LessonData | undefined => {
  return dsaLessons.find(lesson => lesson.id === id);
};

export const getNextLesson = (currentId: string): LessonData | null => {
  const currentIndex = dsaLessons.findIndex(lesson => lesson.id === currentId);
  if (currentIndex === -1 || currentIndex === dsaLessons.length - 1) {
    return null;
  }
  return dsaLessons[currentIndex + 1];
};

export const getPreviousLesson = (currentId: string): LessonData | null => {
  const currentIndex = dsaLessons.findIndex(lesson => lesson.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return dsaLessons[currentIndex - 1];
};
