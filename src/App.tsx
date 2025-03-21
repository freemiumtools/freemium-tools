import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import CookieConsent from './components/CookieConsent';
import { Category } from './types';
import {
  Calculator,
  Square,
  Ruler,
  Percent,
  ArrowRight,
  ArrowLeftRight,
  Palette,
  Sun,
  Droplet,
  Gauge,
  Contrast,
  Type,
  AlignLeft,
  FileSearch,
  BarChart3,
  FileCode,
  Clock,
  Calendar,
  Image,
  Dice1,
  FileText,
  Code,
  Video
} from 'lucide-react';

const categories: Category[] = [
  {
    id: 'mathematics',
    title: 'MATHEMATICS',
    description: 'Tools for common mathematical tasks',
    icon: Calculator,
    tools: [
      { id: 'calculator', title: 'Calculator', description: 'Basic calculator for arithmetic operations', icon: Calculator },
      { id: 'area-calculator', title: 'Area calculator', description: 'Calculate area of various shapes', icon: Square },
      { id: 'percentage-calculator', title: 'Percentage calculator', description: 'Calculate percentages and ratios', icon: Percent },
      { id: 'single-rule-direct', title: 'Single rule of three direct', description: 'Calculate direct proportions', icon: ArrowRight },
      { id: 'single-rule-inverse', title: 'Single rule of three inverse', description: 'Calculate inverse proportions', icon: ArrowLeftRight },
    ]
  },
  {
    id: 'colors',
    title: 'COLORS',
    description: 'Color picker, tools for modifying or generating colors',
    icon: Palette,
    tools: [
      { id: 'lighten-color', title: 'Lighten color', description: 'Make colors lighter', icon: Sun },
      { id: 'darken-color', title: 'Darken color', description: 'Make colors darker', icon: Droplet },
      { id: 'saturate-color', title: 'Change color saturation', description: 'Modify color saturation', icon: Gauge },
      { id: 'greyscale-color', title: 'Greyscale/desaturate a color', description: 'Convert to greyscale', icon: Contrast },
      { id: 'invert-color', title: 'Invert a color', description: 'Invert color values', icon: ArrowLeftRight },
    ]
  },
  {
    id: 'text-and-lists',
    title: 'TEXT AND LISTS',
    description: 'Work with lists and texts, sort, randomize, reverse',
    icon: Type,
    tools: [
      { id: 'reverse-list', title: 'Reverse list', description: 'Reverse the order of items', icon: ArrowLeftRight },
      { id: 'list-randomizer', title: 'List randomizer', description: 'Randomize list order', icon: Dice1 },
      { id: 'sort-list', title: 'Sort list', description: 'Sort items alphabetically', icon: AlignLeft },
      { id: 'add-line-text', title: 'Add text to each line', description: 'Add prefix/suffix to lines', icon: Type },
      { id: 'remove-whitespace', title: 'Remove extra whitespaces', description: 'Clean up text spacing', icon: FileText },
    ]
  },
  {
    id: 'numbers',
    title: 'NUMBERS',
    description: 'Work with numbers, generate, filter, sort',
    icon: Calculator,
    tools: [
      { id: 'generate-numbers', title: 'Generate list of numbers', description: 'Create number sequences', icon: BarChart3 },
      { id: 'filter-numbers', title: 'Filter numbers', description: 'Filter numeric values', icon: FileSearch },
      { id: 'sort-numbers', title: 'Sort numbers', description: 'Sort numeric values', icon: ArrowLeftRight },
      { id: 'min-max-list', title: 'Minimum and maximum of a list', description: 'Find min/max values', icon: Calculator },
      { id: 'average-list', title: 'Average of a list', description: 'Calculate average value', icon: Calculator },
    ]
  },
  {
    id: 'date-and-time',
    title: 'DATE AND TIME',
    description: 'Measure time, calculate distance between dates, chronometers',
    icon: Clock,
    tools: [
      { id: 'date-diff', title: 'Date/time difference', description: 'Calculate time between dates', icon: Calendar },
      { id: 'add-date', title: 'Add to a date', description: 'Add time to date', icon: Calendar },
      { id: 'subtract-date', title: 'Subtract from a date', description: 'Subtract time from date', icon: Calendar },
      { id: 'timer', title: 'Timer', description: 'Countdown timer', icon: Clock },
      { id: 'stopwatch', title: 'Stopwatch', description: 'Time measurement', icon: Clock },
    ]
  },
  {
    id: 'images',
    title: 'IMAGES',
    description: 'Resize images, crop, optimize and more',
    icon: Image,
    tools: [
      { id: 'invert-colors', title: 'Invert colors', description: 'Invert image colors', icon: Contrast },
      { id: 'flip-image', title: 'Flip image', description: 'Mirror image', icon: ArrowLeftRight },
      { id: 'darken-image', title: 'Darken image', description: 'Make image darker', icon: Droplet },
      { id: 'lighten-image', title: 'Lighten image', description: 'Make image lighter', icon: Sun },
      { id: 'brightness', title: 'Change brightness', description: 'Adjust image brightness', icon: Sun },
    ]
  },
  {
    id: 'randomness',
    title: 'RANDOMNESS',
    description: 'Generate random numbers, randomize lists, common distributions',
    icon: Dice1,
    tools: [
      { id: 'random-number', title: 'Random number generator', description: 'Generate random numbers', icon: Calculator },
      { id: 'coin-flip', title: 'Coin flipper', description: 'Flip a virtual coin', icon: Dice1 },
      { id: 'dice-roll', title: 'Dice roller', description: 'Roll virtual dice', icon: Dice1 },
      { id: 'gaussian-random', title: 'Gaussian random number generator', description: 'Normal distribution', icon: Calculator },
      { id: 'password-gen', title: 'Password generator', description: 'Generate secure passwords', icon: FileText },
    ]
  },
  {
    id: 'files',
    title: 'FILES',
    description: 'Convert, compress, join or split',
    icon: FileText,
    tools: [
      { id: 'split-files', title: 'Split files', description: 'Split files into parts', icon: FileText },
      { id: 'join-files', title: 'Join files', description: 'Combine multiple files', icon: FileText },
      { id: 'base64-encode', title: 'Base64 encode', description: 'Encode files to Base64', icon: FileCode },
      { id: 'base64-decode', title: 'Base64 decode', description: 'Decode Base64 to files', icon: FileCode },
      { id: 'random-file', title: 'Random file generator', description: 'Generate random files', icon: FileText },
    ]
  },
  {
    id: 'programming',
    title: 'PROGRAMMING',
    description: 'Tools for programming and web development',
    icon: Code,
    tools: [
      { id: 'syntax-highlight', title: 'Syntax highlighter', description: 'Highlight code syntax', icon: Code },
      { id: 'css-minify', title: 'CSS minifier', description: 'Minify CSS code', icon: Code },
      { id: 'json-format', title: 'JSON formatter', description: 'Format JSON data', icon: FileCode },
      { id: 'css-beautify', title: 'CSS beautifier', description: 'Format CSS code', icon: Code },
      { id: 'html-beautify', title: 'HTML beautifier', description: 'Format HTML code', icon: Code },
    ]
  },
  {
    id: 'videos',
    title: 'VIDEOS',
    description: 'Tools for creating, editing, cropping, trimming and merging videos',
    icon: Video,
    tools: [
      { id: 'screen-record', title: 'Screen recorder', description: 'Record your screen', icon: Video },
    ]
  }
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage categories={categories} />} />
        <Route path="/tool/:categoryId/:toolId" element={<ToolPage categories={categories} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy categories={categories} />} />
        <Route path="/terms-of-service" element={<TermsOfService categories={categories} />} />
        <Route path="/cookie-policy" element={<CookiePolicy categories={categories} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </Router>
  );
}

export default App;