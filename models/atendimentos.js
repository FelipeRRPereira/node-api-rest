const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimentos {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existeErros = erros.length;

        if (existeErros) {
            return res.status(400).json(erros);
        }

        const atendimentoDatado = { ...atendimento, dataCriacao, data };

        const sql = 'INSERT INTO atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);           
            } else {
                res.status(201).json(resultados);              
            }
        })
    }
}

module.exports = new Atendimentos;