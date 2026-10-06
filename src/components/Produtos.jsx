import { useEffect, useState } from "react";
import ProdutoCard from "./ProdutoCard";

function Produtos({
    adicionarAoCarrinho
}) {

    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {

        fetch("http://localhost:8080/produtos")
            .then((resposta) => {

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar produtos.");
                }

                return resposta.json();

            })
            .then((dados) => {
                setProdutos(dados);
                setCarregando(false);
            })
            .catch(() => {
                setErro(
                    "Não foi possível carregar os produtos. Verifique se o ServerLoja está funcionando."
                );
                setCarregando(false);
            });

    }, []);

    const produtosFiltrados = produtos.filter((produto) => {

        const texto = pesquisa.toLowerCase();

        return (
            produto.nome.toLowerCase().includes(texto) ||
            (produto.descricao || "").toLowerCase().includes(texto)
        );

    });

    return (
        <section className="produtos" id="produtos">

            <h2>Produtos</h2>

            <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={pesquisa}
                onChange={(event) =>
                    setPesquisa(event.target.value)
                }
            />

            {carregando ? (

                <p>Carregando produtos...</p>

            ) : erro ? (

                <p>{erro}</p>

            ) : produtosFiltrados.length === 0 ? (

                <p>
                    Nenhum produto encontrado.
                </p>

            ) : (

                <div className="lista-produtos">

                    {produtosFiltrados.map((produto) => (

                        <ProdutoCard
                            key={produto.id}
                            produto={produto}
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default Produtos;