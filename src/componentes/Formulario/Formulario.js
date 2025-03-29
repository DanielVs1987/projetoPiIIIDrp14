import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "../Formulario/Formulario.css";
import { useState } from "react";

const Formulario = () => {
  const [valorCorrida, setValorCorrida] = useState("");
  const [valorDistancia, setValorDistancia] = useState("");
  const [valorConsumo, setValorConsumo] = useState("");
  const [valorPreco, setValorPreco] = useState("");
  const [lucro, setLucro] = useState(null);
  const [erro, setErro] = useState(null);

  const calculaLucro = () => {
    try {
      const valor = parseFloat(valorCorrida.replace(",", "."));
      const distancia = parseFloat(valorDistancia.replace(",", "."));
      const consumo = parseFloat(valorConsumo.replace(",", "."));
      const preco = parseFloat(valorPreco.replace(",", "."));

      if (valor <= 0 || distancia <= 0 || consumo <= 0 || preco <= 0) {
        throw new Error("Os valores devem ser maiores que zero.");
      }

      const custoCombustivel = (preco / consumo) * distancia;
      const lucroCalculado = valor - custoCombustivel;

      setLucro(lucroCalculado);
      setErro(null);
    } catch (error) {
      setErro(error.message);
      setLucro(null);
    }
  };

  const aoSalvar = (evento) => {
    evento.preventDefault();
    calculaLucro();
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
          label="Distancia da Corrida:"
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
          label="Preço do Combustivel:"
          valor={valorPreco}
          aoAlterado={(valor) => setValorPreco(valor)}
        />

        <div className="disposicao-botoes">
          <Botao onClick={() => window.location.reload()}>Calcular</Botao>
        </div>

        <h2>Seu Lucro foi: {lucro !== null ? `R$ ${lucro.toFixed(2)}` : "Aguardando cálculo"}</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </form>
    </section>
  );
};

export default Formulario;
