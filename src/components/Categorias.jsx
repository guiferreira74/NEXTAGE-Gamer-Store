function Categorias({ categoriaSelecionada, setCategoriaSelecionada }) {
    const categorias = [
        "Todos",
        "Processador",
        "Placa de Vídeo",
        "Placa-Mãe",
        "Memória RAM",
        "SSD",
        "Fonte",
        "Gabinete",
        "Cooler"
    ];

    return (
        <nav className="categorias">
            {categorias.map((categoria) => (
                <button
                    key={categoria}
                    onClick={() =>
                        setCategoriaSelecionada(categoria)
                    }
                >
                    {categoria}
                </button>
            ))}
        </nav>
    );
}

export default Categorias;