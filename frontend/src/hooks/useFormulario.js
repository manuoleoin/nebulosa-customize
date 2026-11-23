import { useState } from "react";
import { ApiError } from "../services/api";

/**
 * Estado de formulário + erros vindos da API (zod do backend).
 *   const { valores, alterar, erros, erroGeral, enviando, enviar } = useFormulario({ email: "" });
 */
export function useFormulario(inicial) {
  const [valores, setValores] = useState(inicial);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const [enviando, setEnviando] = useState(false);

  /** onChange genérico: usa o atributo name do input. `transformar` aplica máscara */
  const alterar = (transformar) => (e) => {
    const { name, value, type, checked } = e.target;
    const valor = type === "checkbox" ? checked : transformar ? transformar(value) : value;
    setValores((v) => ({ ...v, [name]: valor }));
    // limpa o erro do campo (inclusive aninhado, ex.: "endereco.cep")
    setErros((er) => {
      const chaves = Object.keys(er).filter((k) => k === name || k.endsWith(`.${name}`));
      if (!chaves.length) return er;
      const novo = { ...er };
      chaves.forEach((k) => delete novo[k]);
      return novo;
    });
  };

  /** Executa `acao`; se a API devolver erros de validação, distribui por campo */
  async function enviar(acao) {
    setEnviando(true);
    setErros({});
    setErroGeral("");
    try {
      return await acao(valores);
    } catch (erro) {
      if (erro instanceof ApiError && Object.keys(erro.erros).length) {
        setErros(Object.fromEntries(Object.entries(erro.erros).map(([campo, msgs]) => [campo, msgs[0]])));
      }
      setErroGeral(erro.message);
      return undefined;
    } finally {
      setEnviando(false);
    }
  }

  return { valores, setValores, alterar, erros, setErros, erroGeral, setErroGeral, enviando, enviar };
}
