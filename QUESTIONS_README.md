# Questions Section - CodeCraft

This section provides a LeetCode-like coding questions experience with Monaco Editor and Piston API integration.

## Features

### 🎯 Question Management
- **Question List**: Browse all available coding problems with filtering options
- **Difficulty Levels**: Easy, Medium, and Hard problems
- **Categories**: Array, String, Linked List, Stack, and more
- **Progress Tracking**: Track solved, attempted, and todo questions

### 💻 Code Editor
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Multiple Languages**: Support for Python, JavaScript, C++, Java, and more
- **Starter Code**: Pre-written boilerplate code for each question
- **Language Switching**: Change programming language on the fly

### 🚀 Code Execution
- **Piston API Integration**: Real-time code compilation and execution
- **Test Cases**: Run your code against predefined test cases
- **Results Display**: See execution results, timing, and pass/fail status
- **Error Handling**: Comprehensive error reporting and validation

### 📚 Question Content
- **Problem Description**: Detailed problem statements with examples
- **Constraints**: Clear problem limitations and requirements
- **Examples**: Multiple test cases with explanations
- **Company Tags**: Questions tagged with relevant companies

## File Structure

```
src/app/questions/
├── page.tsx                 # Main questions list page
├── loading.tsx             # Loading skeleton for questions list
├── data.ts                 # Questions data and interfaces
├── [id]/
│   ├── page.tsx           # Individual question page
│   └── loading.tsx        # Loading skeleton for question page
```

## API Integration

### Piston API
The questions section uses the Piston API for code execution:

- **Endpoint**: `https://emkc.org/api/v2/piston/execute`
- **Supported Languages**: 
  - Python 3.10.0
  - JavaScript (Node.js 18.15.0)
  - TypeScript 5.0.3
  - C++ 10.2.0
  - Java 15.0.2
  - C# 6.12.0
  - Go 1.16.2
  - Rust 1.68.2
  - Ruby 3.0.1
  - Swift 5.3.3
  - Kotlin 1.8.0
  - PHP 8.0.0
  - Verilog (Icarus 11.0.0)
- **Features**: Code compilation, execution, stdin/stdout handling, error reporting



### Code Validation
- Syntax validation before execution
- Language-specific code structure checks
- Test case execution with input/output validation

## Usage

### Running Code
1. Select a programming language from the dropdown
2. Write your solution in the Monaco editor
3. Click "Run Code" to execute against test cases
4. View results in the Test Results panel

### Submitting Solutions
1. Ensure all test cases pass
2. Click "Submit" to submit your solution
3. Solution is saved for future reference

### Navigation
- Use the Questions tab in the main navigation
- Filter questions by difficulty, category, or status
- Search questions by title or content
- Click on any question to start solving

## Customization

### Adding New Questions
1. Add question data to `src/app/questions/data.ts`
2. Include problem description, examples, constraints
3. Provide starter code for all supported languages
4. Define test cases with expected outputs

### Supporting New Languages
1. Add language mapping in `src/lib/piston.ts`
2. Update `LANGUAGE_MAPPINGS` object
3. Add file extension mapping
4. Include language-specific code validation

## Future Enhancements

- **User Progress**: Persistent progress tracking
- **Leaderboards**: Compare solutions with other users
- **Discussion**: Comments and solution sharing
- **Custom Test Cases**: User-defined test inputs
- **Performance Metrics**: Execution time and memory usage
- **Solution History**: Track all submission attempts

## Technical Notes

- Built with Next.js 15 and React 19
- Uses Monaco Editor for code editing
- Tailwind CSS for styling
- TypeScript for type safety
- Piston API for code execution
- Responsive design for all screen sizes
