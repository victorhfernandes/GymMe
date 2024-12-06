import boneco from "../../../../assets/boneco.png";

type alunoData = {
  id_aluno?: number;
  nm_aluno?: string;
  celular_aluno?: string;
  nascimento_aluno?: string;
  cpf_aluno?: string;
  foto_perfil?: string;
  atestado?: boolean;
  doresPeito?: boolean;
  desequilibrio?: boolean;
  osseoArticular?: boolean;
  medicado?: boolean;
};

type instrutorData = {
  id_instrutor?: number;
  nm_instrutor?: string;
  email_instrutor?: string;
  celular_instrutor?: string;
  cref_instrutor?: string;
  nascimento_instrutor?: Date;
  foto_perfil?: string;
  cpf_instrutor?: string;
};

type Props = {
  data: alunoData | instrutorData;
  nome?: string;
  imagem: string;
  textoBotao: string;
  funcBotao: () => void;
  showModal: () => void;
};

function primeiroNome(nome: string) {
  let primeiroNome = nome.split(" ");
  return primeiroNome[0].toUpperCase();
}

function CardUsuario({
  data,
  nome = "usuario",
  imagem,
  textoBotao,
  funcBotao,
  showModal,
}: Props) {
  const FIREBASE_URL = import.meta.env.VITE_FIREBASE_URL;
  return (
    <div className="CardUsuario__containner">
      <div className="CardUsuario__perfil">
        {data.foto_perfil ? (
          <img
            className="CardUsuario__perfil__foto"
            src={FIREBASE_URL + data.foto_perfil}
          />
        ) : (
          <img className="CardUsuario__perfil__foto" src={imagem} />
        )}
        <span className="CardUsuario__perfil__nome">
          BEM VINDO(A) {primeiroNome(nome)}
        </span>
      </div>
      <div className="CardUsuario__infos">
        <hr className="CardUsuario__separador" />
        <div className="CardUsuario__info">
          <img src={boneco} />
          <span>Usuário desde novembro de 2024</span>
        </div>
        <hr className="CardUsuario__separador" />
        <div className="CardUsuario__botoes">
          <button onClick={funcBotao} className="CardUsuario__botoes__preto">
            {textoBotao}
          </button>
          <button className="CardUsuario__botoes__azul" onClick={showModal}>
            CONFIGURAÇÕES
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardUsuario;
