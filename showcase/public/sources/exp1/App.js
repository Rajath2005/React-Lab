import React,{ useState } from 'react';
import './App.css';

function App() {
  const[text,setText]=useState();
  const handleChange=(event)=>{
    setText(event.target.value);
    
  }
  return (
    <div className="App">
      <h3 style={{textAlign:'center',marginTop:'20px'}}>4VP23CS070</h3>
      <h1>Hello VCET</h1>
      <input type="text" value={text} onChange={handleChange} placeholder='Type Something..'></input>

      <h1>{text || "Type Something..."}</h1>


    </div>
  );
}

export default App;
