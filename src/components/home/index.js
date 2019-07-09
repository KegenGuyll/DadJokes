import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import '../../index.css';
import Navigation from '../navbar';
import { FiHeart, FiShare } from 'react-icons/fi';
import { IconContext } from 'react-icons';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup: '',
      punchline: '',
      jokeId: '',
      share: false,
      shareUrl: ''
    };
  }

  componentDidMount() {
    this.loadJoke();
  }

  loadJoke = () => {
    axios
      .get(
        'https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random_joke',
        {
          headers: { Accept: 'application/json' }
        }
      )
      .then(response => {
        this.setState({
          jokeId: response.data.id,
          setup: response.data.setup,
          punchline: response.data.punchline
        });
      });
  };

  handleShare = () => {
    this.setState(preState => ({
      share: !preState.share,
      shareUrl: ``
    }));
  };

  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <Row>
            <Col>
              <div style={{ height: '25vh' }} />
            </Col>
          </Row>
          <Row className='justify-content-md-center'>
            <Col xs lg='4'>
              <Card bg='dark' text='white'>
                <Card.Header>
                  <h4>Father Jokes</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    {this.state.jokeId ? this.state.setup : null}
                  </Card.Title>
                  <Card.Text>
                    {this.state.jokeId ? this.state.punchline : null}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div style={{ float: 'right' }}>
                    <IconContext.Provider
                      value={{ color: 'white', size: '1.5em' }}
                    >
                      <FiShare onClick={this.handleShare} />
                    </IconContext.Provider>
                    <IconContext.Provider
                      value={{ color: 'white', size: '1.5em' }}
                    >
                      <FiHeart />
                    </IconContext.Provider>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal centered show={this.state.share} onHide={this.handleShare}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <RedditShareButton
                  title={this.state.setup}
                  url={`https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/jokes/${
                    this.state.jokeId
                  }`}
                />
              </ListGroupItem>
              <ListGroupItem>hi</ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleShare}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Joke;
