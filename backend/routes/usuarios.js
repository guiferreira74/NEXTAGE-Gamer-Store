const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../database");

const router = express.Router();


// CADASTRAR USUÁRIO
router.post("/", async (req, res) => {

    const { nome, email, senha } = req.body;

    try {

        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = db.prepare(`
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `).run(nome, email, senhaHash);

        res.status(201).json({
            id: resultado.lastInsertRowid,
            nome: nome,
            email: email
        });

    } catch (erro) {

        if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {

            return res.status(400).json({
                mensagem: "Este e-mail já está cadastrado."
            });

        }

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    const { email, senha } = req.body;

    const usuario = db.prepare(`
        SELECT * FROM usuarios
        WHERE email = ?
    `).get(email);

    if (!usuario) {

        return res.status(401).json({
            mensagem: "E-mail ou senha incorretos"
        });

    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!senhaCorreta) {

        return res.status(401).json({
            mensagem: "E-mail ou senha incorretos"
        });

    }

    res.json({
        mensagem: "Login realizado com sucesso",
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });

});


module.exports = router;