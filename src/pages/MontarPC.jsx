import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MontarPC({ adicionarAoCarrinho }) {
    const [produtos, setProdutos] = useState([]);
    const [selecionados, setSelecionados] = useState({});

    const navigate = useNavigate();

    const categorias = [
        "Processador",
        "Placa-mae",
        "Memoria RAM",
        "Placa de video",
        "Armazenamento",
        "Fonte",
        "Gabinete",
    ];

    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const resposta = await axios.get(
                "http://localhost:8080/produtos"
            );

            setProdutos(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar produtos:", erro);
        }
    }

    function selecionarProduto(categoria, produto) {
        setSelecionados((selecionadosAtuais) => ({
            ...selecionadosAtuais,
            [categoria]: produto,
        }));
    }

    function removerSelecao(categoria) {
        setSelecionados((selecionadosAtuais) => {
            const novaSelecao = { ...selecionadosAtuais };

            delete novaSelecao[categoria];

            return novaSelecao;
        });
    }

    function adicionarMontagemAoCarrinho() {
        const pecasSelecionadas = Object.values(selecionados);

        if (pecasSelecionadas.length === 0) {
            alert("Selecione pelo menos uma peça para montar o seu PC.");
            return;
        }

        pecasSelecionadas.forEach((produto) => {
            adicionarAoCarrinho(produto);
        });

        alert("Montagem adicionada ao carrinho!");

        navigate("/carrinho");
    }

    const total = Object.values(selecionados).reduce(
        (soma, produto) => soma + Number(produto.preco),
        0
    );

    const quantidadeSelecionada = Object.keys(selecionados).length;

    return (
        <main className="pagina-montar-pc">
            <div className="montar-pc-container">

                <h1>Monte seu PC</h1>

                <p>
                    Escolha as peças para montar o seu computador.
                </p>

                <div className="montador-lista">

                    {categorias.map((categoria) => {
                        const produtosDaCategoria = produtos.filter(
                            (produto) =>
                                produto.categoria === categoria
                        );

                        return (
                            <section
                                className="montador-categoria"
                                key={categoria}
                            >
                                <h2>{categoria}</h2>

                                {produtosDaCategoria.length === 0 ? (
                                    <p>
                                        Nenhum produto disponível nesta categoria.
                                    </p>
                                ) : (
                                    <select
                                        value={
                                            selecionados[categoria]?.id || ""
                                        }
                                        onChange={(e) => {
                                            if (e.target.value === "") {
                                                removerSelecao(categoria);
                                                return;
                                            }

                                            const produto =
                                                produtosDaCategoria.find(
                                                    (p) =>
                                                        p.id ===
                                                        Number(e.target.value)
                                                );

                                            if (produto) {
                                                selecionarProduto(
                                                    categoria,
                                                    produto
                                                );
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Selecione uma peça
                                        </option>

                                        {produtosDaCategoria.map(
                                            (produto) => (
                                                <option
                                                    key={produto.id}
                                                    value={produto.id}
                                                >
                                                    {produto.nome} - R${" "}
                                                    {Number(
                                                        produto.preco
                                                    ).toFixed(2)}
                                                </option>
                                            )
                                        )}
                                    </select>
                                )}

                                {selecionados[categoria] && (
                                    <div className="peca-selecionada">
                                        <strong>
                                            {
                                                selecionados[categoria]
                                                    .nome
                                            }
                                        </strong>

                                        <span>
                                            R${" "}
                                            {Number(
                                                selecionados[categoria]
                                                    .preco
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                )}

                            </section>
                        );
                    })}

                </div>

                <div className="montador-total">

                    <div>
                        <p>
                            {quantidadeSelecionada} peça(s) selecionada(s)
                        </p>

                        <h2>
                            Total: R$ {total.toFixed(2)}
                        </h2>
                    </div>

                    <button
                        className="btn-adicionar-montagem"
                        onClick={adicionarMontagemAoCarrinho}
                        disabled={quantidadeSelecionada === 0}
                    >
                        Adicionar montagem ao carrinho
                    </button>

                </div>

            </div>
        </main>
    );
}

export default MontarPC;