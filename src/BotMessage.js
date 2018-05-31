import React from 'react';
import logo from './img/logo.png';

const BotMessage = (props) => {

    return (
        <div className="bot-message">
            <div className="bot-image">
                <div className="img-box">
                    <img src={logo} alt="" />
                    <h2>SPARTANS</h2>
                </div>
            </div>
            <p className="message">{props.text}</p>
            <div className="markers" >
                {props.options ?
                    props.options.map((el, i) => {
                        return <div key={i}>{el}</div>
                    }) : ''}
            </div>

        </div>
    )
}

export default BotMessage;