// Endpoint para retornar as corridas do dia e o lucro total
app.get("/api/corridas-dia", (req, res) => {
    // Consulta para as corridas do dia
    conexao.query("SELECT * FROM corridas WHERE data = CURDATE()", (err, resultados) => {
      if (err) return res.status(500).json({ message: "Erro no banco de dados" });
  
      // Consulta para o lucro total
      conexao.query("SELECT SUM(lucro) AS lucro_total_do_dia FROM corridas WHERE data = CURDATE()", (err2, somaResultados) => {
        if (err2)
          return res.status(500).json({ message: "Erro no banco de dados" });
  
        const lucroTotal = somaResultados[0].lucro_total_do_dia || 0;
        res.json({ corridas: resultados, lucroTotal });
      });
    });
  });
  