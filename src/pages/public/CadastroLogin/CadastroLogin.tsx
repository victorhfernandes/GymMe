import { useState } from "react";
import Form from "./Form/Form";
import gymmeAluno from "../../../assets/gymme-aluno.png";
import gymmeInstrutor from "../../../assets/gymme-instrutor.png";
import "./CadastroLogin.scss";
import { Link } from "react-router-dom";

type Props = {
  tipo: string;
};

function FormAcesso({ tipo }: Props) {
  const [categoria, setCategoria] = useState(
    sessionStorage.getItem("categoria") || "aluno"
  );

  return (
    <>
      <div className="CadastroLogin__containner">
        <div className="CadastroLogin__left-top">
          <h1 className="CadastroLogin__left-top__title">{tipo}</h1>
        </div>
        <div className="CadastroLogin__left-bottom">
          <div className="CadastroLogin__left-bottom__categoria">
            <p>Fazer {tipo} como:</p>
            <select
              className="CadastroLogin__left-bottom__select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option
                className="CadastroLogin__left-bottom__option"
                value="aluno"
              >
                Aluno
              </option>
              <option
                className="CadastroLogin__left-bottom__option"
                value="instrutor"
              >
                Instrutor
              </option>
            </select>
          </div>
          <Form categoria={categoria} tipo={tipo.toLowerCase()} />
        </div>
        <div className="CadastroLogin__right">
          {categoria === "instrutor" ? (
            <img
              className="CadastroLogin__right__gymme"
              src={gymmeInstrutor}
              alt="Gymme Instrutor"
            />
          ) : (
            <img
              className="CadastroLogin__right__gymme"
              src={gymmeAluno}
              alt="GymMe Aluno"
            />
          )}
        </div>
        <Link
          className="CadastroLogin__link link-no-purple"
          to={"/" + (tipo === "Cadastro" ? "login" : "cadastro")}
        >
          {tipo === "Cadastro"
            ? "Já tem conta? Faça Login"
            : "Não tem conta? Faça seu Cadastro"}
        </Link>
      </div>
    </>
  );
}

export default FormAcesso;
