import { useState } from "react";

function Cadastro() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    function cadastrarUsuario(event) {
        event.preventDefault();

        fetch("http://localhost:8080/usuarios", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                tipo: "cliente"
            })
        })
        .then(async (resposta) => {

            if (!resposta.ok) {
                const erro = await resposta.text();
                throw new Error(erro);
            }

            return resposta.json();
        })
        .then((usuario) => {
            console.log("Usuário cadastrado:", usuario);

            setMensagem("Conta criada com sucesso!");

            setNome("");
            setEmail("");
            setSenha("");
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar:", erro);

            setMensagem(
                erro.message || "Não foi possível criar a conta."
            );
        });
    }

    return (
        <section className="pagina-cadastro">

            <div className="cadastro-conteudo">

                <p className="titulo-menor">
                    NEXTAGE GAMER STORE
                </p>

                <h2>
                    Crie sua <span>conta.</span>
                </h2>

                <p className="texto-cadastro">
                    Cadastre-se para continuar sua experiência
                    na Nextage Gamer Store.
                </p>

                <form
                    className="form-cadastro"
                    onSubmit={cadastrarUsuario}
                >

                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        required
                    />

                    <button type="submit">
                        Criar conta
                    </button>

                </form>

                {mensagem && (
                    <p className="mensagem-cadastro">
                        {mensagem}
                    </p>
                )}

            </div>

        </section>
    );
}

export default Cadastro;