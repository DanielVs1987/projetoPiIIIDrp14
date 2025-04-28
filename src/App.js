import { useState } from "react";
import Login from "./componentes/Login/Login";
import Formulario from "./componentes/Formulario/Formulario";
import PainelCorridas from "./componentes/PainelCorridas/PainelCorridas";
import PainelMensal from "./componentes/PainelMensal/PainelMensal";
import "./index.css";

function App() {
  const [token, setToken] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPainelDia, setMostrarPainelDia] = useState(false);
  const [mostrarPainelMes, setMostrarPainelMes] = useState(false);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    setMostrarFormulario(false);
    setMostrarPainelDia(false);
    setMostrarPainelMes(false);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-background">
      <div className="app-container">
        <nav className="navbar">
          <button onClick={() => {
            setMostrarFormulario(true);
            setMostrarPainelDia(false);
            setMostrarPainelMes(false);
          }}>
            Nova Corrida
          </button>
          <button onClick={() => {
            setMostrarFormulario(false);
            setMostrarPainelDia(true);
            setMostrarPainelMes(false);
          }}>
            Corridas do Dia
          </button>
          <button onClick={() => {
            setMostrarFormulario(false);
            setMostrarPainelDia(false);
            setMostrarPainelMes(true);
          }}>
            Corridas do Mês
          </button>
          <button onClick={handleLogout}>Sair</button>
        </nav>

        <div className="content">
          {mostrarFormulario && <Formulario token={token} />}
          {mostrarPainelDia && <PainelCorridas token={token} />}
          {mostrarPainelMes && <PainelMensal token={token} />}
        </div>
      </div>
    </div>
  );
}

export default App;




