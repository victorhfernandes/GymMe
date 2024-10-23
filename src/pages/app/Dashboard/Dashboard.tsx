import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import FormAluno from "./FormAluno/FormAluno";
import FormInstrutor from "./FormInstrutor/FormInstrutor";

function Dashboard() {
  const [isCadastroImcompleto, setIsCadastroImcompleto] = useState();
  const id = getId();
  const type = getType();

  async function fetchInfos() {
    const URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${URL}/api/${type}/${id}`);
    const data = await response.json();
    setIsCadastroImcompleto(data);
  }

  useEffect(() => {
    fetchInfos();
  }, []);

  function getType() {
    let session = sessionStorage.getItem("authUser");
    if (session) {
      if (session.includes("aluno")) {
        return "Aluno";
      } else {
        return "Instrutor";
      }
    } else {
      return "Faça Login";
    }
  }

  function getId() {
    let session = sessionStorage.getItem("authUser");
    if (session) {
      if (session.includes("aluno")) {
        const parsed = JSON.parse(session);
        return parsed.id_aluno;
      } else {
        const parsed = JSON.parse(session);
        return parsed.id_instrutor;
      }
    } else {
      return "Faça Login";
    }
  }
  return (
    <>
      {isCadastroImcompleto ? (
        type === "Aluno" ? (
          <FormAluno />
        ) : (
          <FormInstrutor />
        )
      ) : (
        <div>Cadastro completo tela de usuario</div>
      )}
    </>
  );
}

export default Dashboard;
