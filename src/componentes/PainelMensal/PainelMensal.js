import { useState, useEffect } from "react";
import "./PainelMensal.css";

const PainelMensal = ({ token }) => {
  const [corridas, setCorridas] = useState([]);
  const [lucroTotal, setLucroTotal] = useState(0);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregarCorridasMensais = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const resposta = await fetch(
        `http://localhost:3001/api/corridas-mes?mes=${mes}&ano=${ano}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao carregar corridas mensais");
      }

      const data = await resposta.json();
      
        const corridasFormatadas = data.corridas.map(corrida => ({
        ...corrida,
        lucro: Number(corrida.lucro) || 0
      }));

      setCorridas(corridasFormatadas);
      setLucroTotal(Number(data.lucroTotal) || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCorridasMensais();
  }, [mes, ano, token]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">Erro: {error}</p>;

  return (
    <div className="painel-mensal">
      <h2>Corridas do Mês</h2>
      <div className="filtros">
        <select value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
        <select value={ano} onChange={(e) => setAno(parseInt(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      
      <ul>
        {corridas.map((corrida) => (
          <li key={corrida.id}>
            {corrida.data} – Lucro: R$ {corrida.lucro.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Lucro Líquido do Mês: R$ {lucroTotal.toFixed(2)}</h3>
    </div>
  );
};

export default PainelMensal;