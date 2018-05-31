import React, { Component } from 'react';
import logo from './img/logo.png';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import profile_img from './img/profile.svg';
import jenna_logo from './img/jenna_logo_small.svg';
import edit_image from './img/edit.svg';
import plane from './img/plane.svg';
import menu from './img/menu.svg';
import { socketConnect } from 'socket.io-react';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            inputValue: ''
        }
    }

    componentDidMount() {
        this.props.socket.on('bot message', msg => {
            this.setState({
                data: [...this.state.data, { text: msg.message.text, source: 'bot', time: new Date(), options: msg.message.options }],
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
        if (event.key === 'Enter' && event.target.value !== '') {
            this.sendMessage();
        }
    }


    sendMessage = (event) => {
        let userMessage = { text: this.state.inputValue };
        this.props.socket.emit('send message', userMessage);
        this.setState({
            data: [...this.state.data, { text: this.state.inputValue, source: 'user', time: new Date(), options: [] }],
            inputValue: ''
        })
       
    }

    componentDidUpdate() {
        let chatHistory = document.querySelector('.message-box');
        chatHistory.scrollTop = chatHistory.scrollHeight  - chatHistory.clientHeight;
    }


    render() {

        return (
            <div className="app">
                <div className="avatar-box">
                    <img className="profile-image" src={profile_img} alt="" />
                </div>
                <img className="edit" src={edit_image} alt="" />
                <div className="container">
                    <header>
                        <img src={logo} alt="" />
                        <h2>SPARTANS</h2>
                    </header>
                    <div className="message-box">
                    {this.state.data.map((el, i) => {
                        if (el.source === 'bot') {
                            return <BotMessage {...el} key={i} />
                        } else {
                            return <UserMessage {...el} key={i} />
                        }
                    })}
                    </div>
                    <div id="push"></div>
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
                <footer>
                    <p>Terms/Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Powered by
                        <img src={jenna_logo} alt="" />
                    </p>
                </footer>
                </div>
            </div>
        )
    }
}

export default socketConnect(App);
