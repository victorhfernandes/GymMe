import logo from "../../../../assets/gymme-braço.png";
import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import "./DashboardAluno.scss";
import { fetchUrl } from "../../../../utils/FetchUrl";

type Especializacao = {
  value: number;
  label: string;
};

type instrutoresData = {
  nome: string;
  especializacoes: string;
  foto: string;
  especializacao: string[];
};

function DashboardAluno() {
  const [especializacoes, setEspecializacoes] = useState([]);
  const [especializacao, setEspecializacao] = useState<MultiValue<never>>([]);
  const [instrutoresData, setInstrutoresData] = useState<instrutoresData[]>([]);

  async function fetchEspecializacoes() {
    const data = await fetchUrl("/api/instrutor/especializacao");
    setEspecializacoes(data);
  }

  function turnEspecializacaoInString() {
    let esp = "";
    especializacao.map((item: Especializacao) => (esp += `esp=${item.value}&`));
    return esp;
  }

  async function fetchInstrutores() {
    const esp = turnEspecializacaoInString();
    const data = await fetchUrl(`/api/instrutor?${esp}`);
    const reorganizedData = reorganizeInstrutores(data);
    setInstrutoresData(reorganizedData);
    console.log(reorganizedData);
  }

  function reorganizeInstrutores(data: instrutoresData[]) {
    data.map((item) => (item.especializacao = item.especializacoes.split(";")));
    return data;
  }

  useEffect(() => {
    fetchInstrutores();
  }, [especializacao]);

  useEffect(() => {
    fetchEspecializacoes();
  }, []);

  return (
    <div className="DashboardAluno__containner">
      <div className="DashboardAluno__navbar">
        <div className="DashboardAluno__navbar__logoNome">
          <img className="DashboardAluno__navbar__logoNome__logo" src={logo} />
          <span className="DashboardAluno__navbar__logoNome__title">GymMe</span>
        </div>
        <div className="DashboardAluno__navbar__pesquisa">
          <Select
            className="DashboardAluno__navbar__pesquisa__select"
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
            onChange={(selectedOptions) => setEspecializacao(selectedOptions)}
            name="especializacoes"
          />
        </div>
      </div>
      <div className="DashboardAluno__usuario">a</div>
      <div className="DashboardAluno__conteudo">
        <div className="Slider__containner">
          {instrutoresData.length === 0 ? (
            <div>nada</div>
          ) : (
            instrutoresData.map((item, index) => (
              <div className="Slider__cards" key={index}>
                {item.foto ? (
                  <img
                    className="Slider__cards__picture"
                    src={`https://firebasestorage.googleapis.com/v0/b/gymme-9c815.appspot.com/o/${item.foto}`}
                    alt=""
                  />
                ) : (
                  <img className="Slider__cards__picture" src={logo} alt="" />
                )}
                <h2>{item.nome}</h2>
                <h3>Especializações</h3>
                <div className="Slider__cards__especializacoes">
                  {item.especializacao.map((item, index) => (
                    <p key={index} className="Slider__cards__especializacao">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="DashboardAluno__footer"></div>
    </div>
  );
}

export default DashboardAluno;
