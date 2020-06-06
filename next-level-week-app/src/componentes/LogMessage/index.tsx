import React from 'react';

import check from '../../assets/checked.svg';
import error from '../../assets/close.svg';


interface Message {
    status:string;
    message:string;
}

const LogMessage:React.FC<Message> = (props) => {

    return (
        <div className={props.status ? "" : "invisible"} id="message-success">
            <img src={props.status === 'success' ? check : error} alt=""/>
            <span>{props.message}</span>
        </div>
    );
} 

export default LogMessage;