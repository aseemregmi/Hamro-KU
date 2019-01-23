import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: []
    };

    this.messages = React.createRef();

    this.socket = socketIOClient('https://calm-depths-75592.herokuapp.com');

    this.socket.on('connect', () => {
      this.socket.emit('join', props.student, function(err) {});
    });
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  addMessageToState = message => {
    if (message.text) {
      this.setState({
        messages: [
          ...this.state.messages,
          { text: message.text, from: message.from }
        ]
      });
      this.messages.current.scrollTop = this.messages.current.scrollHeight;
    }
  };

  componentWillUnmount() {
    this.socket.emit(
      'end',
      {
        name: this.props.student.name,
        to: this.props.student.group._id,
        from: this.props.student.name
      },
      () => {}
    );
  }

  componentDidMount() {
    this.socket.on('newMessageFromServer', message => {
      this.addMessageToState(message);
    });
    this.socket.on('userList', message => {
      console.log(message);
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.socket.emit(
      'newMessageFromClient',
      {
        text: this.state.message,
        to: this.props.student.group._id,
        from: this.props.student.name
      },
      () => {
        this.addMessageToState({ from: 'You', text: this.state.message });
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
              <div key={++abc} className="from-text-wrapper">
                <span>
                  <i>{message.from}</i>
                </span>
                <h3>{message.text}</h3>
                <br />
              </div>
            );
          })}
        </div>
        <form className="chat-room__controls" onSubmit={this.handleSubmit}>
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
            className="submit btn btn--submit btn--primary"
          />
        </form>
      </div>
    );
  }
}

export default ChatRoom;
