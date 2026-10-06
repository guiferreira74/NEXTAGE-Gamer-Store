import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLogin }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();

    async function fazerLoginAdmin(event) {
        event.preventDefault();

        setMensagem("");

        try {

            const resposta = await fetch(
                "http://localhost:8080/usuarios/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }
            );

            if (!resposta.ok) {
                const erro = await resposta.text();

                setMensagem(
                    erro || "E-mail ou senha inválidos."
                );

                return;
            }

            const usuario = await resposta.json();

            if (usuario.tipo !== "admin") {
                setMensagem(
                    "Este usuário não possui acesso de administrador."
                );

                return;
            }

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            if (onLogin) {
                onLogin(usuario);
            }

            navigate("/admin");

        } catch (erro) {

            console.error(
                "Erro ao realizar login administrativo:",
                erro
            );

            setMensagem(
                "Não foi possível conectar ao servidor."
            );
        }
    }

    return (
        <section className="pagina-login">

            <div className="login-conteudo">

                <p className="titulo-menor">
                    NEXTAGE GAMER STORE
                </p>

                <h2>
                    Área do <span>administrador.</span>
                </h2>

                <p className="texto-login">
                    Entre com uma conta de administrador
                    para gerenciar os produtos da loja.
                </p>

                <form
                    className="form-login"
                    onSubmit={fazerLoginAdmin}
                >

                    <input
                        type="email"
                        placeholder="E-mail do administrador"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(event) =>
                            setSenha(event.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Entrar como administrador
                    </button>

                </form>

                {mensagem && (
                    <p className="mensagem-login">
                        {mensagem}
                    </p>
                )}

            </div>

        </section>
    );
}

export default AdminLogin;