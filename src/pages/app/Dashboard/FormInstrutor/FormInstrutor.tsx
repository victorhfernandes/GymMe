import Select from "react-select";
import { storage } from "../../../../utils/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import "./FormInstrutor.scss";
import Modal from "../../../../components/Modal/Modal";
import { useEffect, useState } from "react";
import "./FormInstrutor.scss";
import { fetchUrl } from "../../../../utils/FetchUrl";

const schemaPostInstrutor = z.object({
  nm_instrutor: z.string().min(1, { message: "Escreva um nome valido!" }),
  celular_instrutor: z.string().regex(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/, {
    message: "Número de celular inválido!",
  }),
  nascimento_instrutor: z.string().date(),
  cpf_instrutor: z.string().refine((cpf) => validarCPF(cpf), {
    message: "CPF inválido",
  }),
  cref_instrutor: z
    .string()
    // .regex(/^\d{6}-G\/[A-Z]{2}$/, { message: "Número de CREF invalido" })
    .optional(),
  especializacoes: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    })
  ),
  certificacoes: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    })
  ),
  experiencias: z.array(
    z.object({
      value: z.number(),
      label: z.string(),
    })
  ),
  cidades: z.array(
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
  closeModal: () => void;
};

function FormInstrutor({ categoria, id, closeModal }: Props) {
  const [especializacoes, setEspecializacoes] = useState([]);
  const [certificacoes, setCertificacoes] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [cidades, setCidades] = useState([]);
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
    defaultValues: async () => fetchUrl(`/api/instrutor/${id}?compl=true`),
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
    const fetchUrl = `${URL}/api/instrutor/cadastro/${id}`;
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

  async function fetchEspecializacoes() {
    const response = await fetch(`${URL}/api/instrutor/especializacao`);
    const data = await response.json();
    setEspecializacoes(data);
  }

  async function fetchCertificacoes() {
    const response = await fetch(`${URL}/api/instrutor/certificacao`);
    const data = await response.json();
    setCertificacoes(data);
  }

  async function fetchExperiencias() {
    const response = await fetch(`${URL}/api/instrutor/experiencia`);
    const data = await response.json();
    setExperiencias(data);
  }

  async function fetchCidades() {
    const response = await fetch(`${URL}/api/instrutor/cidade`);
    const data = await response.json();
    setCidades(data);
  }

  useEffect(() => {
    fetchEspecializacoes();
    fetchCertificacoes();
    fetchExperiencias();
    fetchCidades();
  }, []);

  return (
    <>
      <Modal closeModal={closeModal}>
        <form
          className="FormInstrutor__containner"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSubmitting && <p>Carregando...</p>}
          <label className="FormInstrutor__label">
            Nome
            <input
              className="FormInstrutor__input"
              {...register("nm_instrutor")}
              type="text"
              placeholder="ex. GymMe"
              autoComplete="on"
            />
          </label>
          {errors.nm_instrutor && (
            <p className="FormInstrutor__error">
              {errors.nm_instrutor.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Celular
            <input
              className="FormInstrutor__input"
              {...register("celular_instrutor")}
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              autoComplete="on"
            />
          </label>
          {errors.celular_instrutor && (
            <p className="FormInstrutor__error">
              {errors.celular_instrutor.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Data de Nascimento
            <input
              className="FormInstrutor__input"
              {...register("nascimento_instrutor")}
              type="date"
              placeholder="Data de Nascimento"
              autoComplete="on"
            />
          </label>
          {errors.nascimento_instrutor && (
            <p className="FormInstrutor__error">
              {errors.nascimento_instrutor.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            CPF
            <input
              className="FormInstrutor__input"
              {...register("cpf_instrutor")}
              type="text"
              placeholder="XXX.XXX.XXX-XX"
              autoComplete="on"
            />
          </label>
          {errors.cpf_instrutor && (
            <p className="FormInstrutor__error">
              {errors.cpf_instrutor.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            CREF
            <input
              className="FormInstrutor__input"
              {...register("cref_instrutor")}
              type="text"
              placeholder="XXXXXX-X/XX"
              autoComplete="on"
            />
          </label>
          {errors.cref_instrutor && (
            <p className="FormInstrutor__error">
              {errors.cref_instrutor.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Especializações
            <Controller
              control={control}
              name="especializacoes"
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className="FormInstrutor__select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "#f0f0f0",
                      fontSize: "1.3rem",
                      padding: "0.2em 0.15em",
                      border: "0.06rem solid #000000",
                      borderRadius: "0.3rem",
                    }),
                  }}
                  placeholder="Escolha..."
                  options={especializacoes}
                  isMulti={true}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </label>
          {errors.especializacoes && (
            <p className="FormInstrutor__error">
              {errors.especializacoes.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Certificações
            <Controller
              control={control}
              name="certificacoes"
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className="FormInstrutor__select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "#f0f0f0",
                      fontSize: "1.3rem",
                      padding: "0.2em 0.15em",
                      border: "0.06rem solid #000000",
                      borderRadius: "0.3rem",
                    }),
                  }}
                  placeholder="Escolha..."
                  options={certificacoes}
                  isMulti={true}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </label>
          {errors.especializacoes && (
            <p className="FormInstrutor__error">
              {errors.especializacoes.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Experiencias
            <Controller
              control={control}
              name="experiencias"
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className="FormInstrutor__select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "#f0f0f0",
                      fontSize: "1.3rem",
                      padding: "0.2em 0.15em",
                      border: "0.06rem solid #000000",
                      borderRadius: "0.3rem",
                    }),
                  }}
                  placeholder="Escolha..."
                  options={experiencias}
                  isMulti={true}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </label>
          {errors.especializacoes && (
            <p className="FormInstrutor__error">
              {errors.especializacoes.message}
            </p>
          )}
          <label className="FormInstrutor__label">
            Cidades
            <Controller
              control={control}
              name="cidades"
              render={({ field: { onChange, value, name } }) => (
                <Select
                  className="FormInstrutor__select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "#f0f0f0",
                      fontSize: "1.3rem",
                      padding: "0.2em 0.15em",
                      border: "0.06rem solid #000000",
                      borderRadius: "0.3rem",
                    }),
                  }}
                  placeholder="Escolha..."
                  options={cidades}
                  isMulti={true}
                  onChange={onChange}
                  value={value}
                  name={name}
                />
              )}
            />
          </label>
          {errors.especializacoes && (
            <p className="FormInstrutor__error">
              {errors.especializacoes.message}
            </p>
          )}
          <label className="FormInstrutor__label">
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
          <button
            className="FormInstrutor__button"
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
