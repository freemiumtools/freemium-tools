import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { createRoot } from 'react-dom/client';

// Safe expression evaluator
const safeEval = (expression: string): number => {
  // Define a whitelist of allowed characters 
  const validChars = /^[0-9+\-*/(). ]*$/;
  
  if (!validChars.test(expression)) {
    throw new Error("Invalid characters in expression");
  }
  
  // Replace common functions with their Math equivalents
  expression = expression
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/pi/g, 'Math.PI');
  
  try {
    // Still using Function but with much better security
    return Function('"use strict"; return (' + expression + ')')();
  } catch (error) {
    throw new Error("Invalid expression");
  }
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<{
    result?: string;
    error?: string;
    expression?: string;
  }>({ result: undefined, error: undefined, expression: undefined });

  const handleCalculate = () => {
    try {
      if (!input.trim()) {
        setOutput({ error: "Please enter an expression" });
        return;
      }
      
      const calculatedResult = safeEval(input);
      setOutput({
        result: calculatedResult.toString(),
        expression: input,
        error: undefined
      });
    } catch (err) {
      setOutput({
        error: err instanceof Error ? err.message : "Invalid expression",
        result: undefined,
        expression: input
      });
    }
  };

  const handleButtonClick = (value: string) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setOutput({ result: undefined, error: undefined, expression: undefined });
  };

  // Output component to be rendered in the tool page
  const OutputDisplay = () => {
    if (output.error) {
      return (
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">Error</p>
          <p>{output.error}</p>
        </div>
      );
    } else if (output.result) {
      return (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">Result</p>
          <p className="text-3xl text-blue-600">{output.result}</p>
          <p className="text-sm text-gray-500 mt-2">Expression: {output.expression}</p>
        </div>
      );
    } else {
      return (
        <div className="text-center text-gray-500">
          Results will appear here
        </div>
      );
    }
  };

  useEffect(() => {
    // Update the output section using modern React patterns
    const outputElement = document.getElementById('tool-output');
    if (outputElement) {
      // Clear the output element
      outputElement.innerHTML = '';
      
      // Create a root div for React to render into
      const rootDiv = document.createElement('div');
      outputElement.appendChild(rootDiv);
      
      // Use createRoot API to render the component
      const root = createRoot(rootDiv);
      root.render(<OutputDisplay />);
    }
  }, [output]);

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 text-right text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* Numbers and operators */}
        <button onClick={() => handleButtonClick('7')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">7</button>
        <button onClick={() => handleButtonClick('8')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">8</button>
        <button onClick={() => handleButtonClick('9')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">9</button>
        <button onClick={() => handleButtonClick('/')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800">/</button>
        
        <button onClick={() => handleButtonClick('4')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">4</button>
        <button onClick={() => handleButtonClick('5')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">5</button>
        <button onClick={() => handleButtonClick('6')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">6</button>
        <button onClick={() => handleButtonClick('*')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800">×</button>
        
        <button onClick={() => handleButtonClick('1')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">1</button>
        <button onClick={() => handleButtonClick('2')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">2</button>
        <button onClick={() => handleButtonClick('3')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">3</button>
        <button onClick={() => handleButtonClick('-')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800">-</button>
        
        <button onClick={() => handleButtonClick('0')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">0</button>
        <button onClick={() => handleButtonClick('.')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200 text-gray-800">.</button>
        <button onClick={handleClear} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-red-100 hover:bg-red-200 text-red-600">C</button>
        <button onClick={() => handleButtonClick('+')} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-800">+</button>
        
        <button onClick={handleCalculate} className="px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-200 col-span-4 bg-blue-500 text-white hover:bg-blue-600">=</button>
      </div>
    </div>
  );
};

export default Calculator;