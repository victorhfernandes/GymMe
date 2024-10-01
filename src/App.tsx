import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import FormAcesso from "./pages/FormAcesso/FormAcesso";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cadastro" element={<FormAcesso tipo="Cadastro" />} />
        <Route path="/login" element={<FormAcesso tipo="Login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
