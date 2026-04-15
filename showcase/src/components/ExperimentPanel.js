import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';
import DemoFrame from './DemoFrame';

const ExperimentPanel = ({ experiment }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  // Reset file index when experiment changes
  useEffect(() => {
    setSelectedFileIndex(0);
  }, [experiment?.id]);

  if (!experiment) {
    return (
      <div className="content-area">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          Select an experiment from the sidebar
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="content-header">
        <div>
          <span className="header-number">Exp {experiment.number}</span>
          <span style={{ marginLeft: '12px' }} className="header-title">
            {experiment.title}
          </span>
        </div>
      </div>
      <div className="experiment-panels">
        <CodeViewer
          sourceFiles={experiment.sourceFiles}
          selectedFileIndex={selectedFileIndex}
          onSelectFile={setSelectedFileIndex}
        />
        <DemoFrame experiment={experiment} />
      </div>
    </div>
  );
};

export default ExperimentPanel;
