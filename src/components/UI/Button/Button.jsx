import React from 'react';
import classes from './Button.module.scss';

const Button = ({type, className, isDisabled, children,onClick}) => {

    const btnStyles = `${classes.button} ${className}`;

    return (
        <button
            className={btnStyles}
            type={type || 'button'}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
