import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import "./Form.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal/Modal";

const schemaPost = z.object({
  email: z.string().email({ message: "Email invalido!" }),
  senha: z
    .string()
    .min(8, { message: "Senha deve conter no minimo 8 caracteres" })
    .max(30, { message: "Senha deve conter no maximo 30 caracteres" }),
  termos: z
    .boolean()
    .refine(
      (value) => value === true,
      "Você deve concordar com os termos de uso!"
    ),
});

type FormFields = z.infer<typeof schemaPost>;

type Props = {
  categoria: string;
  tipo: string;
};

function Form({ categoria, tipo }: Props) {
  const [isModalAlert, setisModalAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaPost),
  });
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  if (tipo === "cadastro") {
    setValue("termos", false);
  } else {
    setValue("termos", true);
  }

  async function onSubmit(data: FormFields) {
    const postData = reorganizeData(data);

    try {
      const fetchUrl = `${URL}/api/${categoria}/${tipo}`;
      const response = await fetch(fetchUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(postData),
      });
      const responseJson = await response.json();

      if (tipo === "cadastro") {
        if (response.ok) {
          setisModalAlert(true);
          setModalMsg("Cadastro feito com sucesso!");
          navigate("/login");
        } else {
          throw new Error(responseJson.message);
        }
      } else {
        if (response.ok) {
          sessionStorage.setItem("authUser", JSON.stringify(responseJson));
          navigate("/app/dashboard");
        } else {
          throw new Error("Email ou senha incorretos!");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (tipo === "cadastro") {
          if (error.message.includes("Email")) {
            setError("email", {
              message: error.message,
            });
          } else {
            setError("root", {
              message: "Algo deu errado, tente novamente mais tarde.",
            });
          }
        } else {
          setError("root", {
            message: error.message,
          });
        }
      }
    }
  }

  function reorganizeData(data: FormFields) {
    let postData: object;
    switch (categoria) {
      case "instrutor":
        postData = {
          email_instrutor: data.email,
          senha_instrutor: data.senha,
        };
        break;
      case "aluno":
        postData = {
          email_aluno: data.email,
          senha_aluno: data.senha,
        };
        break;
      default:
        postData = data;
    }
    return postData;
  }

  function highlightInputError(error: boolean) {
    if (error) {
      return "Form__input__error";
    } else {
      return "Form__input";
    }
  }

  function closeModal() {
    setisModalAlert(false);
  }

  useEffect(() => {
    clearErrors();
  }, [categoria, tipo]);

  return (
    <>
      {isModalAlert && (
        <Modal>
          <div className="Modal__alert">
            <span>{modalMsg}</span>
            <button onClick={closeModal} className="Modal__alert__botao">
              OK
            </button>
          </div>
        </Modal>
      )}
      <form className="Form__containner" onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <p className="Form__error">{errors.root.message}</p>}
        {isSubmitting && <p>Carregando...</p>}
        <label className="Form__label">
          Email
          <input
            className={highlightInputError(!!errors.email)}
            {...register("email")}
            type="text"
            placeholder="Email"
            autoComplete="on"
          />
        </label>
        {errors.email && <p className="Form__error">{errors.email.message}</p>}
        <label className="Form__label">
          Senha
          <input
            className={highlightInputError(!!errors.senha)}
            {...register("senha")}
            type="password"
            placeholder="Senha"
          />
        </label>
        {errors.senha && <p className="Form__error">{errors.senha.message}</p>}
        {tipo === "cadastro" && (
          <>
            <label className="Form__labelrow">
              <input
                type="checkbox"
                placeholder="termos"
                {...register("termos", {})}
              />
              Concordo com os{" "}
              <Link className="link-no-purple" to="/termos-de-uso">
                Termos de Uso
              </Link>
            </label>
            {errors.termos && (
              <p className="Form__error">{errors.termos.message}</p>
            )}
          </>
        )}
        <button className="Form__button" disabled={isSubmitting} type="submit">
          Enviar
        </button>
      </form>
    </>
  );
}

export default Form;
