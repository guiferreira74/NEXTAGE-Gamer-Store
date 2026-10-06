import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MenuPagamento({ carrinho, limparCarrinho }) {
    const [formaPagamento, setFormaPagamento] = useState("");
    const [processando, setProcessando] = useState(false);

    // Dados do cartão
    const [numeroCartao, setNumeroCartao] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCvv] = useState("");

    const navigate = useNavigate();

    const total = carrinho.reduce(
        (soma, produto) =>
            soma + Number(produto.preco) * produto.quantidade,
        0
    );

    function formatarNumeroCartao(valor) {
        const somenteNumeros = valor
            .replace(/\D/g, "")
            .slice(0, 16);

        return somenteNumeros.replace(
            /(\d{4})(?=\d)/g,
            "$1 "
        );
    }

    function formatarValidade(valor) {
        const somenteNumeros = valor
            .replace(/\D/g, "")
            .slice(0, 4);

        if (somenteNumeros.length > 2) {
            return (
                somenteNumeros.slice(0, 2) +
                "/" +
                somenteNumeros.slice(2)
            );
        }

        return somenteNumeros;
    }

    async function finalizarCompra() {

        // Verifica se o usuário está logado
        const usuarioSalvo =
            localStorage.getItem("usuario");

        if (!usuarioSalvo) {
            alert(
                "Você precisa entrar na sua conta para finalizar a compra."
            );

            navigate("/login");
            return;
        }

        // Verifica se existem produtos
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");

            navigate("/");
            return;
        }

        // Verifica forma de pagamento
        if (!formaPagamento) {
            alert("Escolha uma forma de pagamento.");
            return;
        }

        // Validação do cartão
        if (formaPagamento === "Cartão") {

            if (
                numeroCartao.replace(/\s/g, "").length !== 16 ||
                nomeTitular.trim() === "" ||
                validade.length !== 5 ||
                cvv.length !== 3
            ) {
                alert(
                    "Preencha corretamente todos os dados do cartão."
                );

                return;
            }
        }

        const usuario = JSON.parse(usuarioSalvo);

        const pedido = {
            usuarioId: usuario.id,
            formaPagamento: formaPagamento,
            total: total,
            produtos: carrinho
        };

        try {

            setProcessando(true);

            const resposta = await fetch(
                "http://localhost:8080/pedidos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(pedido)
                }
            );

            if (!resposta.ok) {
                throw new Error(
                    "Erro ao salvar o pedido."
                );
            }

            const pedidoSalvo =
                await resposta.json();

            limparCarrinho();

            alert(
                `Compra realizada com sucesso! Pedido #${pedidoSalvo.id}`
            );

            navigate("/pedidos");

        } catch (erro) {

            console.error(
                "Erro ao finalizar compra:",
                erro
            );

            alert(
                "Não foi possível finalizar a compra. Tente novamente."
            );

        } finally {

            setProcessando(false);

        }
    }

    return (
        <section className="menu-pagamento">

            <h1>Menu de Pagamento</h1>

            {carrinho.length === 0 ? (

                <p>Seu carrinho está vazio.</p>

            ) : (

                <>

                    <h2>Resumo da compra</h2>

                    <div className="resumo-pagamento">

                        {carrinho.map((produto) => (

                            <div
                                key={produto.id}
                                className="produto-pagamento"
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
                                    R${" "}
                                    {(
                                        Number(produto.preco) *
                                        produto.quantidade
                                    ).toFixed(2)}
                                </p>

                            </div>

                        ))}

                    </div>

                    <h2>
                        Total: R$ {total.toFixed(2)}
                    </h2>

                    <h3>
                        Escolha uma forma de pagamento:
                    </h3>

                    <div className="formas-pagamento">

                        <button
                            type="button"
                            className={
                                formaPagamento === "Pix"
                                    ? "pagamento-selecionado"
                                    : ""
                            }
                            onClick={() =>
                                setFormaPagamento("Pix")
                            }
                        >
                            Pix
                        </button>

                        <button
                            type="button"
                            className={
                                formaPagamento === "Cartão"
                                    ? "pagamento-selecionado"
                                    : ""
                            }
                            onClick={() =>
                                setFormaPagamento("Cartão")
                            }
                        >
                            Cartão
                        </button>

                        <button
                            type="button"
                            className={
                                formaPagamento === "Boleto"
                                    ? "pagamento-selecionado"
                                    : ""
                            }
                            onClick={() =>
                                setFormaPagamento("Boleto")
                            }
                        >
                            Boleto
                        </button>

                    </div>


                    {/* PAGAMENTO PIX */}

                    {formaPagamento === "Pix" && (

                        <div className="detalhes-pagamento">

                            <h3>
                                Pagamento via Pix
                            </h3>

                            <p>
                                Escaneie o QR Code abaixo
                                para realizar o pagamento.
                            </p>

                            <div className="pix-qrcode">

                                <img
                                    src="/imagens/qrcode-pix.png"
                                    alt="QR Code Pix"
                                />

                            </div>

                            <p className="pix-titulo">
                                Ou utilize a chave Pix:
                            </p>

                            <div className="chave-pix">
                                nextage@exemplo.com
                            </div>

                            <small>
                                Chave Pix fictícia utilizada
                                apenas para demonstração.
                            </small>

                        </div>

                    )}


                    {/* PAGAMENTO CARTÃO */}

                    {formaPagamento === "Cartão" && (

                        <div className="detalhes-pagamento">

                            <h3>
                                Dados do cartão
                            </h3>

                            <div className="form-cartao">

                                <label>
                                    Número do cartão
                                </label>

                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    value={numeroCartao}
                                    onChange={(event) =>
                                        setNumeroCartao(
                                            formatarNumeroCartao(
                                                event.target.value
                                            )
                                        )
                                    }
                                />

                                <label>
                                    Nome do titular
                                </label>

                                <input
                                    type="text"
                                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                                    value={nomeTitular}
                                    onChange={(event) =>
                                        setNomeTitular(
                                            event.target.value.toUpperCase()
                                        )
                                    }
                                />

                                <div className="cartao-linha">

                                    <div>

                                        <label>
                                            Validade
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="MM/AA"
                                            value={validade}
                                            onChange={(event) =>
                                                setValidade(
                                                    formatarValidade(
                                                        event.target.value
                                                    )
                                                )
                                            }
                                        />

                                    </div>

                                    <div>

                                        <label>
                                            CVV
                                        </label>

                                        <input
                                            type="password"
                                            inputMode="numeric"
                                            placeholder="000"
                                            maxLength="3"
                                            value={cvv}
                                            onChange={(event) =>
                                                setCvv(
                                                    event.target.value
                                                        .replace(
                                                            /\D/g,
                                                            ""
                                                        )
                                                        .slice(
                                                            0,
                                                            3
                                                        )
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <small>
                                    Pagamento simulado para
                                    fins acadêmicos. Não utilize
                                    dados reais de cartão.
                                </small>

                            </div>

                        </div>

                    )}


                    {/* PAGAMENTO BOLETO */}

                    {formaPagamento === "Boleto" && (

                        <div className="detalhes-pagamento">

                            <h3>
                                Pagamento via Boleto
                            </h3>

                            <p>
                                O boleto será gerado após
                                a confirmação da compra.
                            </p>

                            <p>
                                O pagamento poderá levar
                                até 3 dias úteis para ser
                                identificado.
                            </p>

                        </div>

                    )}


                    {/* FORMA SELECIONADA */}

                    {formaPagamento && (

                        <p className="forma-selecionada">

                            Forma selecionada:{" "}

                            <strong>
                                {formaPagamento}
                            </strong>

                        </p>

                    )}


                    {/* BOTÃO CONFIRMAR */}

                    <button
                        type="button"
                        className="btn-confirmar-compra"
                        onClick={finalizarCompra}
                        disabled={processando}
                    >

                        {processando
                            ? "Finalizando..."
                            : "Confirmar compra"}

                    </button>

                </>

            )}

        </section>
    );
}

export default MenuPagamento;