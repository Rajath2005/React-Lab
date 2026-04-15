import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

const CodeViewer = ({ sourceFiles, selectedFileIndex, onSelectFile }) => {
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFileContent = async () => {
      if (!sourceFiles || sourceFiles.length === 0) return;

      // Ensure index is within bounds
      const safeIdx = Math.min(selectedFileIndex, sourceFiles.length - 1);
      const file = sourceFiles[safeIdx];
      if (!file) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/sources/${file.path}`);
        if (!response.ok) throw new Error('File not found');
        const content = await response.text();
        setFileContent(content);
        
        // Highlight code after state update
        setTimeout(() => {
          Prism.highlightAll();
        }, 0);
      } catch (err) {
        setError(`Could not load ${file.filename}. Make sure the file path is correct.`);
        setFileContent('');
      } finally {
        setLoading(false);
      }
    };

    loadFileContent();
  }, [sourceFiles, selectedFileIndex]);

  if (!sourceFiles || sourceFiles.length === 0) {
    return (
      <div className="code-panel">
        <div className="code-content">
          <div style={{ color: 'var(--text-secondary)' }}>No source files available</div>
        </div>
      </div>
    );
  }

  // Ensure selectedFileIndex is within bounds
  const safeIndex = Math.min(selectedFileIndex, sourceFiles.length - 1);
  const currentFile = sourceFiles[safeIndex];
  
  if (!currentFile) {
    return (
      <div className="code-panel">
        <div className="code-content">
          <div style={{ color: 'var(--text-secondary)' }}>No file selected</div>
        </div>
      </div>
    );
  }

  const isCSS = currentFile.filename.endsWith('.css');
  const language = isCSS ? 'css' : 'javascript';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="code-panel">
      <div className="code-header">
        <select
          className="file-selector"
          value={safeIndex}
          onChange={(e) => {
            onSelectFile(parseInt(e.target.value));
          }}
        >
          {sourceFiles.map((file, idx) => (
            <option key={idx} value={idx}>
              {file.filename}
            </option>
          ))}
        </select>
        <button className="copy-button" onClick={copyToClipboard}>
          Copy
        </button>
      </div>

      <div className="code-content">
        {loading && <div style={{ color: 'var(--text-secondary)' }}>Loading...</div>}
        {error && <div style={{ color: 'var(--error)' }}>{error}</div>}
        {fileContent && !error && (
          <pre className={`language-${language}`}>
            <code className={`language-${language}`}>{fileContent}</code>
          </pre>
        )}
        {!fileContent && !loading && !error && (
          <div style={{ color: 'var(--text-secondary)' }}>No content to display</div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
