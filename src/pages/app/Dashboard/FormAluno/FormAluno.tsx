import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./FormAluno.scss";
import Modal from "../../../../components/Modal/Modal";

const schemaPostAluno = z.object({
  nm_aluno: z.string().min(1, { message: "Escreva um nome valido!" }),
  celular_aluno: z.string().regex(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/, {
    message: "Número de celular inválido!",
  }),
  nascimento_aluno: z.string().date(),
  cpf_aluno: z.string().refine((cpf) => validarCPF(cpf), {
    message: "CPF inválido",
  }),
});

type FieldAluno = z.infer<typeof schemaPostAluno>;

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
    formState: { errors, isSubmitting },
  } = useForm<FieldAluno>({
    resolver: zodResolver(schemaPostAluno),
  });

  const URL = import.meta.env.VITE_API_URL;

  async function onSubmit(data: FieldAluno) {
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
  console.log(errors);

  return (
    <>
      <Modal>
        <form
          className="FormAluno__containner"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <input
            className="FormAluno__input"
            {...register("cpf_aluno")}
            type="text"
            placeholder="CPF"
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
    </>
  );
}

function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Checa tamanho e sequência repetida

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));
}

export default FormAluno;
