import React, { Component } from 'react';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import profile_img from './img/profile.svg';
import edit_image from './img/edit.svg';
import plane from './img/plane.svg';
import menu from './img/menu.svg';
import { socketConnect } from 'socket.io-react';
import Header from './partials/Header';
import Footer from './partials/Footer';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: '',
            connecting: true
        }
    }

    componentDidMount() {
        this.props.socket.on('bot message', msg => {
            this.setState({
                data: [...this.state.data, { text: msg.message.text, source: 'bot', time: new Date(), options: msg.message.options }],
                connecting: false
            });
        });
    }

    handleChange = (event) => {
        let userInput = event.target.value;
        this.setState({
            inputValue: userInput
        })
    }

    handlePress = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            this.sendMessage('enter');
        }
    }


    sendMessage = (event) => {
        if (event === 'enter' || this.state.inputValue) {
            let userMessage = { text: this.state.inputValue };
            this.props.socket.emit('send message', userMessage);
            this.setState({
                data: [...this.state.data, { text: this.state.inputValue, source: 'user', time: new Date(), options: [] }],
                inputValue: ''
            })
        }
    }

    componentDidUpdate() {
        let chatHistory = document.querySelector('.message-box');
        chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
    }


    render() {

        return (
            <div className="app">
                <div className="avatar-box">
                    <img className="profile-image" src={profile_img} alt="" />
                </div>
                <img className="edit" src={edit_image} alt="" />
                <div className="container">
                    <Header />
                    <div className="message-box">
                        {!this.state.connecting ?
                            (this.state.data.map((el, i) => {
                                if (el.source === 'bot') {
                                    return <BotMessage {...el} key={i} />
                                } else {
                                    return <UserMessage {...el} key={i} />
                                }
                            })
                            ) : <p>Connecting...</p>}
                    </div>
                </div>
                <div className="controls">
                    <div className="compose-message">
                        <div className="menu-icon">
                            <img src={menu} alt="" />
                        </div>
                        <input type="text" placeholder="Type answer here.." value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.handlePress} />
                        <button onClick={this.sendMessage}>Send
                            <img src={plane} alt="" />
                        </button>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default socketConnect(App);
