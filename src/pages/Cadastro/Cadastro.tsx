import "./Cadastro.css";
import { useForm } from "react-hook-form";

function Cadastro() {
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
        <form className="forms-cadastro" onSubmit={handleSubmit(onSubmit)}>
          <div className="radio-flex">
            <label className="label-cadastro">
              <input
                {...register("Categoria")}
                type="radio"
                value="instrutor"
              />
              Instrutor
            </label>
            <label className="label-cadastro">
              <input {...register("Categoria")} type="radio" value="aluno" />
              Aluno
            </label>
          </div>
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
          <input {...register("senha")} type="password" placeholder="Senha" />
          <input
            {...register("celular")}
            type="text"
            placeholder="Celular"
            autoComplete="on"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
