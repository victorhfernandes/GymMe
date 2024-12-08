import logo from "../../../../assets/gymme-braço.png";
import aluno from "../../../../assets/perfil-aluno.png";
import instrutor from "../../../../assets/perfil-instrutor.png";
import logout from "../../../../assets/logout.png";
import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../../../utils/FetchUrl";
import "./DashboardAluno.scss";
import Loading from "../../../../components/Loading/Loading";
import Separador from "../../../../components/Separator/Separador";
import { Link } from "react-router-dom";
import CardUsuario from "../CardUsuario/CardUsuario";
import PlanilhasAluno from "./PlanilhasAluno/PlanilhasAluno";
import FormAluno from "../FormAluno/FormAluno";
import Footer from "../../../../components/Footer/Footer";
import Modal from "../../../../components/Modal/Modal";

type Especializacao = {
  value: number;
  label: string;
};

type instrutoresData = {
  id: number;
  nome: string;
  especializacoes: string;
  foto: string;
  introducao: string;
  especializacao: string[];
};

type ServicosData = {
  id_instrutor: number;
  foto_perfil: string | null;
  nm_instrutor: string;
  especializacoes: string[];
  status_servico: boolean;
  status_pagamento: boolean;
  updated_at: string; // ISO 8601 timestamp format
};

type instrutorData = {
  id_instrutor: number;
  nm_instrutor: string;
};

type alunoData = {
  id_aluno?: number;
  nm_aluno?: string;
  celular_aluno?: string;
  nascimento_aluno?: string;
  cpf_aluno?: string;
  foto_perfil?: string;
  atestado?: boolean;
  doresPeito?: boolean;
  desequilibrio?: boolean;
  osseoArticular?: boolean;
  medicado?: boolean;
};

type Props = {
  id: string;
};

function DashboardAluno({ id }: Props) {
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [especializacoes, setEspecializacoes] = useState([]);
  const [especializacao, setEspecializacao] = useState<MultiValue<never>>([]);
  const [instrutoresData, setInstrutoresData] = useState<instrutoresData[]>([]);
  const [alunoData, setAlunoData] = useState<alunoData>();
  const [meusInstrutores, setMeusInstrutores] = useState(true);
  const [meusInstrutoresData, setMeusInstrutoresData] =
    useState<ServicosData[]>();
  const [pendencias, setPendencias] = useState<ServicosData[]>();
  const [isModal, setIsModal] = useState(false);
  const [instrutorData, setInstrutorData] = useState<instrutorData | null>(
    null
  );
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;

  function turnEspecializacaoInString() {
    let esp = "";
    especializacao.map((item: Especializacao) => (esp += `esp=${item.value}&`));
    return esp;
  }

  function turnMeusInstrutores() {
    setMeusInstrutores(!meusInstrutores);
  }

  function closeModal() {
    setIsModal(false);
  }

  function closeModalAlert() {
    setIsModalAlert(false);
  }

  function showModal() {
    setIsModal(true);
  }

  async function fetchEspecializacoes() {
    const data = await fetchUrl("/api/instrutor/especializacao");
    setEspecializacoes(data);
  }

  async function fetchMeusInstrutores() {
    const data = await fetchUrl(`/api/aluno/servico/${id}&true&true`);
    setMeusInstrutoresData(data);
  }

  async function fetchPendencias() {
    const pagamentoPendente: ServicosData[] = await fetchUrl(
      `/api/aluno/servico/${id}&true&false`
    );
    const solicitacaoAnalise: ServicosData[] = await fetchUrl(
      `/api/aluno/servico/${id}&null&null`
    );
    const data = pagamentoPendente.concat(solicitacaoAnalise);
    setPendencias(data);
  }

  async function fetchInstrutores() {
    const esp = turnEspecializacaoInString();
    const data = await fetchUrl(`/api/instrutor?${esp}`);
    const reorganizedData = reorganizeInstrutores(data);
    setInstrutoresData(reorganizedData);
  }

  async function fetchAluno() {
    const data = await fetchUrl(`/api/aluno/${id}`);
    setAlunoData(data);
  }

  function reorganizeInstrutores(data: instrutoresData[]) {
    data.map(
      (item) => (item.especializacao = item.especializacoes.split("; "))
    );
    return data;
  }

  async function updateStatusServico(idInstrutor: number, status: boolean) {
    const data = { statusServico: status };
    const result = await fetchUrl(
      `/api/instrutor/servico/${idInstrutor}&${id}`,
      data,
      "PATCH"
    );
    if (result.ok) {
      const msg = status ? "aceita" : "cancelada";
      setIsModalAlert(true);
      setModalMsg(`Solicitação ${msg} com sucesso!`);
      fetchMeusInstrutores();
      fetchPendencias();
    } else {
      setIsModalAlert(true);
      setModalMsg("Algo deu errado! Tente novamente mais tarde");
    }
  }

  async function updateStatusPagamento(idInstrutor: number, status: boolean) {
    const data = { statusPagamento: status };
    const result = await fetchUrl(
      `/api/aluno/servico/${idInstrutor}&${id}`,
      data,
      "PATCH"
    );
    if (result.ok) {
      const msg = status ? "aceito com sucesso!" : "recusado!";
      setIsModalAlert(true);
      setModalMsg(`Pagamento ${msg}`);
      fetchMeusInstrutores();
      fetchPendencias();
    } else {
      setIsModalAlert(true);
      setModalMsg("Algo deu errado! Tente novamente mais tarde");
    }
  }

  function logOut() {
    sessionStorage.removeItem("authUser");
    window.location.reload();
  }

  useEffect(() => {
    fetchInstrutores();
  }, [especializacao]);

  useEffect(() => {
    fetchAluno();
    fetchEspecializacoes();
    fetchMeusInstrutores();
    fetchPendencias();
  }, []);

  return (
    <>
      {isModal && (
        <div className="Dashboard__configuracoes">
          <FormAluno closeModal={closeModal} categoria="aluno" id={id} />
        </div>
      )}
      {isModalAlert && (
        <Modal>
          <div className="Modal__alert">
            <span>{modalMsg}</span>
            <button onClick={closeModalAlert} className="Modal__alert__botao">
              OK
            </button>
          </div>
        </Modal>
      )}
      {alunoData ? (
        <div
          className={`DashboardAluno__containner${meusInstrutores ? "" : "2"}`}
        >
          <div className="Dashboard__navbar">
            <div className="Dashboard__navbar__logoNome">
              <img className="Dashboard__navbar__logoNome__logo" src={logo} />
              <span className="Dashboard__navbar__logoNome__title">GymMe</span>
            </div>
          </div>
          <div className="Dashboard__navbar__logout" onClick={logOut}>
            <img src={logout} alt="" />
          </div>
          {!meusInstrutores ? (
            <></>
          ) : (
            <div className="Dashboard__pesquisa">
              <Select
                className="Dashboard__pesquisa__select"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "#f0f0f0",
                    fontSize: "1.3rem",
                    padding: "0.2em 0.15em",
                    border: "0.06rem solid #000000",
                    borderRadius: "0.3rem",
                  }),
                }}
                placeholder="Especializações"
                options={especializacoes}
                isMulti={true}
                value={especializacao}
                onChange={(selectedOptions) =>
                  setEspecializacao(selectedOptions)
                }
                name="especializacoes"
              />
            </div>
          )}
          <div className="DashboardAluno__usuario">
            <CardUsuario
              data={alunoData}
              nome={alunoData.nm_aluno}
              imagem={aluno}
              textoBotao={
                meusInstrutores ? "Meus instrutores" : "Procurar Instrutores"
              }
              funcBotao={turnMeusInstrutores}
              showModal={showModal}
            />
          </div>
          {meusInstrutores ? (
            <div className="DashboardAluno__conteudo">
              <div className="Slider__containner">
                {instrutoresData.length === 0 ? (
                  <Loading />
                ) : (
                  instrutoresData.map((item, index) => (
                    <div className="Slider__cards" key={index}>
                      <div className="Slider__card">
                        <span className="Slider__card__titulo">
                          {item.nome.toUpperCase()}
                        </span>
                        {item.foto ? (
                          <img
                            className="Slider__card__picture"
                            src={`${FIREBASE_URL}${item.foto}`}
                            alt=""
                          />
                        ) : (
                          <img
                            className="Slider__card__picture"
                            src={logo}
                            alt=""
                          />
                        )}
                        <span className="Slider__card__intro">
                          {item.introducao}
                        </span>
                        <hr />
                        <div className="Slider__card__especializacoes">
                          {item.especializacao.map((item, index) => (
                            <p
                              key={index}
                              className="Slider__card__especializacao"
                            >
                              {"#" + item}
                            </p>
                          ))}
                        </div>
                      </div>
                      <Link
                        to={`instrutor/${item.id}`}
                        className="Slider__card__botao"
                      >
                        Mais informações
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <>
              {instrutorData ? (
                <PlanilhasAluno
                  id={id}
                  instrutorData={instrutorData}
                  setInstrutorData={setInstrutorData}
                />
              ) : (
                <>
                  <div className="DashboardAluno__instrutores">
                    <span className="DashboardAluno__instrutores__titulo">
                      MEUS INSTRUTORES
                    </span>
                    <div className="DashboardAluno__instrutores__overflow">
                      {meusInstrutoresData ? (
                        meusInstrutoresData.map((item, index) => (
                          <div
                            className="DashboardAluno__instrutores__card"
                            key={index}
                          >
                            <div
                              className="DashboardAluno__instrutor"
                              key={index}
                            >
                              <div className="DashboardAluno__instrutor__div">
                                {item.foto_perfil ? (
                                  <img
                                    className="DashboardAluno__instrutor__foto"
                                    src={FIREBASE_URL + item.foto_perfil}
                                  />
                                ) : (
                                  <img
                                    className="DashboardAluno__instrutor__foto"
                                    src={instrutor}
                                  />
                                )}
                                <div className="DashboardAluno__instrutor__nomeespecializacao">
                                  <span className="DashboardAluno__instrutor__nome">
                                    {item.nm_instrutor}
                                  </span>
                                  <div className="DashboardAluno__instrutor__especializacoes">
                                    {item.especializacoes.map((item, index) => (
                                      <span
                                        key={index}
                                        className="DashboardAluno__instrutor__especializacao"
                                      >
                                        {"#" + item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="DashboardAluno__instrutores__divbutton">
                                <button
                                  className="DashboardAluno__instrutores__button"
                                  onClick={() =>
                                    setInstrutorData({
                                      id_instrutor: item.id_instrutor,
                                      nm_instrutor: item.nm_instrutor,
                                    })
                                  }
                                >
                                  Ver treinos
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                  <div className="DashboardAluno__pendencias">
                    <span className="DashboardAluno__pendencias__titulo">
                      Pendências
                    </span>
                    <Separador />
                    <div className="DashboardAluno__pendencias__overflow">
                      {pendencias ? (
                        pendencias.map((item, index) => (
                          <div
                            className="DashboardAluno__pendencias__card"
                            key={index}
                          >
                            <div className="DashboardAluno__pendencia">
                              {item.foto_perfil ? (
                                <img
                                  className="DashboardAluno__pendencia__foto"
                                  src={FIREBASE_URL + item.foto_perfil}
                                />
                              ) : (
                                <img
                                  className="DashboardAluno__pendencia__foto"
                                  src={instrutor}
                                />
                              )}
                              <span className="DashboardAluno__pendencia__nome">{`Solicitação para ${item.nm_instrutor}`}</span>
                            </div>
                            <div className="DashboardAluno__pendencia__botoes">
                              <button
                                className="DashboardAluno__pendencia__botoes__analisar"
                                onClick={() => {
                                  !(item.status_pagamento === null)
                                    ? updateStatusPagamento(
                                        Number(item.id_instrutor),
                                        true
                                      )
                                    : "";
                                }}
                              >
                                {item.status_pagamento === null
                                  ? "SOLICITAÇÃO EM ANÁLISE"
                                  : "REALIZAR PAGAMENTO"}
                              </button>
                              <button
                                className="DashboardAluno__pendencia__botoes__recusar"
                                onClick={() =>
                                  updateStatusServico(
                                    Number(item.id_instrutor),
                                    false
                                  )
                                }
                              >
                                CANCELAR SOLICITAÇÃO
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
              )}
            </>
          )}
          <div className="Dashboard__footer">
            <Footer />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default DashboardAluno;
