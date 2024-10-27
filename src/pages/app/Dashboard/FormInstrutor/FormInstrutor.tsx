import Select from "react-select";
import { storage } from "../../../../utils/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import "./FormInstrutor.scss";
import Modal from "../../../../components/Modal/Modal";
import { useEffect, useState } from "react";

const schemaPostInstrutor = z.object({
  nm_instrutor: z.string().min(1, { message: "Escreva um nome valido!" }),
  cel_instrutor: z.string().regex(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/, {
    message: "Número de celular inválido!",
  }),
  nascimento_instrutor: z.string().date(),
  cpf_instrutor: z.string().refine((cpf) => validarCPF(cpf), {
    message: "CPF inválido",
  }),
  cref_instrutor: z
    .string()
    .regex(/^\d{6}-G\/[A-Z]{2}$/, { message: "Número de CREF invalido" }),
  especializacoes: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    })
  ),
  foto_perfil: z.string().optional(),
});

type FieldInstrutor = z.infer<typeof schemaPostInstrutor>;

type Props = {
  categoria: string;
  id: string;
};

function FormInstrutor({ categoria, id }: Props) {
  const [especializacoes, setEspecializacoes] = useState([]);
  const [imageUpload, setImageUpload] = useState<File>();
  const {
    register,
    handleSubmit,
    control,
    // setError,
    // clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FieldInstrutor>({
    resolver: zodResolver(schemaPostInstrutor),
  });

  const URL = import.meta.env.VITE_API_URL;

  async function uploadFile() {
    const imageRef = ref(storage, `images/${categoria.toLowerCase()}${id}`);
    if (imageUpload) {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      const urlSimple = url.split("/o/");
      return urlSimple[1];
    }
    return "";
  }

  async function onSubmit(data: FieldInstrutor) {
    const imageUrl = await uploadFile();
    data.foto_perfil = imageUrl;
    console.log(data);
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

  async function fetchEspecializacoes() {
    if (categoria === "Instrutor") {
      const response = await fetch(`${URL}/api/instrutor/especializacao`);
      const data = await response.json();
      setEspecializacoes(data);
    }
  }

  useEffect(() => {
    fetchEspecializacoes();
  }, []);

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
            {...register("nm_instrutor")}
            type="text"
            placeholder="Nome"
            autoComplete="on"
          />
          {errors.nm_instrutor && (
            <p className="Form__error">{errors.nm_instrutor.message}</p>
          )}
          <input
            className="FormAluno__input"
            {...register("cel_instrutor")}
            type="text"
            placeholder="Celular"
            autoComplete="on"
          />
          {errors.cel_instrutor && (
            <p className="Form__error">{errors.cel_instrutor.message}</p>
          )}
          <input
            className="FormAluno__input"
            {...register("nascimento_instrutor")}
            type="date"
            placeholder="Data de Nascimento"
            autoComplete="on"
          />
          {errors.nascimento_instrutor && (
            <p className="Form__error">{errors.nascimento_instrutor.message}</p>
          )}
          <input
            className="FormAluno__input"
            {...register("cpf_instrutor")}
            type="text"
            placeholder="CPF"
            autoComplete="on"
          />
          {errors.cpf_instrutor && (
            <p className="Form__error">{errors.cpf_instrutor.message}</p>
          )}
          <input
            className="FormAluno__input"
            {...register("cref_instrutor")}
            type="text"
            placeholder="CREF"
            autoComplete="on"
          />
          {errors.cref_instrutor && (
            <p className="Form__error">{errors.cref_instrutor.message}</p>
          )}
          <Controller
            control={control}
            name="especializacoes"
            render={({ field: { onChange, value, name } }) => (
              <Select
                options={especializacoes}
                isMulti={true}
                onChange={onChange}
                value={value}
                name={name}
              />
            )}
          />
          {errors.especializacoes && (
            <p className="Form__error">{errors.especializacoes.message}</p>
          )}
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files) {
                setImageUpload(event.target.files[0]);
              }
            }}
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

export default FormInstrutor;
