import { useState } from "react";
import "./Login.css";
import Cadastro from "./Cadastro";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setLoading(true);
        setErro(null);

        try {
            const resposta = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            if (!resposta.ok) {
                const { message } = await resposta.json();
                throw new Error(message);
            }

            const { token } = await resposta.json();
            onLogin(token);
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (mostrarCadastro) {
        return <Cadastro onCadastroSucesso={() => setMostrarCadastro(false)} />;
    }

    return (
        <div className="login-background">
        <div className="login-container">
            <h2>Login</h2>
            {erro && <p className="error">{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
            <p className="cadastro-link">
                Não tem uma conta?{" "}
                <button onClick={() => setMostrarCadastro(true)} className="link-button">
                    Cadastre-se
                </button>
            </p>
        </div>
        </div>
    );
};

export default Login;