import Separator from "../Separator/Separator";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <>
      <Separator />

      <footer>
        <Link className="link" to="/">
          Inicio
        </Link>
        |
        <Link className="link" to="/instrutores">
          Instrutores
        </Link>
        |
        <Link className="link" to="/desenvolvedores">
          Desenvolvedores
        </Link>
        |
        <Link className="link" to="/cadastro">
          Cadastro
        </Link>
        |
        <Link className="link" to="/dashboard">
          Login
        </Link>
      </footer>
    </>
  );
}
export default Footer;
