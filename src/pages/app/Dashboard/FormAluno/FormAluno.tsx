import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import "./FormAluno.scss";
import Modal from "../../../../components/Modal/Modal";

const celRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

const schemaPost = z.object({
  nome: z.string().min(1, { message: "Escreva um nome valido!" }),
  celular: z
    .string()
    .regex(celRegex, { message: "Número de celular inválido!" }),
  dataNascimento: z.date(),
});

type FormFields = z.infer<typeof schemaPost>;

function FormAluno() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaPost),
  });

  async function onSubmit(data: FormFields) {}
  return (
    <Modal>
      <form className="Form__containner" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="FormAluno__input"
          {...register("nome")}
          type="text"
          placeholder="Nome"
          autoComplete="on"
        />
        <input
          className="FormAluno__input"
          {...register("celular")}
          type="text"
          placeholder="Celular"
          autoComplete="on"
        />
        <input
          className="FormAluno__input"
          {...register("dataNascimento")}
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
