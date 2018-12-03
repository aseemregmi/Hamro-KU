import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: ['Welcome to Chat Room']
    };

    this.messages = React.createRef();
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:5000');

    this.socket.on('connection', () => {
      console.log('Connected');
    });

    this.socket.on('newMessageFromServer', message => {
      this.setState({ messages: [...this.state.messages, message.text] });
      const node = this.messages.current;
      node.scrollTop = node.scrollHeight;
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.socket.emit(
      'newMessageFromClient',
      { text: this.state.message },
      () => {
        this.setState({ message: '' });
      }
    );
  };

  render() {
    let abc = 1;
    return (
      <div className="chat-room">
        <div className="chat-room__messages" ref={this.messages}>
          {this.state.messages.map(message => {
            return (
              <React.Fragment key={++abc}>
                <h3>{message}</h3>
                <br />
              </React.Fragment>
            );
          })}
        </div>
        <form className="form chat-room__controls" onSubmit={this.handleSubmit}>
          <input
            className="messages"
            placeholder="Enter Your Message Here"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <input
            type="submit"
            name="message"
            value="Send"
            className="btn btn--submit btn--primary"
          />
        </form>
      </div>
    );
  }
}

export default ChatRoom;
