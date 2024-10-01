import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/public/Inicio/Inicio";
import CadastroLogin from "./pages/public/CadastroLogin/CadastroLogin";
import "./Index.css";
import Dashboard from "./pages/app/Dashboard/Dashboard";
import PublicLayout from "./components/PublicLayout";

function Index() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/cadastro" element={<CadastroLogin tipo="Cadastro" />} />
          <Route path="/login" element={<CadastroLogin tipo="Login" />} />
        </Route>
        <Route path="/app/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Index;
