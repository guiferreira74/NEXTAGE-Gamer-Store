import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function fazerLogin(event) {
        event.preventDefault();

        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
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

            console.log("Usuário logado:", usuario);

            // Salva o usuário no navegador
            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            // Atualiza o usuário no App.jsx
            if (onLogin) {
                onLogin(usuario);
            }

            // Redireciona de acordo com o tipo do usuário
            if (usuario.tipo === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        })
        .catch((erro) => {

            console.error("Erro no login:", erro);

            alert(
                erro.message || "E-mail ou senha inválidos"
            );

        });
    }

    return (
        <section className="pagina-login">

            <div className="login-conteudo">

                <p className="titulo-menor">
                    NEXTAGE GAMER STORE
                </p>

                <h2>
                    Entre na sua <span>conta.</span>
                </h2>

                <p className="texto-login">
                    Acesse sua conta para continuar
                    sua experiência na Nextage Gamer Store.
                </p>

                <form
                    className="form-login"
                    onSubmit={fazerLogin}
                >

                    <input
                        type="email"
                        placeholder="E-mail"
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
                        Entrar
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Login;