import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./Form.scss";

const schemaPost = z.object({
  nome: z.string().min(1, { message: "Campo nome é obrigatorio!" }),
  email: z.string().email({ message: "Email invalido!" }),
  senha: z
    .string()
    .min(8, { message: "Senha deve conter no minimo 8 caracteres" })
    .max(30, { message: "Senha deve conter no maximo 30 caracteres" }),
});

type FormFields = z.infer<typeof schemaPost>;

type Props = {
  categoria: string;
};

function Form({ categoria }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaPost),
  });
  const URL = import.meta.env.VITE_API_URL;

  async function onSubmit(data: FormFields) {
    const postData = reorganizeData(data);

    const fetchUrl = `${URL}/api/${categoria}`;
    const response = await fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postData),
    });
    const responseJson = await response.json();

    if (!response.ok) {
      setError("root", {
        message: responseJson.message,
      });
    }
    if (response.ok) {
      alert("Cadastro feito com sucesso!");
    }
  }

  function reorganizeData(data: FormFields) {
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
    return postData;
  }

  return (
    <form className="Form__containner" onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p>{errors.root.message}</p>}
      <input
        className="Form__input"
        {...register("nome")}
        type="text"
        placeholder="Nome"
        autoComplete="on"
      />
      {errors.nome && <p>{errors.nome.message}</p>}
      <input
        className="Form__input"
        {...register("email")}
        type="email"
        placeholder="Email"
        autoComplete="on"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        className="Form__input"
        {...register("senha")}
        type="password"
        placeholder="Senha"
      />
      {errors.senha && <p>{errors.senha.message}</p>}
      <button className="Form__button" disabled={isSubmitting} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default Form;
