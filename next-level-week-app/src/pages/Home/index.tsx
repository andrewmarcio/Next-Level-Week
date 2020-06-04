import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../../componentes/Header';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <Header redirect="/register-point" icon={icons.faSignInAlt} headerRedirectText="Registrar ponto de coleta"/>

                <main>
                    
                    <h1>Seu marketplace de colata de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    
                    <Link to="/show-point">
                        <span>
                            <FontAwesomeIcon icon={icons.faSearch}/>
                        </span>
                        <strong>Procure um ponto de coleta</strong>
                    </Link>
                </main>

            </div>
        </div>
    );
}

export default Home;