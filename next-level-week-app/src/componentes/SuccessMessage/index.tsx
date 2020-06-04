import React from 'react';

import check from '../../assets/checked.svg';

interface Message {
    status: string
}

const SuccessMessage:React.FC<Message> = (props) => {

    return (
        <div className={props.status ? "" : "invisible"} id="message-success">
            <img src={check} alt=""/>
            <span>Cadastro Concluído!</span>
        </div>
    );
} 

export default SuccessMessage;