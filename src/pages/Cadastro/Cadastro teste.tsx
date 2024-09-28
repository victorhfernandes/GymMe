import { useState } from "react";
import "./Cadastro.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import gymmeAluno from "../../assets/gymme-aluno.png";
import gymmeInstrutor from "../../assets/gymme-instrutor.png";

const schemaPost = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
});

type FormFields = z.infer<typeof schemaPost>;

function Cadastrot() {
  const { register, handleSubmit } = useForm<FormFields>();
  const [categoria, setCategoria] = useState("instrutor");
  const URL = import.meta.env.VITE_API_URL;

  async function onSubmit(data: FormFields) {
    let postData: object;

    switch (categoria) {
      case "instrutor":
        postData = {
          nm_instrutor: data.nome,
          email_instrutor: data.email,
          senha_instrutor: data.senha,
        };
        break;
      case "aluno":
        postData = {
          nm_aluno: data.nome,
          email_aluno: data.email,
          senha_aluno: data.senha,
        };
        break;
      default:
        postData = data;
    }

    const fetchUrl = `${URL}/api/${categoria}/login`;

    const response = await fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postData),
    });

    const responseJson = await response.json();

    //solução temporaria
    console.log(responseJson);
    alert("Cadastro feito com sucesso!");
    //
  }

  return (
    <>
      <div className="containner">
        <div className="left">
          <div className="info-div">
            <h1 className="title margin">Cadastro</h1>
            <p className="text margin">Faça seu cadastro na plataforma!</p>
            <h2 className="subtitle margin">Faça seu Cadastro</h2>
            <button onClick={() => setCategoria("aluno")}>Aluno</button>
            <button onClick={() => setCategoria("instrutor")}>Instrutor</button>
            <form className="login-div" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("nome")}
                type="text"
                placeholder="Nome"
                autoComplete="on"
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                autoComplete="on"
              />
              <input
                {...register("senha")}
                type="password"
                placeholder="Senha"
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <div className="right">
          {categoria === "instrutor" ? (
            <img
              className="gymme-categoria"
              src={gymmeInstrutor}
              alt="Gymme Instrutor"
            />
          ) : (
            <img
              className="gymme-categoria"
              src={gymmeAluno}
              alt="GymMe Aluno"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Cadastrot;
