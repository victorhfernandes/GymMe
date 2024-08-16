import "./Home.css";
import gymme from "../../assets/gymme.gif";

const handleClick = () => {
  alert("Funcionando!");
};

const Home = () => {
  return (
    <>
      <div className="containner-flex">
        <div className="left-div">
          <img className="gymme" src={gymme} />
          <h1>GymMe</h1>
          <h2>Seu app para procurar instrutor de academia</h2>
        </div>
        <div className="right-div">
          <div className="login-div">
            <input className="input-login" type="text" placeholder="Email" />
            <input
              className="input-login"
              type="password"
              placeholder="Senha"
            />
            <button className="btn-login" onClick={handleClick}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
