import React, { useState, useMemo, useCallback, memo } from 'react';

// ✅ Child component wrapped with React.memo
// It will only re-render if props change (optimizes performance)
const ExpensiveChild = memo(({ onClick, count }) => {
  console.log('Rendering ExpensiveChild...');
  return (
    <div>
      <p>Child Count: {count}</p>
      <button onClick={onClick}>Increment from Child</button>
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ✅ useMemo caches the result of an expensive computation
  const doubleCount = useMemo(() => {
    console.log('Calculating doubleCount...');
    return count * 2;
  }, [count]); // Only re-computes when `count` changes

  // ✅ useCallback memoizes the function
  // Prevents child from re-rendering unless `count` changes
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // No dependencies means same function instance every render

  return (
    <div>
      <h1>React Memoization Example</h1>
      <p>Count: {count}</p>
      <p>Double Count (memoized): {doubleCount}</p>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
      />

      {/* Passing memoized callback and count to child */}
      <ExpensiveChild onClick={increment} count={count} />
    </div>
  );
};

export default App;
