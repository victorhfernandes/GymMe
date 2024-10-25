import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useEffect } from "react";
import "./FormAluno.scss";
import Modal from "../../../../components/Modal/Modal";

const celRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

const schemaPost = z.object({
  nm_aluno: z.string().min(1, { message: "Escreva um nome valido!" }),
  celular_aluno: z
    .string()
    .regex(celRegex, { message: "Número de celular inválido!" }),
  nascimento_aluno: z.string().date(),
});

type FormFields = z.infer<typeof schemaPost>;

type Props = {
  categoria: string;
  id: string;
};

function FormAluno({ categoria, id }: Props) {
  const {
    register,
    handleSubmit,
    // setError,
    // clearErrors,
    formState: {
      // errors,
      isSubmitting,
    },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaPost),
  });
  const URL = import.meta.env.VITE_API_URL;

  async function onSubmit(data: FormFields) {
    const fetchUrl = `${URL}/api/${categoria.toLowerCase()}/cadastro/${id}`;
    const response = await fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }

  return (
    <Modal>
      <form className="FormAluno__containner" onSubmit={handleSubmit(onSubmit)}>
        {isSubmitting && <p>Carregando...</p>}
        <input
          className="FormAluno__input"
          {...register("nm_aluno")}
          type="text"
          placeholder="Nome"
          autoComplete="on"
        />
        <input
          className="FormAluno__input"
          {...register("celular_aluno")}
          type="text"
          placeholder="Celular"
          autoComplete="on"
        />
        <input
          className="FormAluno__input"
          {...register("nascimento_aluno")}
          type="date"
          placeholder="Data de Nascimento"
          autoComplete="on"
        />
        <button
          className="FormAluno__button"
          disabled={isSubmitting}
          type="submit"
        >
          Enviar
        </button>
      </form>
    </Modal>
  );
}

export default FormAluno;
