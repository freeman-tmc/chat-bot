import React from 'react';
import jenna_logo from './img/jenna_logo_small.svg';

const UserMessage = (props) => {

    return (
        <div className="user-message">
            <p className="message">{props.text}</p>
            <div className="user-image">
                <img src={jenna_logo} alt=""/>
            </div>
        </div>
    )
}

export default UserMessage;