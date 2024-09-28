import { useState } from "react";
import Form from "../Form/Form";
import gymmeAluno from "../../assets/gymme-aluno.png";
import gymmeInstrutor from "../../assets/gymme-instrutor.png";
import "./Cadastro.scss";

function Cadastro() {
  const [categoria, setCategoria] = useState(
    sessionStorage.getItem("categoria") || "aluno"
  );

  return (
    <>
      <div className="Cadastro__containner">
        <div className="Cadastro__left">
          <h1 className="Cadastro__left__title">Cadastro</h1>
          <div className="Cadastro__left__buttons">
            <button
              className="Cadastro__left__button"
              onClick={() => setCategoria("aluno")}
            >
              Aluno
            </button>
            <button
              className="Cadastro__left__button"
              onClick={() => setCategoria("instrutor")}
            >
              Instrutor
            </button>
          </div>
          <Form categoria={categoria} />
        </div>
        <div className="Cadastro__right">
          <h2 className="Cadastro__right__desc">{categoria}</h2>
          {categoria === "instrutor" ? (
            <img
              className="Cadastro__right__gymme"
              src={gymmeInstrutor}
              alt="Gymme Instrutor"
            />
          ) : (
            <img
              className="Cadastro__right__gymme"
              src={gymmeAluno}
              alt="GymMe Aluno"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Cadastro;
