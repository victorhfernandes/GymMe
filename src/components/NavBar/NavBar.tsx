import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Hamburguer from "../Hamburger/Hamburger";

function NavBar() {
  const [showNavLinks, setShowNavLinks] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleHamburger() {
    setShowNavLinks(!showNavLinks);
  }

  function updateWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 900) {
      setShowNavLinks(true);
    } else {
      setShowNavLinks(false);
    }
  }, [windowWidth]);

  return (
    <>
      <div className="navbar">
        <div className="nav-title">GymMe</div>
        <div className="nav-left">
          <div onClick={handleHamburger}>
            <Hamburguer />
          </div>
          {showNavLinks && (
            <div className="nav-links">
              <NavLink className="navlink" to="/">
                Inicio
              </NavLink>
              <NavLink className="navlink" to="/instrutores">
                Instrutores
              </NavLink>
              <NavLink className="navlink" to="/desenvolvedores">
                Desenvolvedores
              </NavLink>
              <NavLink className="navlink" to="/cadastro">
                Cadastro
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
