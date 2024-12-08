import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "../../../../utils/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./FormAluno.scss";
import Modal from "../../../../components/Modal/Modal";
import { useState } from "react";
import { fetchUrl } from "../../../../utils/FetchUrl";

const schemaPostAluno = z.object({
  nm_aluno: z.string().min(1, { message: "Escreva um nome valido!" }),
  celular_aluno: z.string().regex(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/, {
    message: "Número de celular inválido!",
  }),
  nascimento_aluno: z.string().date("Data inválida!"),
  cpf_aluno: z.string().refine((cpf) => validarCPF(cpf), {
    message: "CPF inválido!",
  }),
  doresPeito: z.string({ message: "Pergunta obrigatoria!" }),
  desequilibrio: z.string({ message: "Pergunta obrigatoria!" }),
  osseoArticular: z.string({ message: "Pergunta obrigatoria!" }),
  medicado: z.string({ message: "Pergunta obrigatoria!" }),
  foto_perfil: z.string().nullable().optional(),
  atestado: z.string().nullable().optional(),
});

type FieldAluno = z.infer<typeof schemaPostAluno>;

type Props = {
  categoria: string;
  id: string;
  closeModal: () => void;
};

function FormAluno({ categoria, id, closeModal }: Props) {
  const {
    register,
    handleSubmit,
    // setError,
    // clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FieldAluno>({
    resolver: zodResolver(schemaPostAluno),
    defaultValues: async () => fetchDefaultValues(),
  });
  const [imageUpload, setImageUpload] = useState<File>();
  const [atestadoUpload, setAtestadoUpload] = useState<File>();

  const URL = import.meta.env.VITE_API_URL;

  async function fetchDefaultValues() {
    const data = await fetchUrl(`/api/aluno/${id}?compl=true`);
    let {
      nm_aluno,
      celular_aluno,
      nascimento_aluno,
      cpf_aluno,
      doresPeito,
      desequilibrio,
      osseoArticular,
      medicado,
      foto_perfil,
      atestado,
    } = data;

    doresPeito = doresPeito.toString();
    desequilibrio = desequilibrio.toString();
    osseoArticular = osseoArticular.toString();
    medicado = medicado.toString();
    nascimento_aluno = nascimento_aluno.split("T")[0];

    const organizedData = {
      nm_aluno,
      celular_aluno,
      nascimento_aluno,
      cpf_aluno,
      doresPeito,
      desequilibrio,
      osseoArticular,
      medicado,
      foto_perfil,
      atestado,
    };

    return organizedData;
  }

  async function uploadFile(imagem: File | undefined) {
    const imageRef = ref(
      storage,
      `images/${categoria.toLowerCase()}${id}${
        new Date().toISOString() + Math.floor(Math.random() * 10000000000)
      }`
    );
    if (imagem) {
      const snapshot = await uploadBytes(imageRef, imagem);
      const url = await getDownloadURL(snapshot.ref);
      const urlSimple = url.split("/o/");
      return urlSimple[1];
    }
    return "";
  }

  async function onSubmit(data: FieldAluno) {
    const imageUrl = await uploadFile(imageUpload);
    const atestadoUrl = await uploadFile(atestadoUpload);
    if (!(atestadoUrl === "")) {
      data.atestado = atestadoUrl;
    }

    if (!(imageUrl === "")) {
      data.foto_perfil = imageUrl;
    }

    const fetchUrl = `${URL}/api/${categoria.toLowerCase()}/cadastro/${id}`;
    const response = await fetch(fetchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (responseJson) {
      window.location.reload();
    }
  }

  console.log(errors);

  return (
    <>
      <Modal closeModal={closeModal}>
        <form
          className="FormAluno__containner"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSubmitting && <p>Carregando...</p>}
          <label className="FormAluno__label">
            Nome
            <input
              className="FormAluno__input"
              {...register("nm_aluno")}
              type="text"
              placeholder="ex. GymMe"
              autoComplete="on"
            />
          </label>
          {errors.nm_aluno && (
            <p className="FormInstrutor__error">{errors.nm_aluno.message}</p>
          )}
          <label className="FormAluno__label">
            Celular
            <input
              className="FormAluno__input"
              {...register("celular_aluno")}
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              autoComplete="on"
            />
          </label>
          {errors.celular_aluno && (
            <p className="FormInstrutor__error">
              {errors.celular_aluno.message}
            </p>
          )}
          <label className="FormAluno__label">
            Data de Nascimento
            <input
              className="FormAluno__input"
              {...register("nascimento_aluno")}
              type="date"
              placeholder="Data de Nascimento"
              autoComplete="on"
            />
          </label>
          {errors.nascimento_aluno && (
            <p className="FormInstrutor__error">
              {errors.nascimento_aluno.message}
            </p>
          )}
          <label className="FormAluno__label">
            CPF
            <input
              className="FormAluno__input"
              {...register("cpf_aluno")}
              type="text"
              placeholder="XXX.XXX.XXX-XX"
              autoComplete="on"
            />
          </label>
          {errors.cpf_aluno && (
            <p className="FormInstrutor__error">{errors.cpf_aluno.message}</p>
          )}
          <label className="FormAluno__label">
            Sente dores no peito enquanto pratica atividade física?
            <div className="FormAluno__divlabel">
              <label className="FormAluno__labelrow">
                <input type="radio" value="true" {...register("doresPeito")} />
                Sim
              </label>
              <label className="FormAluno__labelrow">
                <input type="radio" value="false" {...register("doresPeito")} />
                Não
              </label>
            </div>
          </label>
          {errors.doresPeito && (
            <p className="FormInstrutor__error">{errors.doresPeito.message}</p>
          )}
          <label className="FormAluno__label">
            Tem desequilíbrio devido à tontura e/ou perdas de consciência?
            <div className="FormAluno__divlabel">
              <label className="FormAluno__labelrow">
                <input
                  type="radio"
                  value="true"
                  {...register("desequilibrio")}
                />
                Sim
              </label>

              <label className="FormAluno__labelrow">
                <input
                  type="radio"
                  value="false"
                  {...register("desequilibrio")}
                />
                Não
              </label>
            </div>
          </label>
          {errors.desequilibrio && (
            <p className="FormInstrutor__error">
              {errors.desequilibrio.message}
            </p>
          )}
          <label className="FormAluno__label">
            Possui algum problema ósseo ou articular?{" "}
            <div className="FormAluno__divlabel">
              <label className="FormAluno__labelrow">
                <input
                  type="radio"
                  value="true"
                  {...register("osseoArticular")}
                />
                Sim
              </label>
              <label className="FormAluno__labelrow">
                <input
                  type="radio"
                  value="false"
                  {...register("osseoArticular")}
                />
                Não
              </label>
            </div>
          </label>
          {errors.osseoArticular && (
            <p className="FormInstrutor__error">
              {errors.osseoArticular.message}
            </p>
          )}
          <label className="FormAluno__label">
            Toma algum medicamento para pressão arterial ou possui alguma
            patologia cardíaca?{" "}
            <div className="FormAluno__divlabel">
              <label className="FormAluno__labelrow">
                <input type="radio" value="true" {...register("medicado")} />
                Sim
              </label>
              <label className="FormAluno__labelrow">
                <input type="radio" value="false" {...register("medicado")} />
                Não
              </label>
            </div>
          </label>
          {errors.medicado && (
            <p className="FormInstrutor__error">{errors.medicado.message}</p>
          )}
          <label className="FormAluno__label">
            Foto de Perfil
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files) {
                  setImageUpload(event.target.files[0]);
                }
              }}
            />
          </label>
          <label className="FormAluno__label">
            Atestado
            <input
              type="file"
              onChange={(event) => {
                if (event.target.files) {
                  setAtestadoUpload(event.target.files[0]);
                }
              }}
            />
          </label>
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
