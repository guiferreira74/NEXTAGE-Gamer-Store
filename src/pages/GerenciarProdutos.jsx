import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/produtos";


// ================================
// API - LISTAR PRODUTOS
// ================================
async function obterDados() {
    try {
        const resposta = await axios.get(API_URL);
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
        return [];
    }
}


// ================================
// API - CADASTRAR PRODUTO
// ================================
async function incluirProduto(produto, imagem) {
    try {
        if (!imagem) {
            alert("Selecione uma imagem.");
            return false;
        }

        const formData = new FormData();

        formData.append("nome", produto.nome);
        formData.append("quantidade", String(produto.quantidade));
        formData.append("descricao", produto.descricao);
        formData.append("preco", String(produto.preco));

        // NOVO CAMPO
        formData.append("categoria", produto.categoria);

        formData.append("imagem", imagem);

        await axios.post(API_URL, formData);

        return true;

    } catch (erro) {
        console.error("Erro ao cadastrar produto:", erro);
        alert("Erro ao cadastrar produto.");
        return false;
    }
}


// ================================
// API - EDITAR PRODUTO
// ================================
async function editarProduto(produto, imagem) {
    try {
        if (produto.id === undefined) {
            return false;
        }

        const formData = new FormData();

        formData.append("nome", produto.nome);
        formData.append("quantidade", String(produto.quantidade));
        formData.append("descricao", produto.descricao);
        formData.append("preco", String(produto.preco));

        // NOVO CAMPO
        formData.append("categoria", produto.categoria);

        if (imagem) {
            formData.append("imagem", imagem);
        }

        await axios.put(
            `${API_URL}/${produto.id}`,
            formData
        );

        return true;

    } catch (erro) {
        console.error("Erro ao editar produto:", erro);
        alert("Erro ao editar produto.");
        return false;
    }
}


// ================================
// API - EXCLUIR PRODUTO
// ================================
async function excluirProduto(id) {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;

    } catch (erro) {
        console.error("Erro ao excluir produto:", erro);
        alert("Erro ao excluir produto.");
        return false;
    }
}


// ================================
// FORMULÁRIO DE PRODUTO
// ================================
function FormProduto({
    produtoEditando,
    onSalvar,
    onCancelar
}) {

    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);

    // NOVO
    const [categoria, setCategoria] = useState("");

    const [imagem, setImagem] = useState(null);


    useEffect(() => {

        if (produtoEditando) {

            setNome(produtoEditando.nome ?? "");
            setQuantidade(produtoEditando.quantidade ?? 0);
            setDescricao(produtoEditando.descricao ?? "");
            setPreco(produtoEditando.preco ?? 0);

            // Produtos antigos podem ainda não possuir categoria
            setCategoria(produtoEditando.categoria ?? "");

            setImagem(null);

        } else {
            limparFormulario();
        }

    }, [produtoEditando]);


    function limparFormulario() {
        setNome("");
        setQuantidade(0);
        setDescricao("");
        setPreco(0);
        setCategoria("");
        setImagem(null);
    }


    function salvar() {

        if (nome.trim() === "") {
            alert("Informe o nome do produto.");
            return;
        }

        if (categoria === "") {
            alert("Selecione a categoria do produto.");
            return;
        }

        if (quantidade < 0) {
            alert("A quantidade não pode ser negativa.");
            return;
        }

        if (preco < 0) {
            alert("O preço não pode ser negativo.");
            return;
        }

        const produto = {
            id: produtoEditando?.id,
            nome,
            quantidade,
            descricao,
            preco,
            categoria
        };

        onSalvar(produto, imagem);
    }


    return (
        <div className="form-produto">

            <label className="form-label">
                Nome:
            </label>

            <input
                type="text"
                value={nome}
                className="form-control"
                onChange={(e) => setNome(e.target.value)}
            />


            <label className="form-label">
                Quantidade:
            </label>

            <input
                type="number"
                min="0"
                value={quantidade}
                className="form-control"
                onChange={(e) =>
                    setQuantidade(Number(e.target.value))
                }
            />


            <label className="form-label">
                Descrição:
            </label>

            <textarea
                value={descricao}
                className="form-control"
                onChange={(e) =>
                    setDescricao(e.target.value)
                }
            />


            <label className="form-label">
                Preço:
            </label>

            <input
                type="number"
                min="0"
                step="0.01"
                value={preco}
                className="form-control"
                onChange={(e) =>
                    setPreco(Number(e.target.value))
                }
            />


            {/* CATEGORIA */}
            <label className="form-label">
                Categoria:
            </label>

            <select
                value={categoria}
                className="form-control"
                onChange={(e) =>
                    setCategoria(e.target.value)
                }
            >
                <option value="">
                    Selecione uma categoria
                </option>

                <option value="Processador">
                    Processador
                </option>

                <option value="Placa-mae">
                    Placa-mãe
                </option>

                <option value="Memoria RAM">
                    Memória RAM
                </option>

                <option value="Placa de video">
                    Placa de vídeo
                </option>

                <option value="Armazenamento">
                    Armazenamento
                </option>

                <option value="Fonte">
                    Fonte
                </option>

                <option value="Gabinete">
                    Gabinete
                </option>

                <option value="Periferico">
                    Periférico
                </option>

                <option value="Monitor">
                    Monitor
                </option>

                <option value="Outro">
                    Outro
                </option>
            </select>


            <label className="form-label">
                Imagem:
            </label>

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                    setImagem(e.target.files?.[0] ?? null)
                }
            />


            <div className="mt-3">

                <button
                    className="btn btn-primary"
                    onClick={salvar}
                >
                    {produtoEditando
                        ? "Salvar alterações"
                        : "Adicionar"}
                </button>


                {produtoEditando && (

                    <button
                        className="btn btn-secondary ms-2"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>

                )}

            </div>

        </div>
    );
}


// ================================
// TABELA DE PRODUTOS
// ================================
function TabelaProdutos({
    dados,
    onEditar,
    onExcluir
}) {

    return (
        <table className="table table-striped">

            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                </tr>
            </thead>


            <tbody>

                {dados.map((produto) => (

                    <tr key={produto.id}>

                        <td>
                            {produto.id}
                        </td>

                        <td>
                            {produto.nome}
                        </td>

                        <td>
                            {produto.categoria || "Sem categoria"}
                        </td>

                        <td>
                            {produto.quantidade}
                        </td>

                        <td>
                            {produto.descricao}
                        </td>

                        <td>
                            R$ {Number(produto.preco).toFixed(2)}
                        </td>

                        <td>

                            {produto.imagem && (

                                <img
                                    src={`http://localhost:8080/images/img-uploads/${produto.imagem}`}
                                    alt={produto.nome}
                                    width="80"
                                />

                            )}

                        </td>

                        <td>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => onEditar(produto)}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => onExcluir(produto)}
                            >
                                Excluir
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}


// ================================
// PÁGINA DE GERENCIAMENTO
// ================================
function GerenciarProdutos() {

    const [produtos, setProdutos] = useState([]);
    const [produtoEditando, setProdutoEditando] = useState(null);


    async function carregarProdutos() {

        const dados = await obterDados();

        setProdutos(dados);
    }


    useEffect(() => {

        carregarProdutos();

    }, []);


    async function salvarProduto(produto, imagem) {

        let sucesso;

        if (produtoEditando) {

            sucesso = await editarProduto(
                produto,
                imagem
            );

        } else {

            sucesso = await incluirProduto(
                produto,
                imagem
            );
        }


        if (sucesso) {

            setProdutoEditando(null);

            await carregarProdutos();
        }
    }


    async function removerProduto(produto) {

        if (produto.id === undefined) {
            return;
        }

        const confirmar = window.confirm(
            `Deseja realmente excluir "${produto.nome}"?`
        );

        if (!confirmar) {
            return;
        }

        const sucesso = await excluirProduto(
            produto.id
        );


        if (sucesso) {

            if (produtoEditando?.id === produto.id) {
                setProdutoEditando(null);
            }

            await carregarProdutos();
        }
    }


    return (
        <section className="gerenciar-produtos">

            <h1>Produtos</h1>


            <FormProduto
                produtoEditando={produtoEditando}
                onSalvar={salvarProduto}
                onCancelar={() =>
                    setProdutoEditando(null)
                }
            />


            <hr />


            <div className="tabela-produtos">

                <TabelaProdutos
                    dados={produtos}
                    onEditar={(produto) =>
                        setProdutoEditando(produto)
                    }
                    onExcluir={removerProduto}
                />

            </div>

        </section>
    );
}

export default GerenciarProdutos;