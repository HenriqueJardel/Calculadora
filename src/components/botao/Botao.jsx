import React from "react";
import './Botao.css';

const Botao = props => {
    return(
        <button className={`Botao ${props.duplo ? 'duplo' : ''}${props.triplo ? 'triplo' : ''}`}
                onClick={() => props.onClick()}>
            {props.label}
        </button>
    );
}

export default Botao;