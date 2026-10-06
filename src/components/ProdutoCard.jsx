function ProdutoCard({
    produto,
    adicionarAoCarrinho
}) {

    return (
        <article className="card-produto">

            {produto.imagem && (

                <img
                    src={`http://localhost:8080/images/img-uploads/${produto.imagem}`}
                    alt={produto.nome}
                    className="imagem-produto"
                />

            )}

            <h3>
                {produto.nome}
            </h3>

            <p>
                {produto.descricao}
            </p>

            <p className="preco-produto">
                R$ {produto.preco.toFixed(2)}
            </p>

            <button
                onClick={() =>
                    adicionarAoCarrinho(produto)
                }
            >
                Adicionar ao carrinho
            </button>

        </article>
    );
}

export default ProdutoCard;