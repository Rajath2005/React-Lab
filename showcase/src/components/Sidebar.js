import React from 'react';
import { FiGithub } from 'react-icons/fi';

const Sidebar = ({ experiments, activeExperiment, onSelectExperiment }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">React Lab</div>
        <div className="sidebar-links">
          <span>v1.0</span>
          <a href="https://github.com/Rajath2005/React-Lab" target="_blank" rel="noopener noreferrer">
            <FiGithub size={16} />
          </a>
        </div>
      </div>
      <div className="experiment-list">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className={`experiment-item ${activeExperiment?.id === exp.id ? 'active' : ''}`}
            onClick={() => onSelectExperiment(exp)}
          >
            <div className="experiment-number">Exp {exp.number}</div>
            <div className="experiment-name">{exp.title}</div>
            <div className="experiment-desc">{exp.description}</div>
            <div className="experiment-concepts">
              {exp.concepts.slice(0, 2).map((concept, idx) => (
                <span key={idx} className="concept-tag">
                  {concept}
                </span>
              ))}
              {exp.concepts.length > 2 && (
                <span className="concept-tag">+{exp.concepts.length - 2}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
