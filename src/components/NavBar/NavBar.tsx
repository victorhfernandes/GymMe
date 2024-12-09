import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import Hamburguer from "../Hamburger/Hamburger";

function NavBar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDashboard, setShowDashboard] = useState(false);
  const categoria = getCategoria();
  const URL = import.meta.env.VITE_API_URL;

  function getCategoria() {
    let session = sessionStorage.getItem("categoria");
    if (session) {
      return session;
    } else {
      return "Faça Login";
    }
  }

  async function isLogedIn() {
    const fetchUrl = `${URL}/api/${categoria}/login/status`;
    const response = await fetch(fetchUrl, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      setShowDashboard(true);
    }
  }

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
    isLogedIn();
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
        <div className="nav-title">
          <Link className="link" to="/" onClick={closeLinks}>
            GymMe
          </Link>
        </div>
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
                {showDashboard ? (
                  <NavLink
                    className="navlink"
                    to="/app/dashboard"
                    onClick={closeLinks}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      className="navlink"
                      to="/cadastro"
                      onClick={closeLinks}
                    >
                      Cadastro
                    </NavLink>
                    <NavLink
                      className="navlink"
                      to="/login"
                      onClick={closeLinks}
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
