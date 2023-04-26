import React from 'react';
import classes from './Header.module.scss';
import Logo from '../../../assets/ball.svg'
const Header = () => {
    return (
        <header className={classes.header}>
            <span> <img src={Logo} alt="pokeball"/> Pokedex</span>
        </header>
    );
};

export default Header;
