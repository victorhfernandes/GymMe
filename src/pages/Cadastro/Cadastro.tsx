import { FormEvent, useState } from "react";
import InputText from "../../components/InputText/InputText";
import "./Cadastro.css";
import { useForm, SubmitHandler } from "react-hook-form";

function Cadastro() {
  const [nome, setNome] = useState(sessionStorage.getItem("nome") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [categoria, setCategoria] = useState("instrutor");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [cref, setCref] = useState("");
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  /*async function handleSubmit(event: FormEvent) {
    event.preventDefault(); // prevent page refresh
    const URL = "http://localhost:3000/api/instrutor";

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify("teste"),
    });

    const responseJson = await response.json();

    //solução temporaria
    console.log(responseJson);
    alert("Cadastro feito com sucesso!");
    //
  }*/

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
        <form className="forms-cadastro" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            values={[
              {
                type: "text",
                placeholder: "Nome",
                register: register,
              },
              {
                type: "text",
                placeholder: "Email",
                register: register,
              },
              {
                type: "password",
                placeholder: "Senha",
                register: register,
              },
              {
                type: "text",
                placeholder: "Celular",
                register: register,
              },
              {
                type: "text",
                placeholder: "CREF",
                register: register,
              },
            ]}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
