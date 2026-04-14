import React from 'react';
import Header from './Header';
import Footer from './Footer';

import './App.css';

function App() {
  const title = "Welcome to React World";
  const tagline="Code.Create.Innovate"
  const copyright=`\u00A9 2026 Creative CodecraftLtd`;

  return (
    <div className="App">
      <Header title={title}/>
      <Footer tagline={tagline} copyright={copyright}/>

    </div>
  );
}

export default App;
