import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Hamburguer from "../Hamburger/Hamburger";

function NavBar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  async function handleHamburger() {
    setShowNavLinks(!showNavLinks);
  }

  function closeLinks() {
    if (windowWidth <= 1280) {
      setShowNavLinks(false);
    }
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
    if (windowWidth > 1280) {
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

          <div className="nav-links">
            {showNavLinks && (
              <>
                <NavLink className="navlink" to="/" onClick={closeLinks}>
                  Inicio
                </NavLink>
                <NavLink
                  className="navlink"
                  to="/cadastro"
                  onClick={closeLinks}
                >
                  Cadastro
                </NavLink>
                <NavLink className="navlink" to="/login" onClick={closeLinks}>
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
