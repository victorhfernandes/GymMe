import "./Home.css";
import logo from "../../assets/gymme braço.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const storeData = () => {
    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("email", email);
  };

  return (
    <>
      <div className="containner">
        <div className="left">
          <div className="info-div">
            <h1 className="title margin">Encontre agora seu instrutor</h1>
            <p className="text margin">
              Nosso site conecta você a instrutores qualificados que oferecem
              treinos personalizados, adaptados às suas necessidades e
              objetivos.
            </p>
            <h2 className="subtitle margin">Faça seu Cadastro</h2>
            <div className="login-div">
              <input
                type="text"
                placeholder="Nome"
                onChange={(event) => setNome(event.target.value)}
                value={nome}
                autoComplete="on"
                name="nome"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                autoComplete="on"
                name="email"
              />
              <Link to="/cadastro">
                <button onClick={storeData}>Cadastre-se</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Home;
