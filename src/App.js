import React, { Component } from 'react';
import GitUser from './GitUser';
import './App.css';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
        username: '',
        searched: false
    };

  }

  handleUserTyped = (e) => {
    this.setState({username: e.target.value});
  }

  searchGithub = async (e) => {
    e.preventDefault();

      this.setState({
        searched: true
      });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Github Search</h1>
          <form onSubmit={this.searchGithub}>
            <input type="text" value={this.state.username} onChange={this.handleUserTyped} /> 
            <input type="button" value="Search" onClick={this.searchGithub} /> 
          </form>
        </header>
        {this.state.searched && 
          <GitUser username={this.state.username} />
        }
      </div>
    );
  }
}

export default App;
