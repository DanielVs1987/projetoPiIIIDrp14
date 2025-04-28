import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "../Formulario/Formulario.css";
import { useState } from "react";

const Formulario = ({ token }) => {
  const [valorCorrida, setValorCorrida] = useState("");
  const [valorDistancia, setValorDistancia] = useState("");
  const [valorConsumo, setValorConsumo] = useState("");
  const [valorPreco, setValorPreco] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const aoSalvar = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(false);

    try {
      const lucroCalculado = calculaLucro();

      const resposta = await fetch("http://localhost:3001/api/corridas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          valorCorrida,
          valorDistancia,
          valorConsumo,
          valorPreco,
          lucro: lucroCalculado,
        }),
      });

      if (!resposta.ok) {
        const { message } = await resposta.json();
        throw new Error(message);
      }

      setSucesso(true);

      setValorCorrida("");
      setValorDistancia("");
      setValorConsumo("");
      setValorPreco("");
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formulario">
      <form onSubmit={aoSalvar}>
        <h2>Informações Da Sua Corrida</h2>
        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">Corrida salva com sucesso!</p>}
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
          <Botao tipo="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Botao>
        </div>
      </form>
    </section>
  );
};

export default Formulario;

