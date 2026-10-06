import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MeusPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function carregarPedidos() {
            const usuarioSalvo = localStorage.getItem("usuario");

            if (!usuarioSalvo) {
                setCarregando(false);
                return;
            }

            const usuario = JSON.parse(usuarioSalvo);

            try {
                const resposta = await fetch(
                    `http://localhost:8080/pedidos/usuario/${usuario.id}`
                );

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar pedidos.");
                }

                const dados = await resposta.json();

                setPedidos(dados);

            } catch (erro) {
                console.error("Erro ao carregar pedidos:", erro);
            } finally {
                setCarregando(false);
            }
        }

        carregarPedidos();
    }, []);

    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
        return (
            <section className="meus-pedidos">
                <h2>Meus Pedidos</h2>

                <p>
                    Você precisa entrar na sua conta para visualizar seus pedidos.
                </p>

                <button onClick={() => navigate("/login")}>
                    Entrar
                </button>
            </section>
        );
    }

    if (carregando) {
        return (
            <section className="meus-pedidos">
                <h2>Meus Pedidos</h2>

                <p>Carregando pedidos...</p>
            </section>
        );
    }

    return (
        <section className="meus-pedidos">

            <h2>Meus Pedidos</h2>

            {pedidos.length === 0 ? (
                <p>Você ainda não realizou nenhuma compra.</p>
            ) : (
                <div className="lista-pedidos">

                    {pedidos.map((pedido) => (
                        <article
                            key={pedido.id}
                            className="card-pedido"
                        >
                            <h3>
                                Pedido #{pedido.id}
                            </h3>

                            <p>
                                <strong>Data:</strong>{" "}
                                {new Date(pedido.data).toLocaleString(
                                    "pt-BR"
                                )}
                            </p>

                            <p>
                                <strong>Pagamento:</strong>{" "}
                                {pedido.formaPagamento}
                            </p>

                            <h4>Produtos</h4>

                            {pedido.produtos.map((produto) => (
                                <div
                                    key={`${pedido.id}-${produto.id}`}
                                    className="produto-pedido"
                                >
                                    <p>
                                        <strong>
                                            {produto.nome}
                                        </strong>
                                    </p>

                                    <p>
                                        Quantidade:{" "}
                                        {produto.quantidade}
                                    </p>

                                    <p>
                                        Preço unitário: R${" "}
                                        {Number(
                                            produto.preco
                                        ).toFixed(2)}
                                    </p>

                                    <p>
                                        Subtotal: R${" "}
                                        {(
                                            Number(produto.preco) *
                                            produto.quantidade
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            ))}

                            <h3>
                                Total: R${" "}
                                {Number(pedido.total).toFixed(2)}
                            </h3>

                        </article>
                    ))}

                </div>
            )}

        </section>
    );
}

export default MeusPedidos;