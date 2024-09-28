import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import Cadastro from "./pages/Cadastro/Cadastro";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
