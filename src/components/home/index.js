import React, { Component } from 'react';
import axios from 'axios';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: '',
      punchline: '',
      jokeId: ''
    };
  }

  componentDidMount() {
    this.loadJoke();
  }

  loadJoke = () => {
    axios
      .get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      })
      .then(response => {
        this.setState({
          jokeId: response.data.id,
          joke: response.data.joke
        });
      });
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
          textAlign: 'center'
        }}
      >
        <h1>Dad Jokes</h1>
        {this.state.jokeId ? <p>{this.state.joke}</p> : null}
        <button onClick={this.loadJoke}>New Joke</button>
      </div>
    );
  }
}

export default Joke;
