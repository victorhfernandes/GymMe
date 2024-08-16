import Separator from "../Separator/Separator";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Separator />

      <footer>
        <Link className="link" to="/">
          Home
        </Link>{" "}
        |{" "}
        <Link className="link" to="/about">
          About
        </Link>{" "}
      </footer>
    </>
  );
};
export default Footer;
