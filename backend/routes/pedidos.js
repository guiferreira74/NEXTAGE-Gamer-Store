const express = require("express");
const pedidos = require("../data/pedidos");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(pedidos);
});

router.get("/usuario/:id", (req, res) => {

    const usuarioId = Number(req.params.id);

    const pedidosUsuario = pedidos.filter((pedido) => {
        return pedido.usuario === usuarioId;
    });

    res.json(pedidosUsuario);

});

router.post("/", (req, res) => {

    const novoPedido = {
        id: pedidos.length + 1,
        usuario: req.body.usuario,
        produtos: req.body.produtos,
        total: req.body.total,
        data: new Date()
    };

    pedidos.push(novoPedido);

    res.status(201).json({
        mensagem: "Pedido realizado com sucesso!",
        pedido: novoPedido
    });

});

module.exports = router;