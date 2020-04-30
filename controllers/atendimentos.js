module.exports = (app) => {
    app.get("/atendimentos", (req, res) => res.send("Servidor rodando um GET"));

    app.post("/atendimentos", (req, res) => res.send('Servidor rodando um POST'))
}
