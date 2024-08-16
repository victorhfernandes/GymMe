import "./Home.css";
import logo from "../../assets/logo.jpg";

const Home = () => {
  return (
    <>
      <div className="containner-flex">
        <div className="left-div">
          <img className="logo" src={logo} />
          <h1>GymMe</h1>
          <h2>Seu app para procurar instrutor de academia</h2>
        </div>
        <div className="right-div">
          <div className="login-div">
            <input className="input-login" type="text" />
            <input className="input-login" type="password" />
            <button className="btn-login">login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
