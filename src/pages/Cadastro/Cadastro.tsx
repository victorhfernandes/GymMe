import { useState } from "react";
import Form from "../Form/Form";
import gymmeAluno from "../../assets/gymme-aluno.png";
import gymmeInstrutor from "../../assets/gymme-instrutor.png";
import "./Cadastro.scss";

function Cadastro() {
  const [categoria, setCategoria] = useState(
    sessionStorage.getItem("categoria") || "aluno"
  );

  function firstLetterUpperCase(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <>
      <div className="Cadastro__containner">
        <div className="Cadastro__left-top">
          <h1 className="Cadastro__left-top__title">Cadastro</h1>
        </div>
        <div className="Cadastro__left-bottom">
          <div className="Cadastro__left-bottom__buttons">
            <button
              className="Cadastro__left-bottom__button"
              onClick={() => setCategoria("aluno")}
            >
              Aluno
            </button>
            <button
              className="Cadastro__left-bottom__button"
              onClick={() => setCategoria("instrutor")}
            >
              Instrutor
            </button>
          </div>
          <Form categoria={categoria} />
        </div>
        <div className="Cadastro__right-top">
          {categoria === "instrutor" ? (
            <img
              className="Cadastro__right-top__gymme"
              src={gymmeInstrutor}
              alt="Gymme Instrutor"
            />
          ) : (
            <img
              className="Cadastro__right-top__gymme"
              src={gymmeAluno}
              alt="GymMe Aluno"
            />
          )}
        </div>
        <div className="Cadastro__right-bottom">
          <h1>{firstLetterUpperCase(categoria)}</h1>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
