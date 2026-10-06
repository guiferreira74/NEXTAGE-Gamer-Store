import { useNavigate } from "react-router-dom";

function Carrinho({
    carrinho,
    removerProduto,
    aumentarQuantidade,
    diminuirQuantidade,
    limparCarrinho
}) {

    const navigate = useNavigate();

    const total = carrinho.reduce(
        (soma, produto) => {
            return soma + produto.preco * produto.quantidade;
        },
        0
    );

    function finalizarCompra() {

        navigate("/menu");

    }

    return (
        <section className="carrinho">

            <h2>Meu Carrinho</h2>

            {carrinho.length === 0 ? (

                <p>
                    Seu carrinho está vazio.
                </p>

            ) : (

                <div className="lista-carrinho">

                    {carrinho.map((produto) => (

                        <div
                            key={produto.id}
                            className="item-carrinho"
                        >

                            <h3>
                                {produto.nome}
                            </h3>

                            <p>
                                {produto.descricao}
                            </p>

                            <p>
                                Preço unitário:
                                {" "}
                                R$ {produto.preco}
                            </p>

                            <div className="quantidade-carrinho">

                                <button
                                    onClick={() =>
                                        diminuirQuantidade(produto.id)
                                    }
                                >
                                    -
                                </button>

                                <span>
                                    {" "}
                                    {produto.quantidade}
                                    {" "}
                                </span>

                                <button
                                    onClick={() =>
                                        aumentarQuantidade(produto.id)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <p>
                                Subtotal:
                                {" "}
                                R$ {produto.preco * produto.quantidade}
                            </p>

                            <button
                                onClick={() =>
                                    removerProduto(
                                        carrinho.indexOf(produto)
                                    )
                                }
                            >
                                Remover
                            </button>

                        </div>

                    ))}

                    <hr />

                    <h2>
                        Total: R$ {total}
                    </h2>

                    <button onClick={finalizarCompra}>
                        Finalizar compra
                    </button>

                </div>

            )}

        </section>
    );
}

export default Carrinho;