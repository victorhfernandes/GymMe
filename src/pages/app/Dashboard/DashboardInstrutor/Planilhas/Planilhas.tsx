import React, { useEffect, useState } from "react";
import { fetchUrl } from "../../../../../utils/FetchUrl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import Loading from "../../../../../components/Loading/Loading";
import Separador from "../../../../../components/Separator/Separador";
import Modal from "../../../../../components/Modal/Modal";

const schemaTreino = z.object({
  nm_exercicio: z.string(),
  id_grupoMuscular: z.string(),
  id_planilha: z.number().int().optional(),
  qt_treino: z.string(),
  qt_serie: z.string(),
  kg_carga: z.string(),
  ds_treino: z.string().max(255).optional(),
  gif_exercicio: z.string().url().optional(),
});

type FieldTreino = z.infer<typeof schemaTreino>;

type alunoData = {
  id_aluno: number;
  nm_aluno?: string;
  celular_aluno?: string;
  nascimento_aluno?: string;
  cpf_aluno?: string;
  foto_perfil?: string | null;
};

type planilhaData = {
  id_planilha: number;
  nm_planilha: string;
  id_servico: number;
  treinos: {
    id_treino: number;
    nm_exercicio: string;
    id_grupoMuscular: number;
    id_planilha: number;
    nm_grupoMuscular: string;
    ds_treino: string;
    qt_treino: number;
    qt_serie: number;
    kg_carga: number;
    sg_descanso: number;
    gif_exercicio: string;
  }[];
};

type GrupoMuscular = {
  value: number;
  label: string;
};

type Props = {
  id: string;
  alunoData: alunoData;
  idServico: number;
  setAlunoData: React.Dispatch<React.SetStateAction<alunoData | null>>;
};

function Planilhas({ id, alunoData, idServico, setAlunoData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    // setError,
    // clearErrors,
    formState: { /*errors,*/ isSubmitting },
  } = useForm<FieldTreino>({
    resolver: zodResolver(schemaTreino),
    defaultValues: async () => fetchUrl(`/api/aluno/${id}`),
  });
  const [isModalAlert, setisModalAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [indexPlanilha, setIndexPlanilha] = useState(0);
  const [planilhaData, setPlanilhaData] = useState<planilhaData[]>([]);
  const [nomePlanilha, setNomePlanilha] = useState("");
  const [grupoMuscular, setGrupoMuscular] = useState<GrupoMuscular[]>([]);

  async function fetchPlanilha() {
    const data = await fetchUrl(
      `/api/instrutor/planilha/${id}&${alunoData.id_aluno}`
    );
    setPlanilhaData(data);
  }

  async function postPlanilha(nm_planilha: string, id_servico: number) {
    const data = { nm_planilha, id_servico };
    if (nm_planilha !== "") {
      const response = await fetchUrl("/api/instrutor/planilha", data, "POST");
      if (response.ok) {
        setisModalAlert(true);
        setModalMsg("Planilha feita com sucesso!");
        fetchPlanilha();
      } else {
        setisModalAlert(true);
        setModalMsg("Algo deu errado!");
      }
    }
  }

  async function onSubmit(data: FieldTreino) {
    data.id_planilha = planilhaData[indexPlanilha].id_planilha;
    const response = await fetchUrl(`/api/instrutor/treino`, data, "POST");
    if (response.ok) {
      setisModalAlert(true);
      setModalMsg("Treino salvo com sucesso!");
      fetchPlanilha();
      reset();
    } else {
      setisModalAlert(true);
      setModalMsg("Algo deu errado!");
    }
  }

  async function deleteTreino(id_treino: number) {
    const data = {
      id_treino,
    };
    const response = await fetchUrl("/api/instrutor/treino", data, "DELETE");
    if (response.ok) {
      setisModalAlert(true);
      setModalMsg("Treino deletado com sucesso!");
      fetchPlanilha();
    } else {
      setisModalAlert(true);
      setModalMsg("Algo deu errado!");
    }
  }

  async function deletePlanilha(id_planilha: number) {
    const data = {
      id_planilha,
    };
    const response = await fetchUrl("/api/instrutor/planilha", data, "DELETE");
    if (response.ok) {
      setisModalAlert(true);
      setModalMsg("Planilha deletada com sucesso!");
      fetchPlanilha();
      setIndexPlanilha(0);
    } else {
      setisModalAlert(true);
      setModalMsg("Algo deu errado!");
    }
  }

  function closeModal() {
    setisModalAlert(false);
  }

  async function fetchGrupoMuscular() {
    const data = await fetchUrl("/api/instrutor/grupomuscular");
    setGrupoMuscular(data);
  }

  useEffect(() => {
    fetchPlanilha();
    fetchGrupoMuscular();
  }, []);

  return (
    <>
      {isModalAlert && (
        <Modal>
          <div className="Modal__alert">
            <span>{modalMsg}</span>
            <button onClick={closeModal} className="Modal__alert__botao">
              OK
            </button>
          </div>
        </Modal>
      )}
      <div className="DashboardInstrutor__planos">
        <div className="DashboardInstrutor__planos__header">
          <div
            onClick={() => setAlunoData(null)}
            className="DashboardInstrutor__planos__header__voltar"
          >
            <span className="DashboardInstrutor__planos__header__voltar__simbolo">
              {"< "}
            </span>
            <span>Voltar</span>
          </div>
          <div className="DashboardInstrutor__planos__header__titulos">
            <span className="DashboardInstrutor__planos__header__nome">
              {alunoData.nm_aluno?.toUpperCase()}
            </span>
            <span className="DashboardInstrutor__planos__header__planilha">
              {!(planilhaData.length === 0)
                ? planilhaData[indexPlanilha].nm_planilha
                : ""}
            </span>
          </div>
        </div>
        <div className="DashboardInstrutor__treinos">
          {!(planilhaData.length === 0)
            ? planilhaData[indexPlanilha].treinos.map((item, index) => (
                <div key={index} className="DashboardInstrutor__treino">
                  <div className="DashboardInstrutor__treino__botoes">
                    <span className="DashboardInstrutor__treino__titulo">
                      {item.nm_exercicio.toUpperCase()}
                    </span>
                    {/* <button>Editar</button> */}
                    <button
                      className="fa-solid fa-trash"
                      onClick={() => deleteTreino(item.id_treino)}
                    ></button>
                  </div>
                  <Separador />
                  <span>
                    <b>Descrição:</b> {item.ds_treino}
                  </span>
                  <span>
                    <b>Grupo Muscular:</b> {item.nm_grupoMuscular}
                  </span>
                  <div className="DashboardInstrutor__treino__infos">
                    <span>
                      <b>Repetições:</b> {item.qt_treino}
                    </span>
                    <span>
                      <b>Séries:</b> {item.qt_serie}
                    </span>
                    <span>
                      <b>Carga:</b> {item.kg_carga}kg
                    </span>
                  </div>
                  <img
                    className="DashboardInstrutor__treino__gif"
                    src={item.gif_exercicio}
                    alt=""
                  />
                </div>
              ))
            : ""}
          <form
            className="DashboardInstrutor__treino2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="DashboardInstrutor__treino__titulo">
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="text"
                {...register("nm_exercicio")}
              />
            </span>
            <div className="DashboardInstrutor__treino__botoes">
              <button disabled={isSubmitting} type="submit">
                Criar
              </button>
              {/* <button>Deletar</button> */}
            </div>
            <Separador />
            <span>
              <b>Descrição:</b>{" "}
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="text"
                {...register("ds_treino")}
              />
            </span>
            <span>
              <b>Grupo Muscular:</b>{" "}
              <select
                className="DashboardInstrutor__solicitacoes__planos__input"
                {...register("id_grupoMuscular")}
              >
                {grupoMuscular.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </span>

            <span>
              <b>Repetições:</b>{" "}
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="number"
                {...register("qt_treino")}
              />
            </span>
            <span>
              <b>Séries:</b>{" "}
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="number"
                {...register("qt_serie")}
              />
            </span>
            <span>
              <b>Carga:</b>{" "}
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="number"
                {...register("kg_carga")}
              />
            </span>
            <span>
              <b>Link gif:</b>{" "}
              <input
                className="DashboardInstrutor__solicitacoes__planos__input"
                type="text"
                {...register("gif_exercicio")}
              />
            </span>
          </form>
        </div>
      </div>
      <div className="DashboardInstrutor__solicitacoes">
        <span className="DashboardInstrutor__solicitacoes__titulo">
          Planos de Treino
        </span>
        <Separador />
        <div className="DashboardInstrutor__solicitacoes__overflow">
          {!(planilhaData.length === 0)
            ? planilhaData.map((item, index) => (
                <div className="DashboardInstrutor__solicitacoes__planos">
                  <div className="DashboardInstrutor__solicitacoes__planos__divnome">
                    <div
                      className={
                        "DashboardInstrutor__solicitacoes__planos__button" +
                        (item?.id_planilha ===
                        planilhaData[indexPlanilha].id_planilha
                          ? "__selected"
                          : "")
                      }
                      onClick={() => setIndexPlanilha(index)}
                    ></div>
                    <span key={index}>{item.nm_planilha}</span>
                    <div className="DashboardInstrutor__solicitacoes__planos__buttons">
                      {/* <button>Editar</button> */}
                      <button
                        className="fa-solid fa-trash"
                        onClick={() => deletePlanilha(item.id_planilha)}
                      ></button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
          <div className="DashboardInstrutor__solicitacoes__planos">
            <div className="DashboardInstrutor__solicitacoes__planos__divnome">
              <input
                type="text"
                className="DashboardInstrutor__solicitacoes__planos__input"
                placeholder="Nome da Planilha"
                onChange={(event) => setNomePlanilha(event.target.value)}
                value={nomePlanilha}
                autoComplete="on"
                name="nomePlanilha"
              />
              <div className="DashboardInstrutor__solicitacoes__planos__buttons">
                <button onClick={() => postPlanilha(nomePlanilha, idServico)}>
                  Criar
                </button>
                {/* <button>Deletar</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Planilhas;
