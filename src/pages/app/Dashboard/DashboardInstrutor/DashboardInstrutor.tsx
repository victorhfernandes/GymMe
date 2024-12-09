import logo from "../../../../assets/gymme-braço.png";
import instrutor from "../../../../assets/perfil-instrutor.png";
import logout from "../../../../assets/logout.png";
import { useEffect, useState } from "react";
import { fetchUrl } from "../../../../utils/FetchUrl";
import "./DashboardInstrutor.scss";
import Loading from "../../../../components/Loading/Loading";
// import Separador from "../../../../components/Separator/Separador";
import AlunosSolicitacoes from "./AlunosSolicitacoes/AlunosSolicitacoes";
import Planilhas from "./Planilhas/Planilhas";
import CardUsuario from "../CardUsuario/CardUsuario";
import FormInstrutor from "../FormInstrutor/FormInstrutor";
import Footer from "../../../../components/Footer/Footer";

type instrutorData = {
  id_instrutor: number;
  nm_instrutor: string;
  email_instrutor: string;
  celular_instrutor: string;
  cref_instrutor: string;
  nascimento_instrutor: Date;
  foto_perfil: string;
  cpf_instrutor: string;
};

type alunoData = {
  id_aluno: number;
  nm_aluno?: string;
  celular_aluno?: string;
  nascimento_aluno?: string;
  cpf_aluno?: string;
  foto_perfil?: string | null;
};

type Props = {
  id: string;
};

function DashboardInstrutor({ id }: Props) {
  const [instrutorData, setInstrutorData] = useState<instrutorData>();
  const [alunoData, setAlunoData] = useState<alunoData | null>(null);
  const [idServico, setIdServico] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const URL = import.meta.env.VITE_API_URL;

  async function fetchInstrutor() {
    const data = await fetchUrl(`/api/instrutor/${id}`);
    setInstrutorData(data);
  }

  function closeModal() {
    setIsModal(false);
  }

  function showModal() {
    setIsModal(true);
  }

  async function logOut() {
    const fetchUrl = `${URL}/api/instrutor/logout`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      window.location.reload();
    }
  }

  useEffect(() => {
    fetchInstrutor();
  }, []);

  return (
    <>
      {isModal && (
        <div className="Dashboard__configuracoes">
          <FormInstrutor closeModal={closeModal} categoria="aluno" id={id} />
        </div>
      )}
      {instrutorData ? (
        <div className="DashboardInstrutor__containner">
          <div className="Dashboard__navbar">
            <div className="Dashboard__navbar__logoNome">
              <img className="Dashboard__navbar__logoNome__logo" src={logo} />
              <span className="Dashboard__navbar__logoNome__title">GymMe</span>
            </div>
          </div>
          <div className="Dashboard__navbar__logout" onClick={logOut}>
            <img src={logout} alt="" />
          </div>
          <div className="DashboardInstrutor__usuario">
            <CardUsuario
              data={instrutorData}
              nome={instrutorData.nm_instrutor}
              imagem={instrutor}
              textoBotao="Assinatura"
              funcBotao={() => {}}
              showModal={showModal}
            />
          </div>
          {!alunoData ? (
            <AlunosSolicitacoes
              id={id}
              setAlunoData={setAlunoData}
              setIdServico={setIdServico}
            />
          ) : (
            <Planilhas
              id={id}
              alunoData={alunoData}
              setAlunoData={setAlunoData}
              idServico={idServico}
            />
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

export default DashboardInstrutor;
