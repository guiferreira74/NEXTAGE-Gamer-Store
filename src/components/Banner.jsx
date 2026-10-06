import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className="banner">
            <div className="banner-texto">
                <h2>Monte seu setup!</h2>

                <p>
                    Encontre os melhores produtos para montar seu computador!
                </p>

                <Link to="/montar-pc">
                    <button>
                        Montar meu PC
                    </button>
                </Link>
            </div>

            <img
                className="banner-imagem"
                src="/imagens/banner-pc.jpg"
                alt="Computador gamer com iluminação azul e roxa"
            />
        </section>
    );
}

export default Banner;