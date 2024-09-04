import "./Home.css";
import logo from "../../assets/logo.jpg";

const Home = () => {
  return (
    <>
      <div className="containner">
        <div className="left">
          <div className="info-div">
            <h1 className="title margin">Encontre agora seu instrutor</h1>
            <p className="text margin">
              Nosso site conecta você a instrutores qualificados que oferecem
              treinos personalizados,adaptados às suas necessidades e objetivos.
            </p>
            <h2 className="subtitle margin">Faça seu Cadastro</h2>
            <div className="login-div">
              <input className="input-login" type="text" placeholder="Email" />
              <input
                className="input-login"
                type="password"
                placeholder="Senha"
              />
              <button className="btn-login">Entrar</button>
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
