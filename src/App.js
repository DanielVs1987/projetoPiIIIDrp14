import { useState } from 'react';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario/Formulario';
import Corrida from './componentes/Corrida/Corrida';

function App() {

  const [corridas, setCorridas] = useState([])

  const novaCorrida = (corrida) => {
    console.log(corrida)
    console.log(corridas)
    setCorridas([...corridas, corrida])
    console.log(corridas.map(c => c.lucro))


  }
  return (
    <div className="App">
      <Banner></Banner>
      <Formulario novaCorrida={corrida => novaCorrida(corrida)}></Formulario>
      <section className='corridas'>
        <h2>Corridas Realizadas</h2>
        {corridas.map((corrida, index) => (
          <Corrida
            key={corrida.id}
            id={index}
            data={corrida.data}
            valorCorrida={corrida.valorCorrida}
            valorDistancia={corrida.valorDistancia}
            valorConsumo={corrida.valorConsumo}
            valorPreco={corrida.valorPreco}
            lucro={corrida.lucro}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
