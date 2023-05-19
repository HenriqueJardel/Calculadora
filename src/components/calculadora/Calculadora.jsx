import React, { useState } from "react";
import Display from "../display/Display";
import Botao from "../botao/Botao";
import './Calculadora.css';


const Calculadora = props => {

    const estadoInicial = {
        valorDisplay: '0',
        limpar: false,
        operacao: null,
        valores: [0,0],
        indice: 0
    }

    const [ estado, setEstado ] = useState(estadoInicial);
    function limparDisplay() {
        setEstado(estadoInicial);
    }

    function setOperacao(operacao) {
        if(estado.indice === 0) {
            setEstado({ ...estado, operacao, indice: 1, limpar: true});
        } else {
            const igual = operacao === '=';
            const operacaoAtual = estado.operacao;
            const valores = [ ...estado.valores];

            try {
                valores[0] = eval(`${valores[0]} ${operacaoAtual} ${valores[1]}`);
            } catch (err) {
                valores[0] = estado.valores[0];
            }
            valores[1] = 0;

            setEstado({
                valorDisplay: valores[0],
                operacao: igual ? null : operacao,
                indice: igual ? 0 : 1,
                limpar: !igual,
                valores: valores
            });
        }
    }

    function addDigito(digito) {
        const valorAtual = estado.valorDisplay;
        const valores = [ ...estado.valores];

        if(digito === '.' && valorAtual.includes('.')) {
            return;
        }

        const limparDisplay = valorAtual === '0' || estado.limpar;
        const valorDisplay = limparDisplay ? '' + digito : valorAtual + digito;

        if(digito !== '.') {
            const indice = estado.indice;
            const valor = parseFloat(valorDisplay);
            valores[indice] = valor;
        }

        setEstado({
            ...estado,
            valorDisplay,
            limpar: false,
            valores
        });
    }

    return(
        <div className="Calculadora">
            <Display value={estado.valorDisplay}/>
            <Botao label="AC" onClick={() => limparDisplay()} triplo/>
            <Botao label="/"  onClick={() => setOperacao("/")} />
            <Botao label="7"  onClick={() => addDigito("7")} />
            <Botao label="8"  onClick={() => addDigito("8")} />
            <Botao label="9"  onClick={() => addDigito("9")} />
            <Botao label="*"  onClick={() => setOperacao("*")} />
            <Botao label="4"  onClick={() => addDigito("4")} />
            <Botao label="5"  onClick={() => addDigito("5")} />
            <Botao label="6"  onClick={() => addDigito("6")} />
            <Botao label="-"  onClick={() => setOperacao("-")} />
            <Botao label="1"  onClick={() => addDigito("1")} />
            <Botao label="2"  onClick={() => addDigito("2")} />
            <Botao label="3"  onClick={() => addDigito("3")} />
            <Botao label="+"  onClick={() => setOperacao("+")} />
            <Botao label="0"  onClick={() => addDigito("0")} duplo/>
            <Botao label="."  onClick={() => addDigito(".")}/>
            <Botao label="="  onClick={() => setOperacao("=")}/>
        </div>
    );
}

export default Calculadora;