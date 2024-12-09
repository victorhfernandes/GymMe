import { useEffect, useState } from "react";
import FormAluno from "./FormAluno/FormAluno";
import FormInstrutor from "./FormInstrutor/FormInstrutor";
import DashboardAluno from "./DashboardAluno/DashboardAluno";
import DashboardInstrutor from "./DashboardInstrutor/DashboardInstrutor";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

function Dashboard() {
  const [isCadastroCompleto, setIsCadastroCompleto] = useState();
  const [id, setId] = useState<string>();
  const categoria = getCategoria();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  async function fetchInfos(id: string) {
    const URL = import.meta.env.VITE_API_URL;
    const response = await fetch(
      `${URL}/api/${categoria}/${id}?isCadCompl=true`
    );
    const data = await response.json();
    setIsCadastroCompleto(data);
  }

  function getCategoria() {
    let session = sessionStorage.getItem("categoria");
    if (session) {
      return session;
    } else {
      return "Faça Login";
    }
  }

  async function getId() {
    const fetchUrl = `${URL}/api/${categoria}/login/status`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      const stringId = String(data.id);
      console.log(stringId);
      setId(stringId);
      fetchInfos(stringId);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    getId();
    if (categoria === "Faça Login") {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    }
  }, []);

  return (
    <>
      {!(categoria === "Faça Login") && id ? (
        <>
          {!isCadastroCompleto ? (
            categoria === "aluno" ? (
              <FormAluno categoria={categoria} id={id} closeModal={() => {}} />
            ) : (
              <FormInstrutor
                categoria={categoria}
                id={id}
                closeModal={() => {}}
              />
            )
          ) : categoria === "aluno" ? (
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
