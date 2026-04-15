import React from 'react';

const DemoFrame = ({ experiment }) => {
  if (!experiment) {
    return (
      <div className="demo-panel">
        <div className="demo-frame-container">
          <div className="demo-loading">Select an experiment to view the demo</div>
        </div>
      </div>
    );
  }

  const demoSrc = `demos/${experiment.id}.html`;

  return (
    <div className="demo-panel">
      <div className="demo-header">
        Live Demo - {experiment.title}
      </div>
      <iframe
        key={experiment.id}
        src={demoSrc}
        title={`${experiment.id} Demo`}
        className="demo-frame"
      />
    </div>
  );
};

export default DemoFrame;
