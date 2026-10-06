import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Menu from "./components/Menu";
import Banner from "./components/Banner";
import Categorias from "./components/Categorias";
import Produtos from "./components/Produtos";
import Carrinho from "./components/Carrinho";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import MeusPedidos from "./pages/MeusPedidos";
import MenuPagamento from "./pages/MenuPagamento";
import GerenciarProdutos from "./pages/GerenciarProdutos";
import AdminLogin from "./pages/AdminLogin";
import MontarPC from "./pages/MontarPC";

function App() {
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        return usuarioSalvo
            ? JSON.parse(usuarioSalvo)
            : null;
    });

    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState("Todos");

    const [carrinho, setCarrinho] = useState([]);

    function fazerLogout() {
        localStorage.removeItem("usuario");
        setUsuario(null);
    }

    function adicionarAoCarrinho(produto) {
        setCarrinho((carrinhoAtual) => {
            const produtoExiste = carrinhoAtual.find(
                (item) => item.id === produto.id
            );

            if (produtoExiste) {
                return carrinhoAtual.map((item) =>
                    item.id === produto.id
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1
                        }
                        : item
                );
            }

            return [
                ...carrinhoAtual,
                {
                    ...produto,
                    quantidade: 1
                }
            ];
        });
    }

    function aumentarQuantidade(id) {
        setCarrinho((carrinhoAtual) =>
            carrinhoAtual.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                    : item
            )
        );
    }

    function diminuirQuantidade(id) {
        setCarrinho((carrinhoAtual) =>
            carrinhoAtual
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1
                        }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }

    function removerProduto(index) {
        setCarrinho((carrinhoAtual) =>
            carrinhoAtual.filter((_, i) => i !== index)
        );
    }

    function limparCarrinho() {
        setCarrinho([]);
    }

    return (
        <BrowserRouter>

            <Header
                usuario={usuario}
                onLogout={fazerLogout}
            />

            <Routes>

                {/* PÁGINA INICIAL DA NEXTAGE */}
                <Route
                    path="/"
                    element={
                        <>
                            <Menu />

                            <section className="apresentacao-loja">

                                <div className="apresentacao-topo">

                                    <div className="texto-apresentacao">

                                        <p className="titulo-menor">
                                            NEXTAGE GAMER STORE
                                        </p>

                                        <h2>
                                            Encontre o setup certo
                                            <span> para o seu jeito de jogar.</span>
                                        </h2>

                                        <p className="descricao-apresentacao">
                                            Escolha componentes, periféricos
                                            e peças para montar uma configuração
                                            que combine com você.
                                        </p>

                                    </div>

                                    <p className="status-loja">
                                        ● PRONTO PARA MONTAR
                                    </p>

                                </div>

                                <div className="categorias-loja">

                                    <div className="categoria-loja">
                                        <h3>Hardware</h3>

                                        <p>
                                            Componentes para melhorar
                                            o seu computador.
                                        </p>
                                    </div>

                                    <div className="categoria-loja">
                                        <h3>Performance</h3>

                                        <p>
                                            Peças para diferentes
                                            configurações e necessidades.
                                        </p>
                                    </div>

                                    <div className="categoria-loja">
                                        <h3>Periféricos</h3>

                                        <p>
                                            Complete seu espaço gamer
                                            com novos acessórios.
                                        </p>
                                    </div>

                                    <div className="categoria-loja">
                                        <h3>Seu setup</h3>

                                        <p>
                                            Escolha as peças e monte
                                            seu computador do seu jeito.
                                        </p>
                                    </div>

                                </div>

                            </section>

                            <Banner />

                            <Categorias
                                categoriaSelecionada={categoriaSelecionada}
                                setCategoriaSelecionada={setCategoriaSelecionada}
                            />

                            <Produtos
                                adicionarAoCarrinho={adicionarAoCarrinho}
                                categoriaSelecionada={categoriaSelecionada}
                            />

                        </>
                    }
                />


                {/* LOGIN DO CLIENTE */}
                <Route
                    path="/login"
                    element={
                        <Login onLogin={setUsuario} />
                    }
                />


                {/* CADASTRO DE CLIENTE */}
                <Route
                    path="/cadastro"
                    element={
                        <Cadastro />
                    }
                />


                {/* LOGIN DO ADMINISTRADOR */}
                <Route
                    path="/admin-login"
                    element={
                        <AdminLogin onLogin={setUsuario} />
                    }
                />


                {/* ÁREA DO ADMINISTRADOR */}
                <Route
                    path="/admin"
                    element={
                        usuario && usuario.tipo === "admin"
                            ? <GerenciarProdutos />
                            : <AdminLogin onLogin={setUsuario} />
                    }
                />


                {/* CARRINHO */}
                <Route
                    path="/carrinho"
                    element={
                        <Carrinho
                            carrinho={carrinho}
                            removerProduto={removerProduto}
                            aumentarQuantidade={aumentarQuantidade}
                            diminuirQuantidade={diminuirQuantidade}
                            limparCarrinho={limparCarrinho}
                        />
                    }
                />


                {/* PEDIDOS */}
                <Route
                    path="/pedidos"
                    element={
                        <MeusPedidos />
                    }
                />


                {/* PAGAMENTO */}
                <Route
                    path="/menu"
                    element={
                        <MenuPagamento
                            carrinho={carrinho}
                            limparCarrinho={limparCarrinho}
                        />
                    }
                />


                {/* MONTAR PC */}
                <Route
                    path="/montar-pc"
                    element={
                        <MontarPC
                            adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                    }
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;