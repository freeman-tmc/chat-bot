import React from 'react';
import jenna_logo from '../img/jenna_logo_small.svg';

const Footer = (props) => {
    return (
        <footer>
            <p>Terms/Conditions</p>
            <p>Privacy Policy</p>
            <p>Powered by
                <img src={jenna_logo} alt="" />
            </p>
        </footer>
    )
}

export default Footer;