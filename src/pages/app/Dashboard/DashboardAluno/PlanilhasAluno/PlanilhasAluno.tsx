import React, { useEffect, useState } from "react";
import { fetchUrl } from "../../../../../utils/FetchUrl";
import Separador from "../../../../../components/Separator/Separador";

type instrutorData = {
  id_instrutor: number;
  nm_instrutor: string;
} | null;

type planilhaData = {
  id_planilha: number;
  nm_planilha: string;
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

type Props = {
  id: string;
  instrutorData: instrutorData;
  setInstrutorData: React.Dispatch<React.SetStateAction<instrutorData | null>>;
};

function PlanilhasAluno({ id, instrutorData, setInstrutorData }: Props) {
  const [indexPlanilha, setIndexPlanilha] = useState(0);
  const [planilhaData, setPlanilhaData] = useState<planilhaData[]>([]);

  async function fetchPlanilha() {
    const data = await fetchUrl(
      `/api/instrutor/planilha/${instrutorData?.id_instrutor}&${id}`
    );
    setPlanilhaData(data);
  }

  useEffect(() => {
    fetchPlanilha();
  }, []);

  return (
    <>
      <div className="DashboardAluno__planos">
        <div className="DashboardAluno__planos__header">
          <div
            onClick={() => setInstrutorData(null)}
            className="DashboardAluno__planos__header__voltar"
          >
            <span className="DashboardAluno__planos__header__voltar__simbolo">
              {"< "}
            </span>
            <span>Voltar</span>
          </div>
          <div className="DashboardAluno__planos__header__titulos">
            <span className="DashboardAluno__planos__header__nome">
              {instrutorData?.nm_instrutor.toUpperCase()}
            </span>
            <span className="DashboardAluno__planos__header__planilha">
              {!(planilhaData.length === 0)
                ? planilhaData[indexPlanilha].nm_planilha
                : ""}
            </span>
          </div>
        </div>
        <div className="DashboardAluno__treinos">
          {!(planilhaData.length === 0) ? (
            planilhaData[indexPlanilha].treinos.map((item, index) => (
              <div key={index} className="DashboardAluno__treino">
                <span className="DashboardAluno__treino__titulo">
                  {item.nm_exercicio.toUpperCase()}
                </span>

                <Separador />
                <span>
                  <b>Descrição:</b> {item.ds_treino}
                </span>
                <span>
                  <b>Grupo Muscular:</b> {item.nm_grupoMuscular}
                </span>
                <div className="DashboardAluno__treino__infos">
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
                  className="DashboardAluno__treino__gif"
                  src={item.gif_exercicio}
                  alt=""
                />
              </div>
            ))
          ) : (
            <span>Nenhum treino registrado!</span>
          )}
        </div>
      </div>
      <div className="DashboardAluno__solicitacoes">
        <span className="DashboardAluno__solicitacoes__titulo">
          Planos de Treino
        </span>
        <Separador />
        <div className="DashboardAluno__solicitacoes__overflow">
          {!(planilhaData.length === 0)
            ? planilhaData.map((item, index) => (
                <div className="DashboardAluno__solicitacoes__planos">
                  <div
                    className={
                      "DashboardAluno__solicitacoes__planos__button" +
                      (item?.id_planilha ===
                      planilhaData[indexPlanilha].id_planilha
                        ? "__selected"
                        : "")
                    }
                    onClick={() => setIndexPlanilha(index)}
                  ></div>
                  <span key={index}>{item.nm_planilha}</span>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default PlanilhasAluno;
