import { useEffect, useState } from "react";
import "./PainelCorridas.css";

const PainelCorridas = ({ token }) => {
  const [corridas, setCorridas] = useState([]);
  const [lucroTotal, setLucroTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarCorridasDia = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const resposta = await fetch("http://localhost:3001/api/corridas-dia", {
          headers: {
            Authorization: token,
          },
        });

        if (!resposta.ok) {
          throw new Error("Erro ao carregar corridas");
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

    carregarCorridasDia();
  }, [token]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">Erro: {error}</p>;

  return (
    <div className="painel-corridas">
      <h2>Corridas de Hoje</h2>
      <ul>
        {corridas.map((corrida) => (
          <li key={corrida.id}>
            {corrida.data} – Lucro: R$ {corrida.lucro.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Lucro Líquido do Dia: R$ {lucroTotal.toFixed(2)}</h3>
    </div>
  );
};

export default PainelCorridas;