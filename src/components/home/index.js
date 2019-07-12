import React, { Component } from 'react';
import axios from 'axios';
import {Button, Container, Row, Col, Accordion, Card} from 'react-bootstrap';
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
      .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', {
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

      <Container>
        <Row>
            <Col>
              <div style={{ height: '25vh' }} />
            </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col xs lg='4'>
          <Card style={{margin: '1rem', background: '#345B7C', color: 'white'}}>
            <Card.Body>
              <Card.Title>Dad Jokes</Card.Title>
              <Accordion>
              {this.state.setup ? <Card.Text>{this.state.setup}</Card.Text> : null}
              <Accordion.Collapse eventKey="0">
                    <Card.Text>{this.state.punchline ? <p>{this.state.punchline}</p> : null}</Card.Text>
              </Accordion.Collapse>
              <Accordion.Toggle as={Button}  style={{ background: '#F67280', border: 'none'}} size="lg" eventKey="0" block>Reveal Punchline</Accordion.Toggle>
              <Button onClick={this.loadJoke} style={{ background: '#F67280', border: 'none'}} size="lg" block>New Joke</Button>
              </Accordion>
            </Card.Body>
          </Card>
          </Col>
          </Row>
      </Container>
    );
  }
}

export default Joke;