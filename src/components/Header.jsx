import { Link } from "react-router-dom";

function Header({ usuario, onLogout }) {
    return (
        <header>

            <Link
                to="/"
                className="logo-loja"
                aria-label="Voltar para a página inicial"
            >
                <div className="marca-loja">
                    <span className="marca-principal">
                        NEXTAGE
                    </span>

                    <span className="marca-secundaria">
                        GAMER STORE
                    </span>
                </div>
            </Link>

            <div className="acoes-header">

                <Link to="/carrinho">
                    <button className="botao-carrinho">
                        🛒 Carrinho
                    </button>
                </Link>

                {usuario ? (
                    <div className="acoes-conta">

                        <span>
                            Olá, {usuario.nome}!
                        </span>

                        {usuario.tipo === "admin" && (
                            <Link to="/admin">
                                <button
                                    className="botao-admin"
                                    title="Gerenciar produtos"
                                >
                                    ⚙️
                                </button>
                            </Link>
                        )}

                        <Link to="/pedidos">
                            <button>
                                Meus Pedidos
                            </button>
                        </Link>

                        <button onClick={onLogout}>
                            Sair
                        </button>

                    </div>
                ) : (
                    <div className="acoes-conta">

                        <Link to="/login">
                            <button>
                                Minha conta
                            </button>
                        </Link>

                        <Link to="/cadastro">
                            <button>
                                Criar conta
                            </button>
                        </Link>

                        <Link to="/admin-login">
                            <button
                                className="botao-admin"
                                title="Área do administrador"
                                aria-label="Área do administrador"
                            >
                                ⚙️
                            </button>
                        </Link>

                    </div>
                )}

            </div>

        </header>
    );
}

export default Header;