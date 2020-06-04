import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';


interface HeaderProps {
    headerRedirectText: string;
    icon: IconProp;
    redirect: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <img src={logo} alt="Ecoleta" />

            <div className="link-point">
                <Link to={props.redirect}>
                    <FontAwesomeIcon icon={props.icon}/>
                    {props.headerRedirectText}
                </Link>
            </div>
        </header>
    );
}

export default Header;