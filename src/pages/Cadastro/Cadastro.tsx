import { FormEvent, useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [cref, setCref] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // prevent page refresh

    const URL = "http://localhost:3000/api/instrutor";

    const cadastro = {
      nm_instrutor: nome,
      email_instrutor: email,
      senha_instrutor: senha,
      cel_instrutor: celular,
      cref_instrutor: cref,
    };

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cadastro),
    });

    const responseJson = await response.json();
    alert(responseJson);
  };

  return (
    <>
      <div className="containner-cadastro">
        <h1>Cadastro</h1>
        <label>
          Você é:
          <div>
            <button>Instrutor</button>
            <button>Aluno</button>
          </div>
        </label>
        <form className="forms-cadastro" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              className="input-cadastro"
              type="text"
              onChange={(event) => setNome(event.target.value)}
              value={nome}
              autoComplete="on"
              name="nome"
            />
          </label>
          <label>
            Email
            <input
              className="input-cadastro"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              autoComplete="on"
              name="email"
            />
          </label>
          <label>
            Senha
            <input
              className="input-cadastro"
              type="password"
              onChange={(event) => setSenha(event.target.value)}
              value={senha}
              autoComplete="on"
              name="senha"
            />
          </label>
          <label>
            Celular
            <input
              className="input-cadastro"
              type="text"
              onChange={(event) => setCelular(event.target.value)}
              value={celular}
              autoComplete="on"
              name="celular"
            />
          </label>
          <label>
            CREF
            <input
              className="input-cadastro"
              type="text"
              onChange={(event) => setCref(event.target.value)}
              value={cref}
              autoComplete="on"
              name="cref"
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default Cadastro;
