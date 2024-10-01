import { useState } from "react";
import FormFetch from "../FormFetch/FormFetch";
import gymmeAluno from "../../assets/gymme-aluno.png";
import gymmeInstrutor from "../../assets/gymme-instrutor.png";
import "./FormAcesso.scss";

type Props = {
  tipo: string;
};

function FormAcesso({ tipo }: Props) {
  const [categoria, setCategoria] = useState(
    sessionStorage.getItem("categoria") || "aluno"
  );

  return (
    <>
      <div className="Acesso__containner">
        <div className="Acesso__left-top">
          <h1 className="Acesso__left-top__title">{tipo}</h1>
        </div>
        <div className="Acesso__left-bottom">
          <div className="Acesso__left-bottom__categoria">
            <p>Fazer {tipo} como:</p>
            <select
              className="Acesso__left-bottom__select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option className="Acesso__left-bottom__option" value="aluno">
                Aluno
              </option>
              <option className="Acesso__left-bottom__option" value="instrutor">
                Instrutor
              </option>
            </select>
          </div>
          <FormFetch categoria={categoria} tipo={tipo.toLowerCase()} />
        </div>
        <div className="Acesso__right">
          {categoria === "instrutor" ? (
            <img
              className="Acesso__right__gymme"
              src={gymmeInstrutor}
              alt="Gymme Instrutor"
            />
          ) : (
            <img
              className="Acesso__right__gymme"
              src={gymmeAluno}
              alt="GymMe Aluno"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FormAcesso;
