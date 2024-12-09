import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../../utils/FetchUrl";
import Loading from "../../../components/Loading/Loading";
import instrutor from "../../../assets/perfil-instrutor.png";
import "./PerfilInstrutor.scss";
import Separador from "../../../components/Separator/Separador";
import Anchor from "../../../components/Anchor/Anchor";
import Modal from "../../../components/Modal/Modal";

type Instrutor = {
  id_instrutor: number;
  created_at: string;
  intro_instrutor: string | null;
  nm_instrutor: string;
  email_instrutor: string;
  celular_instrutor: string;
  cref_instrutor: string;
  foto_perfil: string | null;
  notaMedia: string;
  especializacoes: string[];
  certificacoes: string[];
  experiencias: string[];
  links: string[];
  cidades: string[];
};

function PerfilInstrutor() {
  const [isModalAlert, setisModalAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [instrutorData, setInstrutorData] = useState<Instrutor>();
  const { idInstrutor } = useParams();
  const [idAluno, setIdAluno] = useState<string>();
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;
  const URL = import.meta.env.VITE_API_URL;

  async function fetchInstrutor() {
    const data = await fetchUrl(`/api/instrutor/${idInstrutor}?compl=true`);
    setInstrutorData(data);
  }

  async function postServico() {
    const postData = {
      isSolicitacao: true,
    };
    const response = await fetchUrl(
      `/api/aluno/servico/${idInstrutor}&${idAluno}`,
      postData,
      "POST"
    );

    if (response.ok) {
      setisModalAlert(true);
      setModalMsg(
        "Solicitação de serviço concluida! Aguarde aprovação do instrutor."
      );
    } else {
      setisModalAlert(true);
      setModalMsg("Serviço já solicitado!");
    }
  }

  async function getIdAluno() {
    const fetchUrl = `${URL}/api/aluno/login/status`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const stringId = String(data.id);
    setIdAluno(stringId);
  }

  function getData(data: string) {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const dateString = data || "2024-01-01T00:00:00.000Z";
    const dateObj = new Date(dateString);
    return meses[dateObj.getMonth()] + " de " + dateObj.getFullYear() + ".";
  }

  function closeModal() {
    setisModalAlert(false);
  }

  function justNumbers(num: string) {
    return num.replace(/\D/g, "");
  }

  useEffect(() => {
    getIdAluno();
    fetchInstrutor();
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
      <Link to="/app/dashboard">
        <div className="PerfilInstrutor__voltar">
          <span>{"<"}</span>
          <span>voltar</span>
        </div>
      </Link>
      {instrutorData ? (
        <div className="PerfilInstrutor__containner">
          <div className="PerfilInstrutor__perfil">
            <div className="PerfilInstrutor__perfil__fotonome">
              {instrutorData.foto_perfil ? (
                <img
                  className="PerfilInstrutor__perfil__foto"
                  src={`${FIREBASE_URL}${instrutorData.foto_perfil}`}
                  alt=""
                />
              ) : (
                <img
                  className="PerfilInstrutor__perfil__foto"
                  src={instrutor}
                  alt=""
                />
              )}
              <div className="PerfilInstrutor__perfil__fotonome__nomenota">
                <span className="PerfilInstrutor__perfil__nome">
                  {instrutorData.nm_instrutor}
                </span>
                <span>&#9733; {instrutorData.notaMedia}</span>
              </div>
            </div>
            <button
              className="PerfilInstrutor__perfil__azul"
              onClick={postServico}
            >
              SOLICITAR SERVIÇO
            </button>
            <div className="PerfilInstrutor__perfil__infos">
              <div className="PerfilInstrutor__perfil__infos__top">
                <div>
                  <span>Atende as cidades</span>
                  <span>
                    {instrutorData.cidades.map((item, index) =>
                      !(index === instrutorData.cidades.length - 1)
                        ? index === 0
                          ? `${item}`
                          : `, ${item}`
                        : ` e ${item}.`
                    )}
                  </span>
                  <span>Especializações</span>
                  <span>
                    {instrutorData.especializacoes.map((item, index) =>
                      !(index === instrutorData.especializacoes.length - 1)
                        ? index === 0
                          ? `${item}`
                          : `, ${item}`
                        : ` e ${item}.`
                    )}
                  </span>
                </div>
                <div>
                  <span>Usuário desde</span>
                  <span>{getData(instrutorData.created_at)}</span>
                  <span>Qualificações</span>
                  <ul>
                    {instrutorData.certificacoes
                      .concat(instrutorData.experiencias)
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <Separador />
              <span className="PerfilInstrutor__perfil__infos__intro">
                {instrutorData.intro_instrutor}
              </span>
            </div>
          </div>
          <div className="PerfilInstrutor__contatos">
            <span>Minhas redes sociais</span>
            <div className="PerfilInstrutor__contatos__redessociais">
              {instrutorData.links.map((item, index) => (
                <Anchor
                  key={index}
                  className={`fa-brands fa-${item
                    .split(", ")[0]
                    .toLowerCase()}`}
                  href={item.split(", ")[1]}
                />
              ))}
            </div>
            <Separador />
            <span>Meus contatos</span>
            <div className="PerfilInstrutor__contatos__divnumeroemail">
              <div className="PerfilInstrutor__contatos__numeroemail">
                <Anchor
                  className="fa-brands fa-whatsapp"
                  href={`https://wa.me/+55${justNumbers(
                    instrutorData.celular_instrutor
                  )}`}
                ></Anchor>
                <span className="PerfilInstrutor__contatos__numeroemail__numero">
                  {instrutorData.celular_instrutor}
                </span>
              </div>
              <div className="PerfilInstrutor__contatos__numeroemail">
                <Anchor
                  className="fa-regular fa-envelope"
                  href={`mailto:${instrutorData.email_instrutor}`}
                ></Anchor>
                <span className="PerfilInstrutor__contatos__numeroemail__email">
                  {instrutorData.email_instrutor.split("@")[0]}
                  <br />@{instrutorData.email_instrutor.split("@")[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default PerfilInstrutor;
