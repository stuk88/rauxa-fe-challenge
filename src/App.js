import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
        user: '',
        gh_user_handle: null,
        results: []
    };

  }

  handleUserTyped = (e) => {
    this.setState({user: e.target.value});
  }

  searchGithub = async () => {
    try {
      var user_req = await fetch(`https://api.github.com/users/${this.state.user}`);
      var user = await user_req.json();
      var followers_req = await fetch(`https://api.github.com/users/${this.state.user}/followers`);
      var followers = await followers_req.json();

    
      this.setState({
        gh_user_handle: user,
        results: {user, followers}
      });
    } catch(e) {
      console.log(e);
    }

  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Github Search</h1>
        </header>
        <div className="App-intro">
          <form onSubmit={this.searchGithub}>
            <input type="text" value={this.state.user} onChange={this.handleUserTyped} /> 
            <input type="button" value="Send" onClick={this.searchGithub} /> 
          </form>
          {this.state.results && 
            <div className="results">
              {JSON.stringify(this.state.results)}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
