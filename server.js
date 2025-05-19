const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pi2025",
  database: "trabalho_db"
});

// Middleware para verificar token JWT
const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Endpoint de cadastro de usuário
app.post("/api/cadastro", async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const hashSenha = await bcrypt.hash(senha, 10);
    
    conexao.query(
      "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
      [email, hashSenha],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email já cadastrado" });
          }
          return res.status(500).json({ message: "Erro no banco de dados" });
        }
        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

// Endpoint de login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  conexao.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Erro no banco de dados" });
    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }
    
    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Endpoint para salvar corrida
app.post("/api/corridas", autenticarToken, (req, res) => {
  const { valorCorrida, valorDistancia, valorConsumo, valorPreco, lucro } = req.body;
  
  conexao.query(
    "INSERT INTO corridas (usuario_id, data, valor_corrida, distancia, consumo, preco_combustivel, lucro) VALUES (?, CURDATE(), ?, ?, ?, ?, ?)",
    [req.user.id, valorCorrida, valorDistancia, valorConsumo, valorPreco, lucro],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erro ao salvar corrida" });
      res.status(201).json({ message: "Corrida salva com sucesso" });
    }
  );
});

// Endpoint para corridas do dia
app.get("/api/corridas-dia", autenticarToken, (req, res) => {
  conexao.query(
    "SELECT id, data, valor_corrida as valorCorrida, distancia as valorDistancia, consumo as valorConsumo, preco_combustivel as valorPreco, lucro FROM corridas WHERE usuario_id = ? AND data = CURDATE()",
    [req.user.id],
    (err, resultados) => {
      if (err) return res.status(500).json({ message: "Erro no banco de dados" });

      conexao.query(
        "SELECT SUM(lucro) AS lucro_total_do_dia FROM corridas WHERE usuario_id = ? AND data = CURDATE()",
        [req.user.id],
        (err2, somaResultados) => {
          if (err2) return res.status(500).json({ message: "Erro no banco de dados" });
          const lucroTotal = somaResultados[0].lucro_total_do_dia || 0;
          res.json({ corridas: resultados, lucroTotal });
        }
      );
    }
  );
});

// Endpoint para corridas do mês
app.get("/api/corridas-mes", autenticarToken, (req, res) => {
  const { mes, ano } = req.query;
  
  conexao.query(
    "SELECT id, data, valor_corrida as valorCorrida, distancia as valorDistancia, consumo as valorConsumo, preco_combustivel as valorPreco, lucro FROM corridas WHERE usuario_id = ? AND MONTH(data) = ? AND YEAR(data) = ?",
    [req.user.id, mes, ano],
    (err, resultados) => {
      if (err) return res.status(500).json({ message: "Erro no banco de dados" });

      conexao.query(
        "SELECT SUM(lucro) AS lucro_total_do_mes FROM corridas WHERE usuario_id = ? AND MONTH(data) = ? AND YEAR(data) = ?",
        [req.user.id, mes, ano],
        (err2, somaResultados) => {
          if (err2) return res.status(500).json({ message: "Erro no banco de dados" });
          const lucroTotal = somaResultados[0].lucro_total_do_mes || 0;
          res.json({ corridas: resultados, lucroTotal });
        }
      );
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));