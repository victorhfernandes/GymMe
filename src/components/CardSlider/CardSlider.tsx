import { useEffect, useState } from "react";
import gymme from "../../assets/gymme-braço.png";
import "./CardSlider.scss";

type instrutoresData = {
  nome: string;
  especializacoes: string;
  foto: string;
  especializacao: string[];
};

function CardSlider() {
  const [instrutoresData, setInstrutoresData] = useState<instrutoresData[]>([]);

  async function fetchInstrutores() {
    const sessionData = sessionStorage.getItem("data")
      ? sessionStorage.getItem("data")
      : "";
    if (sessionData) {
      setInstrutoresData(JSON.parse(sessionData));
    } else {
      const URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${URL}/api/instrutor`);
      const data = await response.json();
      const reorganizedData = reorganizeInstrutores(data);
      setInstrutoresData(reorganizedData);
      storeData(reorganizedData);
    }
  }

  function reorganizeInstrutores(data: instrutoresData[]) {
    data.map((item) => (item.especializacao = item.especializacoes.split(";")));
    return data;
  }

  function storeData(data: instrutoresData[]) {
    data;
    //sessionStorage.setItem("data", JSON.stringify(data));
  }

  useEffect(() => {
    fetchInstrutores();
  }, []);

  return (
    <div className="Slider__main">
      <h1 className="Slider__title">Conheça nossos instrutores</h1>
      <div className="Slider__containner">
        {instrutoresData.map((item, index) => (
          <div className="Slider__cards" key={index}>
            {item.foto ? (
              <img
                className="Slider__cards__picture"
                src={`https://firebasestorage.googleapis.com/v0/b/gymme-9c815.appspot.com/o/${item.foto}`}
                alt=""
              />
            ) : (
              <img className="Slider__cards__picture" src={gymme} alt="" />
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
        ))}
      </div>
    </div>
  );
}

export default CardSlider;
