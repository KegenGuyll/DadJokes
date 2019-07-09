import React, { Component } from 'react';
import axios from 'axios';
import {Button, Jumbotron, Container} from 'react-bootstrap';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup: '',
      punchline: '',
      jokeId: ''
    };
  }

  componentDidMount() {
    this.loadJoke();
  }

  loadJoke = () => {
    axios
      .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random_joke', {
        headers: { Accept: 'application/json' }
      })
      .then(response => {
        this.setState({
          setup: response.data.setup,
          punchline: response.data.punchline
        });
      });
  };

  render() {
    return (
      <Jumbotron fluid>
        <Container>
          <h1>Dad Jokes</h1>
          {this.state.setup ? <p>{this.state.setup}</p> : null}
          {this.state.punchline ? <p>{this.state.punchline}</p> : null}
          <Button onClick={this.loadJoke} variant="primary" size="lg">New Joke</Button>
        </Container>
      </Jumbotron>
    );
  }
}

export default Joke;