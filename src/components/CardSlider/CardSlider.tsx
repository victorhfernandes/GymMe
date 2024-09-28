import { useEffect, useState } from "react";
import "./CardSlider.scss";

type instrutoresData = {
  nome: string;
  especializacoes: string;
  especializacao: string[];
};

function CardSlider() {
  const [instrutoresData, SetInstrutoresData] = useState<instrutoresData[]>([]);

  async function fetchInstrutores() {
    const sessionData = sessionStorage.getItem("data")
      ? sessionStorage.getItem("data")
      : "";
    if (sessionData) {
      SetInstrutoresData(JSON.parse(sessionData));
    } else {
      console.log("oiii");
      const URL =
        import.meta.env.VITE_API_URL ||
        "https://gymme-api.onrender.com/api/instrutor";
      // const URL = "http://localhost:3000/api/instrutor";
      const response = await fetch(URL);
      const data = await response.json();
      const reorganizedData = reorganizeInstrutores(data);
      SetInstrutoresData(reorganizedData);
      storeData(reorganizedData);
    }
  }

  function reorganizeInstrutores(data: instrutoresData[]) {
    data.map((item) => (item.especializacao = item.especializacoes.split(";")));

    return data;
  }

  function storeData(data: instrutoresData[]) {
    sessionStorage.setItem("data", JSON.stringify(data));
  }

  useEffect(() => {
    fetchInstrutores();
  }, []);

  return (
    <>
      <h1 className="Slider__title">Conheça nossos instrutores</h1>
      <div className="Slider__containner">
        {instrutoresData.map((item, index) => (
          <div className="Slider__cards" key={index}>
            <img
              className="Slider__cards__picture"
              src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
              alt=""
            />
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
        ))}
      </div>
    </>
  );
}

export default CardSlider;
