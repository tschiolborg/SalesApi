import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  let [output, setOutput] = React.useState("");

  React.useEffect(() => {
    fetch("/test")
      .then(res => res.json())
      .then(data => setOutput(data.text))
  })

  return (
    <div className="App">
      <header className="App-header">
        <pre>sales_api</pre>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <p>Test connection with API:</p>
          <h3>{output}</h3>
        </div>

      </header>
    </div>
  );
}

export default App;
