// Cliente HTTP único. O Vite faz proxy de /api para o backend (ver vite.config.js),
// então o cookie httpOnly do login é enviado automaticamente.

export class ApiError extends Error {
  constructor(status, mensagem, erros) {
    super(mensagem);
    this.status = status;
    this.erros = erros || {}; // { campo: ["mensagem"] } vindos do zod no backend
  }
}

async function requisicao(metodo, caminho, corpo) {
  const ehFormData = corpo instanceof FormData;
  let resposta;
  try {
    resposta = await fetch(`/api${caminho}`, {
      method: metodo,
      credentials: "include",
      headers: corpo && !ehFormData ? { "Content-Type": "application/json" } : undefined,
      body: corpo ? (ehFormData ? corpo : JSON.stringify(corpo)) : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique se a API está rodando.");
  }

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new ApiError(resposta.status, dados?.mensagem || "Algo deu errado. Tente novamente.", dados?.erros);
  }
  return dados;
}

export const api = {
  get: (caminho) => requisicao("GET", caminho),
  post: (caminho, corpo) => requisicao("POST", caminho, corpo),
  put: (caminho, corpo) => requisicao("PUT", caminho, corpo),
  delete: (caminho, corpo) => requisicao("DELETE", caminho, corpo),
};
