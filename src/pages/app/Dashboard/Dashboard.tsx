import { useEffect, useState } from "react";
import FormAluno from "./FormAluno/FormAluno";
import FormInstrutor from "./FormInstrutor/FormInstrutor";

function Dashboard() {
  const [isCadastroImcompleto, setIsCadastroImcompleto] = useState();
  const id = getId();
  const categoria = getCategoria();

  async function fetchInfos() {
    const URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${URL}/api/${categoria}/${id}`);
    const data = await response.json();
    setIsCadastroImcompleto(data);
  }

  useEffect(() => {
    fetchInfos();
  }, []);

  function getCategoria() {
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
        categoria === "Aluno" ? (
          <FormAluno categoria={categoria} id={id} />
        ) : (
          <FormInstrutor categoria={categoria} id={id} />
        )
      ) : (
        <div>Cadastro completo tela de usuario</div>
      )}
    </>
  );
}

export default Dashboard;
