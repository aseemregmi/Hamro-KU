import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Transition } from 'react-spring';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
      users: [],
      userList: false
    };

    this.messages = React.createRef();
    this.socket = socketIOClient('/', {
      query: {
        name: props.student.name,
        group: props.student.group._id,
        groupShortForm: props.student.group.shortForm
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected To Server');
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
    this.socket.emit('end');
  }

  componentDidMount() {
    this.socket.on('recentMessages', messages => {
      this.setState({ messages: messages.messages });
    });
    this.socket.on('newMessageFromServer', message => {
      this.addMessageToState(message);
    });
    this.socket.on('userList', message => {
      this.setState({ users: message.users });
    });
    this.socket.on('redirect', () => {
      alert('You Are Already Chatting In There From Another Location');
      this.props.history.push('/dashboard');
      this.socket.emit('disconnect');
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.message.trim() !== '') {
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
    }
  };

  render() {
    let abc = 1;
    return (
      <div className="chat-room">
        <div className="chat-room__messages" ref={this.messages}>
          {this.state.messages.map(message => {
            return (
              <div key={++abc} className="from-text-wrapper">
                {message.from ? (
                  <span>
                    <i>{message.from}</i>
                  </span>
                ) : null}

                <h3>{message.text}</h3>
                <br />
              </div>
            );
          })}
        </div>
        <div className="userListContainer">
          <h2 style={{ borderBottom: '1px solid #f0f0f0' }}>
            <i
              onClick={() => this.setState({ userList: !this.state.userList })}
              style={{
                fontSize: '1.2rem',
                paddingRight: '5px',
                cursor: 'pointer'
              }}
              className="fas fa-bars"
            />
            Active Users
          </h2>

          <Transition
            items={this.state.userList}
            from={{ height: '0px' }}
            enter={{ height: '100%' }}
            leave={{ height: '0px' }}
          >
            {toggle =>
              toggle
                ? props => (
                    <div style={props} className="userList">
                      {this.state.users.map(user => (
                        <span key={user.name}>
                          <i
                            style={{
                              fontSize: '1rem',
                              color: '#28b485',
                              marginRight: '10px'
                            }}
                            class="fas fa-dot-circle"
                          />
                          {user.name}
                        </span>
                      ))}
                    </div>
                  )
                : null
            }
          </Transition>
        </div>
        <form className="chat-room__controls" onSubmit={this.handleSubmit}>
          <input
            className="messages"
            placeholder="Enter Your Message Here"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
            autoComplete="off"
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
