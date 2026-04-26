import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface LatexRendererProps {
  text: string;
  block?: boolean;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ text, block = false }) => {
  if (!text) return null;

  // Simple heuristic to detect if the text is pure math without delimiters
  const isPureMath = (str: string) => {
    // If it contains typical math commands but no standard text other than \text{}
    if (str.includes('\\frac') || str.includes('\\pi') || str.includes('\\int') || str.includes('^') || str.includes('\\sqrt')) {
      // If it doesn't already have delimiters
      if (!str.includes('$') && !str.includes('\\(') && !str.includes('\\[')) {
        return true;
      }
    }
    return false;
  };

  // If it's pure math according to our heuristic, render it fully as KaTeX
  if (isPureMath(text)) {
    return block ? <BlockMath math={text} /> : <InlineMath math={text} />;
  }

  // Otherwise, we need to parse the mixed string.
  // Standard delimiters: $...$ or \(...\) for inline, $$...$$ or \[...\] for block
  
  // A simple regex parser to split text and math
  const parts = [];
  let currentText = '';
  let i = 0;
  
  while (i < text.length) {
    // Check for block math $$...$$
    if (text.substring(i, i+2) === '$$') {
      if (currentText) {
        parts.push({ type: 'text', content: currentText });
        currentText = '';
      }
      let end = text.indexOf('$$', i + 2);
      if (end === -1) end = text.length; // Unclosed
      parts.push({ type: 'block', content: text.substring(i + 2, end) });
      i = end + 2;
      continue;
    }
    
    // Check for block math \[...\]
    if (text.substring(i, i+2) === '\\[') {
      if (currentText) {
        parts.push({ type: 'text', content: currentText });
        currentText = '';
      }
      let end = text.indexOf('\\]', i + 2);
      if (end === -1) end = text.length; // Unclosed
      parts.push({ type: 'block', content: text.substring(i + 2, end) });
      i = end + 2;
      continue;
    }

    // Check for inline math $...$
    if (text[i] === '$' && text[i+1] !== '$') {
      if (currentText) {
        parts.push({ type: 'text', content: currentText });
        currentText = '';
      }
      let end = text.indexOf('$', i + 1);
      if (end === -1) end = text.length; // Unclosed
      parts.push({ type: 'inline', content: text.substring(i + 1, end) });
      i = end + 1;
      continue;
    }

    // Check for inline math \(...\)
    if (text.substring(i, i+2) === '\\(') {
      if (currentText) {
        parts.push({ type: 'text', content: currentText });
        currentText = '';
      }
      let end = text.indexOf('\\)', i + 2);
      if (end === -1) end = text.length; // Unclosed
      parts.push({ type: 'inline', content: text.substring(i + 2, end) });
      i = end + 2;
      continue;
    }

    currentText += text[i];
    i++;
  }

  if (currentText) {
    parts.push({ type: 'text', content: currentText });
  }

  // If we found no math parts, and it didn't pass the pure math heuristic, just return as text
  if (parts.length === 1 && parts[0].type === 'text') {
    return <span>{text}</span>;
  }

  return (
    <span className="latex-container flex flex-wrap items-center gap-x-1">
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.content}</span>;
        } else if (part.type === 'inline') {
          return <InlineMath key={index} math={part.content} />;
        } else if (part.type === 'block') {
          return (
            <span key={index} className="w-full flex justify-center my-2">
              <BlockMath math={part.content} />
            </span>
          );
        }
        return null;
      })}
    </span>
  );
};
