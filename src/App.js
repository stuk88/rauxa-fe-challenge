import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
        username: '',
        user: null,
        followers: null,
        hasResults: false
    };

  }

  handleUserTyped = (e) => {
    this.setState({username: e.target.value});
  }

  searchGithub = async () => {
    try {
      var user_req = await fetch(`https://api.github.com/users/${this.state.username}`);
      var user = await user_req.json();
      var followers_req = await fetch(`https://api.github.com/users/${this.state.username}/followers`);
      var followers = await followers_req.json();
    
      this.setState({
        user,
        followers,
        hasResults: true
      });
    } catch(e) {
      console.log(e);
      this.setState({
        hasResults: false
      })
    }

  } 

  const Follower = (props) => {
    return (
            <a href={props.user.url} target="_blank">
                {props.user.login} 
                <img style={{width:'150px',height: '150px'}} src={props.user.avatar_url} />
              </a>
      )
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
          {this.state.hasResults && 
            <div className="results">
                User: {this.state.user.login} Followers: {this.state.user.followers}<br/>
              <a href={this.state.user.url} target="_blank">
                <img style={{width:'150px',height: '150px'}} src={this.state.user.avatar_url} />
              </a>
              {this.state.followers.length > 0 &&
                <div className="followers">
                  {this.state.followers.map((follower) => {
                      <Follower user={follower} />
                  })}
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
