import React from 'react';
import './Corrida.css';

const Corrida = ({ data, valorCorrida, valorDistancia, valorConsumo, valorPreco, lucro }) => {
  return (
    <div className="cartao-corrida">
      <h2 className='titulo'>Corrida realizada no Dia: {data}</h2>
      <div className='div1'>
        <p><strong>Valor da Corrida:</strong> R$ {valorCorrida}</p>
        <p><strong>Consumo da Moto:</strong> {valorConsumo} km/l</p>
      </div>
      <div className='div2'>
        <p><strong>Distância da Corrida:</strong> {valorDistancia} km</p>
        <p><strong>Preço do Combustível:</strong> R$ {valorPreco}</p>
      </div>
      <div className='div3'>
        <p><strong>Lucro da Corrida:</strong> R$ {lucro}</p>
      </div>
    </div>
  );
};

export default Corrida;
