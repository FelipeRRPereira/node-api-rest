const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => res.send("Servidor rodando um GET"));

  app.post("/atendimentos", (req, res) => {
    const atendimentos = req.body;

    Atendimento.adiciona(atendimentos, res);
  });
};
