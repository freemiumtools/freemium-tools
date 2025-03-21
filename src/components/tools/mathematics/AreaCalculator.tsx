import React, { useState, useEffect } from 'react';
import { Square } from 'lucide-react';
import { createRoot } from 'react-dom/client';

type Shape = 'square' | 'rectangle' | 'circle' | 'triangle';

interface AreaResult {
  area: number;
  formula: string;
  dimensionsText: string;
  shape: string;
}

const AreaCalculator: React.FC = () => {
  const [shape, setShape] = useState<Shape>('square');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    radius: '',
    base: '',
    height: '',
  });
  const [result, setResult] = useState<AreaResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateArea = () => {
    setError(null);
    
    try {
      // Validation
      if (shape === 'square' && !dimensions.length) {
        setError('Please enter the length of the square');
        return;
      }
      if (shape === 'rectangle' && (!dimensions.length || !dimensions.width)) {
        setError('Please enter both length and width');
        return;
      }
      if (shape === 'circle' && !dimensions.radius) {
        setError('Please enter the radius');
        return;
      }
      if (shape === 'triangle' && (!dimensions.base || !dimensions.height)) {
        setError('Please enter both base and height');
        return;
      }
      
      let area = 0;
      let formula = '';
      let dimensionsText = '';

      switch (shape) {
        case 'square':
          area = parseFloat(dimensions.length) ** 2;
          formula = 'A = side²';
          dimensionsText = `side = ${dimensions.length}`;
          break;
        case 'rectangle':
          area = parseFloat(dimensions.length) * parseFloat(dimensions.width);
          formula = 'A = length × width';
          dimensionsText = `length = ${dimensions.length}, width = ${dimensions.width}`;
          break;
        case 'circle':
          area = Math.PI * (parseFloat(dimensions.radius) ** 2);
          formula = 'A = πr²';
          dimensionsText = `radius = ${dimensions.radius}`;
          break;
        case 'triangle':
          area = (parseFloat(dimensions.base) * parseFloat(dimensions.height)) / 2;
          formula = 'A = (base × height) ÷ 2';
          dimensionsText = `base = ${dimensions.base}, height = ${dimensions.height}`;
          break;
      }

      if (isNaN(area)) {
        setError('Please enter valid numeric values');
        return;
      }

      setResult({
        area, 
        formula, 
        dimensionsText,
        shape: shape.charAt(0).toUpperCase() + shape.slice(1)
      });
    } catch (err) {
      setError('An error occurred during calculation');
      console.error(err);
    }
  };

  // Output component to be rendered in the tool page
  const ResultDisplay = () => {
    if (error) {
      return (
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">Error</p>
          <p>{error}</p>
        </div>
      );
    } else if (result) {
      return (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-4">Area Calculation Result</p>
          <p className="text-3xl text-blue-600 mb-4">{result.area.toFixed(2)} square units</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Shape: {result.shape}</p>
            <p className="text-sm text-gray-600 mb-2">Formula: {result.formula}</p>
            <p className="text-sm text-gray-600">Dimensions: {result.dimensionsText}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center text-gray-500">
          Enter dimensions and click Calculate to see results
        </div>
      );
    }
  };

  // Update the tool-output element using React
  useEffect(() => {
    const outputElement = document.getElementById('tool-output');
    if (outputElement) {
      // Clear the output element
      outputElement.innerHTML = '';
      
      // Create a root div for React to render into
      const rootDiv = document.createElement('div');
      outputElement.appendChild(rootDiv);
      
      // Use createRoot API to render the component
      const root = createRoot(rootDiv);
      root.render(<ResultDisplay />);
    }
  }, [result, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimensions({
      ...dimensions,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Shape
        </label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value as Shape)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="square">Square</option>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </select>
      </div>

      {/* Dynamic input fields based on shape */}
      {shape === 'square' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Length
          </label>
          <input
            type="number"
            name="length"
            value={dimensions.length}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter length"
          />
        </div>
      )}

      {shape === 'rectangle' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <input
              type="number"
              name="length"
              value={dimensions.length}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter length"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <input
              type="number"
              name="width"
              value={dimensions.width}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter width"
            />
          </div>
        </>
      )}

      {shape === 'circle' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Radius
          </label>
          <input
            type="number"
            name="radius"
            value={dimensions.radius}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter radius"
          />
        </div>
      )}

      {shape === 'triangle' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base
            </label>
            <input
              type="number"
              name="base"
              value={dimensions.base}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter base"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="number"
              name="height"
              value={dimensions.height}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter height"
            />
          </div>
        </>
      )}

      <button
        onClick={calculateArea}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Calculate Area
      </button>
    </div>
  );
};

export default AreaCalculator;