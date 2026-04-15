import './App.css';
import React, { useState } from 'react';
function App() {
  const [counter, SetCounter] = useState(0);
  const [step, SetStep] = useState(1);
  const minvalue = 0;

  const increment = () => {
    SetCounter(counter + step);
  }
  const decerement = () => {
    if (counter - step > minvalue) {
      SetCounter(counter - step);
    }
  }
  const reset = () => {
    SetCounter(0);
  }
  const handleChange = (event) => {
    const value = Number(event.target.value);
    SetStep(value);
  }
  return (
    <div className="App">
      <h1>Counter Application</h1>
      <div className='Counter-App'>
        <h2>{counter}</h2>
        <div className='Controls'>
          <button onClick={increment}>Increase</button>
          <button onClick={decerement}>Decrease</button>
          <button onClick={reset}>Reset</button>
          <div className='step-counter'>
            <label>
              Step:
              <input type="number" value={step} onChange={handleChange}></input>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
