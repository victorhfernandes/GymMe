import { FormEvent, useState } from "react";
import "./Cadastro.css";

function Cadastro() {
  const [nome, setNome] = useState(sessionStorage.getItem("nome") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [categoria, setCategoria] = useState("instrutor");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [cref, setCref] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); // prevent page refresh

    //solução temporaria
    if (
      nome === "" ||
      email === "" ||
      senha === "" ||
      celular === "" ||
      cref === ""
    ) {
      alert("Prencha todos os campos!");
      throw new Error("Prencha todos os campos!");
    }
    //
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

    //solução temporaria
    console.log(responseJson);
    alert("Cadastro feito com sucesso!");
    //
  }

  return (
    <>
      <div className="containner-cadastro">
        <h1 className="title">Cadastro</h1>
        <div className="radio-flex">
          <label className="label-cadastro">
            <input
              type="radio"
              name="categoria"
              value="instrutor"
              checked={"instrutor" === categoria}
              onChange={(event) => setCategoria(event.target.value)}
            />
            Instrutor
          </label>

          <label className="label-cadastro">
            <input
              type="radio"
              name="categoria"
              value="aluno"
              checked={"aluno" === categoria}
              onChange={(event) => setCategoria(event.target.value)}
            />
            Aluno
          </label>
        </div>
        <form className="forms-cadastro" onSubmit={handleSubmit}>
          <input
            className="radio"
            type="text"
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}
            value={nome}
            autoComplete="on"
            name="nome"
          />

          <input
            className="input-cadastro"
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            autoComplete="on"
            name="email"
          />
          <input
            className="input-cadastro"
            type="password"
            placeholder="Senha"
            onChange={(event) => setSenha(event.target.value)}
            value={senha}
            autoComplete="on"
            name="senha"
          />

          <input
            className="input-cadastro"
            type="text"
            placeholder="Celular"
            onChange={(event) => setCelular(event.target.value)}
            value={celular}
            autoComplete="on"
            name="celular"
          />

          <input
            className="input-cadastro"
            type="text"
            placeholder="CREF"
            onChange={(event) => setCref(event.target.value)}
            value={cref}
            autoComplete="on"
            name="cref"
          />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
