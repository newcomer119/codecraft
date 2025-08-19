# CodeCraft Courses System

## 🎯 Overview

The CodeCraft Courses System provides an interactive learning platform where users can:
- Learn programming through structured lessons
- Write and execute code in real-time using Monaco Editor
- Run automated tests against their solutions
- Compare their code with model solutions
- Track progress through courses

## 🏗️ Architecture

### File Structure
```
src/app/courses/
├── page.tsx                    # Main courses overview page
├── [courseId]/
│   ├── page.tsx               # Course overview page
│   ├── lessons/
│   │   ├── data.ts            # Lesson data and test cases
│   │   ├── [lessonId]/
│   │   │   ├── page.tsx       # Individual lesson page
│   │   │   └── loading.tsx    # Loading skeleton
│   │   └── components/
│   │       ├── CodeEditor.tsx # Monaco Editor with Piston API
│   │       └── TestRunner.tsx # Automated test execution
```

## 🚀 Features

### 1. Monaco Editor Integration
- **Syntax highlighting** for Python, JavaScript, Java
- **Auto-completion** and **IntelliSense**
- **Error detection** and **formatting**
- **Multiple file tabs** (main.py, test.py, solution.py)

### 2. Real Code Execution
- **Piston API integration** for Python execution
- **Real-time output** and error handling
- **Sandboxed execution** for security

### 3. Automated Testing
- **Test case execution** against user code
- **Real-time results** with pass/fail indicators
- **Hidden test cases** for comprehensive validation

### 4. Progress Tracking
- **Lesson completion** tracking
- **Test results** persistence
- **Course navigation** between lessons

## 📝 Adding New Lessons

### 1. Update Lesson Data (`data.ts`)
```typescript
{
  id: "new-lesson-id",
  title: "Lesson Title",
  description: "Lesson description",
  problem: {
    statement: "Problem description",
    examples: [{ input: "...", output: "..." }],
    constraints: ["Constraint 1", "Constraint 2"],
    starterCode: "// Starter code here",
    language: 'python'
  },
  tests: [
    {
      name: "Test Name",
      input: "function_call(input)",
      expectedOutput: "expected_result",
      isHidden: false
    }
  ],
  solution: "// Model solution code",
  hints: ["Hint 1", "Hint 2"],
  difficulty: 'easy' // 'easy' | 'medium' | 'hard'
}
```

### 2. Test Case Guidelines
- **Visible tests**: Basic functionality validation
- **Hidden tests**: Edge cases and error handling
- **Input format**: Function calls with parameters
- **Expected output**: Exact string match

### 3. Starter Code Best Practices
- Provide function skeleton with `pass` statement
- Include example usage in comments
- Set up basic imports if needed
- Use clear variable names

## 🔧 Adding New Courses

### 1. Create Course Directory
```bash
mkdir src/app/courses/[courseName]
```

### 2. Copy Structure
- Copy the DSA course structure
- Update course-specific content
- Modify lesson data for new topics

### 3. Update Main Courses Page
- Add new course to the courses array
- Include course metadata and description

## 🎨 Customization

### 1. Editor Themes
Monaco Editor supports multiple themes:
- `vs-dark` (default)
- `vs-light`
- `hc-black`
- `hc-light`

### 2. Language Support
Currently supported:
- Python (3.10.0)
- JavaScript (Node.js)
- Java (OpenJDK)

### 3. Test Execution
- Modify `executePythonCode` function for different languages
- Add custom test validation logic
- Implement performance testing

## 🚨 Security Considerations

### 1. Code Execution
- **Piston API** provides sandboxed execution
- **Timeout limits** prevent infinite loops
- **Resource restrictions** on memory and CPU

### 2. Input Validation
- **Sanitize user inputs** before execution
- **Validate test cases** for malicious content
- **Rate limiting** on API calls

## 🔍 Troubleshooting

### Common Issues

1. **Monaco Editor not loading**
   - Check if `@monaco-editor/react` is installed
   - Verify dynamic import is working
   - Check browser console for errors

2. **Code execution failing**
   - Verify Piston API is accessible
   - Check network connectivity
   - Validate Python syntax in user code

3. **Tests not running**
   - Ensure test input format matches expected
   - Check function name in user code
   - Verify test case structure

### Debug Mode
Enable debug logging in browser console:
```typescript
// Add to components for debugging
console.log('Code execution:', code);
console.log('Test results:', results);
```

## 📈 Performance Optimization

### 1. Code Execution
- **Debounce** rapid code execution requests
- **Cache** successful test results
- **Optimize** test case execution order

### 2. Editor Performance
- **Lazy load** Monaco Editor
- **Minimize** re-renders
- **Optimize** large code files

## 🔮 Future Enhancements

### 1. Advanced Features
- **Multi-language support** (C++, Rust, Go)
- **Collaborative coding** sessions
- **Code review** and feedback system
- **Performance profiling** tools

### 2. Learning Analytics
- **Progress tracking** across courses
- **Skill assessment** algorithms
- **Personalized recommendations**
- **Learning path optimization**

### 3. Community Features
- **Discussion forums** per lesson
- **Code sharing** and examples
- **Peer mentoring** system
- **Achievement badges**

## 📚 Resources

- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [Piston API Documentation](https://emkc.org/docs/piston/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** new lessons or courses
4. **Test** thoroughly
5. **Submit** a pull request

## 📄 License

This project is licensed under the MIT License.
