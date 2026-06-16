import React, { Component } from 'react';

class ApiDataFetcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            loading: true,
            error: null,
            searchQuery: '',
        };
    }

    // 1️⃣ Runs when component loads
    componentDidMount() {
        this.fetchData();
    }

    // 2️⃣ Fetch API
    fetchData = () => {
        this.setState({ loading: true });

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    filteredData: data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    error: 'Error fetching data',
                    loading: false
                });
            });
    };

    // 3️⃣ Runs when searchQuery changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery) {
            this.filterData();
        }
    }

    // 4️⃣ Filter logic
    filterData = () => {
        const { data, searchQuery } = this.state;

        const filteredData = data.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.setState({ filteredData });
    };

    // 5️⃣ Input change
    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    // 6️⃣ Refresh button
    handleRefresh = () => {
        this.fetchData();
    };

    render() {

        const { filteredData, loading, error, searchQuery } = this.state;

        return (
            <div className="api-data-fetcher">

                <h1>API Data Fetcher</h1>

                {/* Loading */}
                {loading && <p>Loading...</p>}

                {/* Error */}
                {error && <p>{error}</p>}

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                />

                {/* Refresh */}
                <button onClick={this.handleRefresh}>
                    Refresh Data
                </button>

                {/* Table */}
                {filteredData.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* No Data */}
                {filteredData.length === 0 && !loading && !error && (
                    <p>No results found.</p>
                )}

            </div>
        );
    }
}

export default ApiDataFetcher;