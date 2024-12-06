import { Outlet } from "react-router-dom";
import logo from "../assets/gymme-braço.png";
import Footer from "./Footer/Footer";

function AppLayout() {
  return (
    <>
      <div className="Dashboard__navbar">
        <div className="Dashboard__navbar__logoNome">
          <img className="Dashboard__navbar__logoNome__logo" src={logo} />
          <span className="Dashboard__navbar__logoNome__title">GymMe</span>
        </div>
      </div>
      <Outlet />
      <div className="Dashboard__footer">
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
