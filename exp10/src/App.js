import React, { useState, useEffect } from "react";
import "./App.css";

const ApiDataFetcher = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data on mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  // Filter data when search query changes
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  return (
    <div className="App">
      <h2>API Data</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <ul>
        {filteredData.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>

      {filteredData.length === 0 && !loading && <p>No results found</p>}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ApiDataFetcher />
    </div>
  );
};

export default App;