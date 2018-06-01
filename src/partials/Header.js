import React from 'react';
import logo from '../img/logo.png';

const Header = (props) => {
    return (
        <header>
            <img src={logo} alt="" />
            <h2>SPARTANS</h2>
        </header>
    )
}

export default Header;