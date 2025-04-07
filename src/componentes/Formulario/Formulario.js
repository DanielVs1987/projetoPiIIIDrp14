import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "../Formulario/Formulario.css";
import { useState } from "react";

const Formulario = (props) => {
  const [valorCorrida, setValorCorrida] = useState("");
  const [valorDistancia, setValorDistancia] = useState("");
  const [valorConsumo, setValorConsumo] = useState("");
  const [valorPreco, setValorPreco] = useState("");


  const calculaLucro = () => {
    const valor = parseFloat(valorCorrida.replace(",", "."));
    const distancia = parseFloat(valorDistancia.replace(",", "."));
    const consumo = parseFloat(valorConsumo.replace(",", "."));
    const preco = parseFloat(valorPreco.replace(",", "."));

    if (valor <= 0 || distancia <= 0 || consumo <= 0 || preco <= 0) {
      throw new Error("Os valores devem ser maiores que zero.");
    }

    const custoCombustivel = (preco / consumo) * distancia;
    return valor - custoCombustivel;
  };

  const aoSalvar = (evento) => {
    evento.preventDefault();

    const lucroCalculado = calculaLucro();

    props.novaCorrida({
      id: Math.random().toString(36).substring(2, 9),
      data: new Date().toLocaleDateString(),
      valorCorrida,
      valorDistancia,
      valorConsumo,
      valorPreco,
      lucro:  lucroCalculado.toString().replace(".", ","),
    });

  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Informações Da Sua Corrida</h2>
        <CampoTexto
          obrigatorio={true}
          placeholder="Valor em Reais (R$)"
          label="Valor da corrida:"
          valor={valorCorrida}
          aoAlterado={(valor) => setValorCorrida(valor)}
        />
        <CampoTexto
          obrigatorio={true}
          placeholder="Valor em Quilômetros (Km)"
          label="Distância da Corrida:"
          valor={valorDistancia}
          aoAlterado={(valor) => setValorDistancia(valor)}
        />
        <CampoTexto
          obrigatorio={true}
          placeholder="Valor em Quilômetros por Litro (Km/L)"
          label="Consumo da Moto:"
          valor={valorConsumo}
          aoAlterado={(valor) => setValorConsumo(valor)}
        />
        <CampoTexto
          obrigatorio={true}
          placeholder="Valor em Reais (R$)"
          label="Preço do Combustível:"
          valor={valorPreco}
          aoAlterado={(valor) => setValorPreco(valor)}
        />

        <div className="disposicao-botoes">
          <Botao tipo="submit">Calcular</Botao>
        </div>
      </form>
    </section>
  );
};

export default Formulario;
