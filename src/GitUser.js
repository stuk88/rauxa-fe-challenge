import React, { Component } from 'react';


const Follower = ({user}) => {
  return (
    <div className="follower">
          <a href={user.url} target="_blank">
              <img style={{width:'150px',height: '150px'}} src={user.avatar_url} />
              {user.login} 
            </a>
    </div>
  )
}

class GitUser extends Component {

  constructor(props) {

    super(props);
    this.state = {
        user: null,
        followers: null,
        hasResults: false,
        pending: false,
        searched: false
    };
  }

  componentDidUpdate(prevProps) {
     if (prevProps.username !== this.props.username) {
  		this.searchGithub(this.props.username);
     }
   }

  componentDidMount() {
  	this.searchGithub(this.props.username);
  }

  searchGithub = async (username) => {

  	if(this.state.user.login == username)
  		return;

    this.setState({
      pending: true
    });

    try {
      var user_req = await fetch(`https://api.github.com/users/${username}`);
      if(!user_req.ok)
        throw new Error("user not found");
      
      var user = await user_req.json();
      var followers_req = await fetch(`https://api.github.com/users/${username}/followers`);
      var followers = await followers_req.json();
    
      this.setState({
        user,
        followers,
        hasResults: true,
        searched: true,
        pending: false
      });
    } catch(e) {
      console.log(e);
      this.setState({
        hasResults: false
      })
    }

  }

  render() {
		return (
			<div className="continaer info">
	        	{this.state.pending && 
	            	<div>Searching ...</div>
	        	}
	        	{this.state.hasResults && 
	            <div className="results">
                	<h2>User: {this.state.user.login} Followers: {this.state.user.followers}</h2>
					<a href={this.state.user.url} target="_blank">
						<img style={{width:'150px',height: '150px'}} src={this.state.user.avatar_url} />
					</a>
					{this.state.followers.length > 0 &&
						<div className="followers">
						  <h3>Followers</h3>
						  {this.state.followers.map((follower, i) => <Follower user={follower} key={i} />)}
						</div>
					}
	            </div>
            	||
	        		this.state.searched && <div>No results found</div>
				}
        	</div>
    	);
  }
}

export default GitUser;