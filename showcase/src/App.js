import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExperimentPanel from './components/ExperimentPanel';
import experiments from './data/experiments.json';
import './styles/App.css';
import './styles/CodeViewer.css';

function App() {
  const [activeExperiment, setActiveExperiment] = useState(experiments[0]);

  const handleSelectExperiment = (experiment) => {
    setActiveExperiment(experiment);
  };

  return (
    <div className="app-container">
      <Sidebar
        experiments={experiments}
        activeExperiment={activeExperiment}
        onSelectExperiment={handleSelectExperiment}
      />
      <ExperimentPanel experiment={activeExperiment} />
    </div>
  );
}

export default App;
