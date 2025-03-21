import React, { useState, useEffect } from 'react';
import { Heart, Share2, RotateCw, Facebook, Twitter, Linkedin } from 'lucide-react';
import { createRoot } from 'react-dom/client';

interface FlamesResult {
  relationship: string;
  description: string;
  icon: string;
  color: string;
  steps: string[];
  count: number;
}

const FlamesCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<FlamesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  // Process names to remove special characters and spaces
  const processName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z]/g, '');
  };

  // FLAMES algorithm implementation
  const calculateFlames = () => {
    // Reset previous results and errors
    setError(null);
    setResult(null);

    // Validate inputs
    if (!name1.trim()) {
      setError('Please enter the first name');
      return;
    }

    if (!name2.trim()) {
      setError('Please enter the second name');
      return;
    }

    // Process names
    const processedName1 = processName(name1);
    let processedName2 = processName(name2);

    if (processedName1.length === 0 || processedName2.length === 0) {
      setError('Names must contain at least one letter');
      return;
    }

    // Find uncommon letters
    const remainingLetters = [...processedName1, ...processedName2];
    const steps: string[] = [];
    
    // Track letters to be removed
    const lettersToRemove: string[] = [];
    
    // Find common letters
    for (let i = 0; i < processedName1.length; i++) {
      const char = processedName1[i];
      const indexInName2 = processedName2.indexOf(char);
      
      if (indexInName2 !== -1) {
        // Mark these positions for removal (from both names)
        lettersToRemove.push(`${char} at position ${i+1} in name 1`);
        lettersToRemove.push(`${char} at position ${indexInName2+1} in name 2`);
        
        // Remove this letter from name2 to avoid double-counting
        const tempArray = processedName2.split('');
        tempArray.splice(indexInName2, 1);
        processedName2 = tempArray.join('');
      }
    }
    
    // Record the process
    if (lettersToRemove.length > 0) {
      steps.push(`Common letters removed: ${lettersToRemove.join(', ')}`);
    } else {
      steps.push('No common letters found between the names');
    }
    
    // Remove common letters
    let name1Array = processedName1.split('');
    let name2Array = processedName2.split('');
    
    for (let i = 0; i < name1Array.length; i++) {
      const char = name1Array[i];
      const indexInName2 = name2Array.indexOf(char);
      
      if (indexInName2 !== -1) {
        name1Array[i] = '';
        name2Array[indexInName2] = '';
      }
    }
    
    const remainingName1 = name1Array.filter(char => char !== '').join('');
    const remainingName2 = name2Array.filter(char => char !== '').join('');
    
    steps.push(`Remaining letters in first name: ${remainingName1 || 'None'}`);
    steps.push(`Remaining letters in second name: ${remainingName2 || 'None'}`);
    
    // Count remaining letters
    const count = remainingName1.length + remainingName2.length;
    steps.push(`Total remaining letters: ${count}`);
    
    if (count === 0) {
      // If all letters are common, set a default
      steps.push('All letters matched, defaulting to "Love"');
      setResult({
        relationship: 'Love',
        description: 'There\'s a romantic spark between you two!',
        icon: '❤️',
        color: 'text-red-500',
        steps,
        count: 0
      });
      return;
    }

    // FLAMES logic
    const flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
    const remainderIndex = (count % 6) - 1;
    const flamesIndex = remainderIndex < 0 ? 5 : remainderIndex; // If remainder is 0, use index 5
    
    steps.push(`${count} divided by 6 has a remainder of ${count % 6 || 6}`);
    steps.push(`This corresponds to "${flames[flamesIndex]}" in FLAMES`);
    
    // Relationship descriptions
    const relationships = [
      { type: 'Friends', desc: 'You both share a strong bond of friendship!', icon: '👫', color: 'text-blue-500' },
      { type: 'Love', desc: 'There\'s a romantic spark between you two!', icon: '❤️', color: 'text-red-500' },
      { type: 'Affection', desc: 'A caring and affectionate connection!', icon: '🤗', color: 'text-pink-500' },
      { type: 'Marriage', desc: 'Destined to be together forever!', icon: '💍', color: 'text-purple-500' },
      { type: 'Enemies', desc: 'Better stay away from each other!', icon: '⚔️', color: 'text-yellow-500' },
      { type: 'Siblings', desc: 'A strong sibling-like bond!', icon: '👪', color: 'text-green-500' }
    ];
    
    const relationship = relationships[flamesIndex];
    
    setResult({
      relationship: relationship.type,
      description: relationship.desc,
      icon: relationship.icon,
      color: relationship.color,
      steps,
      count
    });
  };

  // Share result on social media
  const shareResult = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    if (!result) return;
    
    const text = `Based on the Flames test, ${name1} and ${name2}'s relationship type is ${result.relationship}! ${result.description}`;
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  };

  const resetCalculator = () => {
    setName1('');
    setName2('');
    setResult(null);
    setError(null);
    setShowSteps(false);
  };

  // Custom ResultDisplay component to show in the tool output area
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
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="text-5xl mb-3 animate-pulse">{result.icon}</div>
            <h2 className={`text-2xl font-bold ${result.color} mb-2`}>{result.relationship}</h2>
            <p className="text-lg text-gray-700">{result.description}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button 
              onClick={() => shareResult('facebook')} 
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1877f2] text-white rounded-lg hover:bg-opacity-90"
            >
              <Facebook className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button 
              onClick={() => shareResult('twitter')} 
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#1da1f2] text-white rounded-lg hover:bg-opacity-90"
            >
              <Twitter className="w-4 h-4" />
              <span>Tweet</span>
            </button>
            <button 
              onClick={() => shareResult('linkedin')} 
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#0a66c2] text-white rounded-lg hover:bg-opacity-90"
            >
              <Linkedin className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <button 
              onClick={resetCalculator}
              className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <RotateCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <button 
              onClick={() => setShowSteps(!showSteps)}
              className="text-blue-500 hover:underline text-sm"
            >
              {showSteps ? 'Hide' : 'Show'} calculation steps
            </button>
            
            {showSteps && (
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">How we calculated this result:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                  {result.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center text-gray-500">
          Enter two names and click Calculate to see your FLAMES result!
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
  }, [result, error, showSteps]);

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900">FLAMES Calculator</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Find out your relationship type using the classic FLAMES method (Friends, Love, Affection, Marriage, Enemies, Siblings).
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name1">
          First Person's Name
        </label>
        <input
          type="text"
          id="name1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter first name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name2">
          Second Person's Name
        </label>
        <input
          type="text"
          id="name2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter second name"
        />
      </div>

      <button
        onClick={calculateFlames}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Heart className="w-4 h-4" />
        Calculate Relationship
      </button>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">What is FLAMES?</h3>
        <p className="text-xs text-gray-600">
          FLAMES is a fun relationship calculator game that predicts the relationship between two people. 
          The letters stand for Friends, Love, Affection, Marriage, Enemies, and Siblings.
          It works by counting the remaining letters after removing common letters from both names.
        </p>
      </div>
    </div>
  );
};

export default FlamesCalculator; 