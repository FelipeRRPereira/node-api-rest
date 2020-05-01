const conexao = require("../infraestrutura/conexao");
const moment = require("moment");

class Atendimentos {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataValida,
        mensagem: "Data deve ser maior ou igual a data atual.",
      },
      {
        nome: "cliente",
        valido: clienteValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres.",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existeErros = erros.length;

    if (existeErros) {
      return res.status(400).json(erros);
    }

    const atendimentoDatado = { ...atendimento, dataCriacao, data };

    const sql = "INSERT INTO atendimentos SET ?";

    conexao.query(sql, atendimentoDatado, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json({ ...atendimento });
      }
    });
  }

  lista(res) {
    const sql = "SELECT * FROM Atendimentos";

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ?`;

    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado[0]);
      }
    });
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    const sql = "UPDATE Atendimentos SET ? WHERE id = ?";

    conexao.query(sql, [valores, id], (erro, resultado) => {
      if (erro) {
        res.status(400).json(resultado);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id = ?`;

    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(resultado);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimentos();
