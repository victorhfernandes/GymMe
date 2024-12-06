import { useEffect, useState } from "react";
import FormAluno from "./FormAluno/FormAluno";
import FormInstrutor from "./FormInstrutor/FormInstrutor";
import DashboardAluno from "./DashboardAluno/DashboardAluno";
import DashboardInstrutor from "./DashboardInstrutor/DashboardInstrutor";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

function Dashboard() {
  const [isCadastroCompleto, setIsCadastroCompleto] = useState();
  const id = getId();
  const categoria = getCategoria();
  const navigate = useNavigate();

  async function fetchInfos() {
    const URL = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${URL}/api/${categoria}/${id}?isCadCompl=true`
    );
    const data = await response.json();
    setIsCadastroCompleto(data);
  }

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

  useEffect(() => {
    fetchInfos();
    if (categoria === "Faça Login") {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);

  return (
    <>
      {!(categoria === "Faça Login") ? (
        <>
          {!isCadastroCompleto ? (
            categoria === "Aluno" ? (
              <FormAluno categoria={categoria} id={id} closeModal={() => {}} />
            ) : (
              <FormInstrutor
                categoria={categoria}
                id={id}
                closeModal={() => {}}
              />
            )
          ) : categoria === "Aluno" ? (
            <DashboardAluno id={id} />
          ) : (
            <DashboardInstrutor id={id} />
          )}
        </>
      ) : (
        <div>{categoria}!</div>
      )}
    </>
  );
}

export default Dashboard;
