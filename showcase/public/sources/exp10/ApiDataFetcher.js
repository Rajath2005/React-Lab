import React, { Component } from "react";

class ApiDataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      loading: true,
      error: null,
      searchQuery: ""
    };
  }

  // Load data
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
          filteredData: data,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: "Error fetching data", loading: false });
      });
  }

  // Update when search changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.filterData();
    }
  }

  // Filter logic
  filterData = () => {
    const { data, searchQuery } = this.state;

    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ filteredData });
  };

  // Input change
  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { filteredData, loading, error, searchQuery } = this.state;

    return (
      <div>
        <h2>API Data</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={this.handleSearchChange}
        />

        <ul>
          {filteredData.map(item => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>

        {filteredData.length === 0 && <p>No results</p>}
      </div>
    );
  }
}

export default ApiDataFetcher;