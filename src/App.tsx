import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Cadastro from "./pages/Cadastro/Cadastro";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
