import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchUrl } from "../../../../../utils/FetchUrl";
import Separador from "../../../../../components/Separator/Separador";
import Loading from "../../../../../components/Loading/Loading";
import aluno from "../../../../../assets/perfil-aluno.png";
import Modal from "../../../../../components/Modal/Modal";

type alunoData = {
  id_aluno: number;
  nm_aluno?: string;
  celular_aluno?: string;
  nascimento_aluno?: string;
  cpf_aluno?: string;
  foto_perfil?: string | null;
};

type alunosData = {
  id_aluno: number;
  foto_perfil: string | null;
  nm_aluno: string;
  status_pagamento: boolean;
  id_servico: number;
};

type Props = {
  id: string;
  setAlunoData: Dispatch<SetStateAction<alunoData | null>>;
  setIdServico: Dispatch<SetStateAction<number>>;
};

function AlunosSolicitacoes({ id, setAlunoData, setIdServico }: Props) {
  const [alunosData, setAlunosData] = useState<alunosData[]>();
  const [solicitacoes, setSolicitacoes] = useState<alunosData[]>();
  const [isModalAlert, setisModalAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;

  async function fetchAlunos() {
    const data = await fetchUrl(`/api/instrutor/servico/${id}&true`);
    setAlunosData(data);
  }

  async function fetchSolicitacoes() {
    const data = await fetchUrl(`/api/instrutor/servico/${id}&null`);
    setSolicitacoes(data);
  }

  async function updateStatus(idAluno: number, status: boolean) {
    const data = { statusServico: status };
    const result = await fetchUrl(
      `/api/instrutor/servico/${id}&${idAluno}`,
      data,
      "PATCH"
    );
    if (result.ok) {
      const msg = status ? "aceita" : "recusada";
      setisModalAlert(true);
      setModalMsg(`Solicitação ${msg} com sucesso!`);
      fetchAlunos();
      fetchSolicitacoes();
    } else {
      setisModalAlert(true);
      setModalMsg("Algo deu errado! Tente novamente mais tarde");
    }
  }

  function closeModal() {
    setisModalAlert(false);
  }

  useEffect(() => {
    fetchAlunos();
    fetchSolicitacoes();
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
      <div className="DashboardInstrutor__alunos">
        <span className="DashboardInstrutor__alunos__titulo">MEUS ALUNOS</span>
        <Separador />
        <div className="DashboardInstrutor__alunos__overflow">
          {alunosData ? (
            alunosData.map((item, index) => (
              <div className="DashboardInstrutor__alunos__card" key={index}>
                <div className="DashboardInstrutor__aluno" key={index}>
                  <div className="DashboardInstrutor__aluno__div">
                    {item.foto_perfil ? (
                      <img
                        className="DashboardInstrutor__aluno__foto"
                        src={FIREBASE_URL + item.foto_perfil}
                      />
                    ) : (
                      <img
                        className="DashboardInstrutor__aluno__foto"
                        src={aluno}
                      />
                    )}
                    <span
                      className="DashboardInstrutor__aluno__nome"
                      onClick={() => {
                        setAlunoData({
                          id_aluno: item.id_aluno,
                          foto_perfil: item.foto_perfil,
                          nm_aluno: item.nm_aluno,
                        });
                        setIdServico(item.id_servico);
                      }}
                    >
                      {item.nm_aluno}
                    </span>
                  </div>
                  <div>
                    {item.status_pagamento ? (
                      <></>
                    ) : (
                      <div className="DashboardInstrutor__aluno__aviso">
                        Aguardando Pagamento
                      </div>
                    )}
                  </div>
                </div>
                <Separador />
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="DashboardInstrutor__solicitacoes">
        <span className="DashboardInstrutor__solicitacoes__titulo">
          Solitações
        </span>
        <Separador />
        <div className="DashboardInstrutor__solicitacoes__overflow">
          {solicitacoes ? (
            solicitacoes.map((item, index) => (
              <div
                className="DashboardInstrutor__solicitacoes__card"
                key={index}
              >
                <div className="DashboardInstrutor__solicitacao">
                  {item.foto_perfil ? (
                    <img
                      className="DashboardInstrutor__solicitacao__foto"
                      src={FIREBASE_URL + item.foto_perfil}
                    />
                  ) : (
                    <img
                      className="DashboardInstrutor__solicitacao__foto"
                      src={aluno}
                    />
                  )}
                  <span className="DashboardInstrutor__solicitacao__nome">{`Solicitação de ${item.nm_aluno}`}</span>
                </div>
                <div className="DashboardInstrutor__solicitacao__botoes">
                  <button
                    className="DashboardInstrutor__solicitacao__botoes__aceitar"
                    onClick={() => updateStatus(Number(item.id_aluno), true)}
                  >
                    ACEITAR
                  </button>
                  <button
                    className="DashboardInstrutor__solicitacao__botoes__recusar"
                    onClick={() => updateStatus(Number(item.id_aluno), false)}
                  >
                    RECUSAR
                  </button>
                  <button className="DashboardInstrutor__solicitacao__botoes__analisar">
                    ANALISAR
                  </button>
                </div>
                <Separador />
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default AlunosSolicitacoes;
