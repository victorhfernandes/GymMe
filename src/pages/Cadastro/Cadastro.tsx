import { FormEvent, useState } from "react";
import InputText from "../../components/InputText/InputText";
import "./Cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState(sessionStorage.getItem("nome") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [categoria, setCategoria] = useState("instrutor");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [cref, setCref] = useState("");

  const handleSubmit = async (event: FormEvent) => {
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
  };

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
          <InputText
            values={[
              {
                type: "text",
                placeholder: "Nome",
                value: nome,
                setFunc: setNome,
              },
              {
                type: "email",
                placeholder: "Email",
                value: email,
                setFunc: setEmail,
              },
              {
                type: "password",
                placeholder: "Senha",
                value: senha,
                setFunc: setSenha,
              },
              {
                type: "text",
                placeholder: "Celular",
                value: celular,
                setFunc: setCelular,
              },
              {
                type: "text",
                placeholder: "CREF",
                value: cref,
                setFunc: setCref,
              },
            ]}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default Cadastro;
