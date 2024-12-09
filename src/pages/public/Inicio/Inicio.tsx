import logo from "../../../assets/gymme-braço.png";
import yoni from "../../../assets/yoni.jpg";
import victor from "../../../assets/victor.jpg";
import lucas from "../../../assets/lucas.jpg";
import igor from "../../../assets/igor.jpg";
import { Link } from "react-router-dom";

import "./Inicio.scss";
import Separador from "../../../components/Separator/Separador";
import { useEffect, useState } from "react";

function Inicio() {
  const categoria = getCategoria();
  const URL = import.meta.env.VITE_API_URL;
  const [showDashboard, setShowDashboard] = useState(false);

  function getCategoria() {
    let session = sessionStorage.getItem("categoria");
    if (session) {
      return session;
    } else {
      return "Faça Login";
    }
  }

  async function isLogedIn() {
    const fetchUrl = `${URL}/api/${categoria}/login/status`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      setShowDashboard(true);
    }
  }

  useEffect(() => {
    isLogedIn();
  }, []);

  return (
    <>
      <div className="Inicio__containner">
        <div className="Inicio__conteudo">
          <div className="Inicio__conteudo__titulo">
            <h2>GymMe o seu jeito de treinar</h2>
          </div>
          <div className="Inicio__conteudo__paragrafo">
            <p>
              Uma plataforma que conecta alunos e instrutores em busca dos
              melhores resultados
            </p>
          </div>
          <button className="Inicio__conteudo__cadastro">
            <Link to="cadastro" className="link-no-purple">
              {showDashboard ? "Dashboard" : "Cadastre-se"}
            </Link>
          </button>
        </div>
        <div className="Inicio__sobre">
          <div className="Inicio__sobre__textos">
            <h1>GymMe - Sua Conexão Fitness</h1>
            <p>
              Somos uma plataforma inovadora que conecta alunos e instrutores de
              forma simples e eficiente. Buscamos proporcionar os melhores
              resultados para você.
            </p>
          </div>
          <div className="Inicio__sobre__divlogo">
            <img className="Inicio__sobre__logo" src={logo} alt="" />
          </div>
        </div>
        <div className="Inicio__servicos">
          <div className="Inicio__servicos__headline">
            <div className="Inicio__servicos__headline__titulo">
              <h1>Serviços</h1>
            </div>
            <div className="Inicio__servicos__headline__descricao">
              <p>
                Oferecemos uma plataforma única, com diversas opções para
                instrutores e alunos. Encontre o treino ideal ou o instrutor
                perfeito.
              </p>
            </div>
          </div>

          <div className="Inicio__servicos__titulo">
            <h4>PARA ALUNOS</h4>
          </div>

          <div className="Inicio__servicos__cards">
            <div className="Inicio__servicos__card__left">
              <div className="Inicio__servicos__card__titulo">
                <span>Encontre Instrutores</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>

            <div className="Inicio__servicos__card">
              <div className="Inicio__servicos__card__titulo">
                <span>Acompanhamento Personalizado</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-chart-diagram"></i>
              </div>
            </div>

            <div className="Inicio__servicos__card__left">
              <div className="Inicio__servicos__card__titulo">
                <span>Alcance Seus Objetivos</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-chart-line"></i>
              </div>
            </div>
          </div>

          <div className="Inicio__servicos__titulo">
            <h4>PARA INSTRUTORES</h4>
          </div>

          <div className="Inicio__servicos__cards">
            <div className="Inicio__servicos__card">
              <div className="Inicio__servicos__card__titulo">
                <span>Crie seu Portfólio</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-users"></i>
              </div>
            </div>

            <div className="Inicio__servicos__card__left">
              <div className="Inicio__servicos__card__titulo">
                <span>Ofereça seus Serviços</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-layer-group"></i>
              </div>
            </div>

            <div className="Inicio__servicos__card">
              <div className="Inicio__servicos__card__titulo">
                <span>Alcance novos Alunos</span>
              </div>
              <div className="Inicio__servicos__card__icone">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
            </div>
          </div>
        </div>
        <Separador />
        <div className="Inicio__planos">
          <div className="Inicio__planos__titulos">
            <span>Escolha o Melhor Plano</span>
            <p>Adapte-se aos seus objetivos com nossos planos acessíveis.</p>
          </div>
          <div className="Inicio__planos__cards">
            <div className="Inicio__planos__card">
              <div className="Inicio__planos__card__icone">
                <i className="fa-regular fa-calendar-days"></i>
              </div>
              <span>Plano Mensal</span>
              <span>1 MÊS</span>
              <span>R$34,99</span>
              <span>Por mês</span>
              <span>Total de R$419,88 em 1 ano</span>
            </div>
            <div className="Inicio__planos__card">
              <div className="Inicio__planos__card__icone">
                <i className="fa-regular fa-calendar-days"></i>
              </div>
              <span>Plano Semestral</span>
              <span>6 MESES</span>
              <span>R$192,44</span>
              <span>À vista</span>
              <span>Total de R$384,89 anual, economia de 1 mês!</span>
            </div>
            <div className="Inicio__planos__card">
              <div className="Inicio__planos__card__icone">
                <i className="fa-regular fa-calendar-days"></i>
              </div>
              <span>Plano Anual</span>
              <span>12 MESES</span>
              <span>R$349,90</span>
              <span>À vista</span>
              <span>Economia de 2 meses!</span>
            </div>
          </div>
        </div>
        <div className="Inicio__portfolio">
          <div className="Inicio__portfolio__headline">
            <span>Nosso Time</span>
            <span>Conheça os desenvolvedores responsáveis pelo GymMe.</span>
          </div>
          <div className="Inicio__portfolio__devs">
            <div className="Inicio__portfolio__dev">
              <div className="Inicio__portfolio__dev__perfil">
                <img src={yoni} alt="Yoni Maeda" />
              </div>
              <div className="Inicio__portfolio__dev__infos">
                <span>Yoni Maeda</span>
                <span>Designer UX/UI</span>
                <div className="Inicio__portfolio__dev__icones">
                  <a
                    href="https://www.linkedin.com/in/yoni-m-roman/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/YoniMR" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="Inicio__portfolio__dev">
              <div className="Inicio__portfolio__dev__perfil">
                <img src={igor} alt="Igor Madureira" />
              </div>
              <div className="Inicio__portfolio__dev__infos">
                <span>Igor Madureira</span>
                <span>Desenvolvedor BDA</span>
                <div className="Inicio__portfolio__dev__icones">
                  <a
                    href="https://www.linkedin.com/in/igor-madureira-martins-727901243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/IgorMadu" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="Inicio__portfolio__dev">
              <div className="Inicio__portfolio__dev__perfil">
                <img src={lucas} alt="Lucas Silva" />
              </div>
              <div className="Inicio__portfolio__dev__infos">
                <span>Lucas Silva</span>
                <span>Desenvolvedor Front-End</span>
                <div className="Inicio__portfolio__dev__icones">
                  <a
                    href="https://www.linkedin.com/in/lucas-silva-a880b61a4/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/lucashsilva98" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="Inicio__portfolio__dev">
              <div className="Inicio__portfolio__dev__perfil">
                <img src={victor} alt="Victor Fernandes" />
              </div>
              <div className="Inicio__portfolio__dev__infos">
                <span>Victor Fernandes</span>
                <span>Desenvolvedor Full-Stack</span>
                <div className="Inicio__portfolio__dev__icones">
                  <a
                    href="https://linkedin.com/in/victorhfernandes"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/victorhfernandes" target="_blank">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="complemento-inicio">
            <img
              className="qr-code"
              src="assets/img/GymMe_qr-1024.jpeg"
              alt="QrCode"
            />
          </div> */}
      </div>
    </>
  );
}

export default Inicio;
