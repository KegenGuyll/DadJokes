import React, { Component } from 'react';
import axios from 'axios';
import {Button, Jumbotron, Container, Accordion, Card} from 'react-bootstrap';
import "./index.css";

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
      <Card style={{ background: '#6B5B7B', color: 'white'}}>
        <Card.Body>
          <Card.Title>Dad Jokes</Card.Title>
          <Accordion>
          {this.state.setup ? <Card.Text>{this.state.setup}</Card.Text> : null}
          <Accordion.Collapse eventKey="0">
                <Card.Text>{this.state.punchline ? <p>{this.state.punchline}</p> : null}</Card.Text>
          </Accordion.Collapse>
          <Accordion.Toggle as={Button}  style={{ background: '#F7B195', border: 'none'}} size="lg" eventKey="0" block>Reveal Punchline</Accordion.Toggle>
          <Button onClick={this.loadJoke} style={{ background: '#F7B195', border: 'none'}} size="lg" block>New Joke</Button>
          </Accordion>
        </Card.Body>
      </Card>
    );
  }
}

export default Joke;