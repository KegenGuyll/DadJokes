import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './index.css';
import Swipe from 'ui-react.swipe';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup: '',
      punchline: '',
      jokeId: '',
      jokeArray: [],
      showJoke: false,
      cardBackground: '#345B7C'
    };
  }

  componentDidMount() {
    this.loadJoke();
  }

  onSwipeStart = () => {
    this.setState({
      cardBackground: 'rgba(62, 111, 152, 0.45)'
    });
  };

  onSwipeLeft = () => {
    const maxNumber = this.state.jokeArray.length;
    const randomNumber = Math.floor(Math.random() * maxNumber);
    this.state.jokeArray.map((joke, index) => {
      if (index === randomNumber) {
        this.setState({
          setup: joke.setup,
          punchline: joke.punchline
        });
        if (this.state.jokeArray.length !== 1) {
          this.state.jokeArray.splice(index, 1);
          this.handleShowJoke();
          this.setState({
            cardBackground: '#345B7C'
          });
        } else {
          console.log('loaded data');
          this.loadJoke();
        }
      }
    });
  };

  handleShowJoke = () => {
    this.setState(prevState => ({
      showJoke: !prevState.showJoke
    }));
  };

  loadJoke = () => {
    axios
      .get(
        'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes/5',
        {
          headers: { Accept: 'application/json' }
        }
      )
      .then(response => {
        this.setState({
          jokeArray: response.data
        });
      })
      .then(() => {
        this.setState(prevState => ({
          setup: prevState.jokeArray[0].setup,
          punchline: prevState.jokeArray[0].punchline
        }));
        this.state.jokeArray.splice(0, 1);
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
            <Swipe
              axis='x'
              onSwipeStart={this.onSwipeStart}
              onSwipeLeft={this.onSwipeLeft}
            >
              <Card
                onClick={this.handleShowJoke}
                style={{
                  margin: '1rem',
                  background: this.state.cardBackground,
                  color: 'white'
                }}
              >
                <Card.Body>
                  <Card.Title>Dad Jokes</Card.Title>
                  {this.state.setup ? (
                    <Card.Text>{this.state.setup}</Card.Text>
                  ) : null}
                  <Card.Text>
                    {this.state.showJoke ? this.state.punchline : null}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Swipe>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Joke;
