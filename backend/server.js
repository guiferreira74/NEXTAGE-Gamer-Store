const express = require("express");
const cors = require("cors");

const produtosRoutes = require("./routes/produtos");
const usuariosRoutes = require("./routes/usuarios");
const pedidosRoutes = require("./routes/pedidos");

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Backend da PC Store funcionando!");
});

app.use("/produtos", produtosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/pedidos", pedidosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});