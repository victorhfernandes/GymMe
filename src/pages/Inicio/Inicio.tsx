import logo from "../../assets/gymme braço.png";
import { Link } from "react-router-dom";
import CardSlider from "../../components/CardSlider/CardSlider";
import "./Inicio.scss";

function Inicio() {
  function storeInstrutor() {
    sessionStorage.setItem("categoria", "instrutor");
  }

  function storeAluno() {
    sessionStorage.setItem("categoria", "aluno");
  }

  return (
    <>
      <div className="Inicio__containner">
        <div className="Inicio__left">
          <div className="Inicio__left__info">
            <h1 className="Inicio__left__title">
              Encontre agora seu instrutor
            </h1>
            <p className="Inicio__left__subtitle">
              Nosso site conecta você a instrutores qualificados que oferecem
              treinos personalizados, adaptados às suas necessidades e
              objetivos.
            </p>
            <h2 className="Inicio__left__cadastro">Faça seu Cadastro</h2>
            <div className="Inicio__left__buttons">
              <Link
                className="Inicio__left__button"
                to="/cadastro"
                onClick={storeAluno}
              >
                Sou aluno
              </Link>
              <Link
                className="Inicio__left__button"
                to="/cadastro"
                onClick={storeInstrutor}
              >
                Sou instrutor
              </Link>
            </div>
          </div>
        </div>
        <div className="Inicio__right">
          <img className="Inicio__right__logo" src={logo} alt="logo" />
        </div>
      </div>
      <CardSlider />
    </>
  );
}

export default Inicio;
