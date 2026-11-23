import { useCallback, useEffect, useState } from "react";

/**
 * Executa uma chamada assíncrona e controla carregando/erro.
 *   const { dados, carregando, erro, recarregar } = useApi(() => produtoService.buscar(id), [id]);
 */
export function useApi(funcao, deps = []) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });
  const [versao, setVersao] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chamar = useCallback(funcao, deps);

  useEffect(() => {
    let ativo = true; // ignora respostas que chegam depois de trocar de página/filtro
    setEstado((e) => ({ ...e, carregando: true, erro: null }));
    chamar()
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((erro) => ativo && setEstado({ dados: null, carregando: false, erro }));
    return () => {
      ativo = false;
    };
  }, [chamar, versao]);

  const recarregar = useCallback(() => setVersao((v) => v + 1), []);
  const definirDados = useCallback((dados) => setEstado((e) => ({ ...e, dados })), []);

  return { ...estado, recarregar, definirDados };
}
