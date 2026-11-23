import { useState } from "react";
import { IconeEstrela } from "./Icones";

/** Input de nota (1 a 5) acessível: grupo de radios estilizados como estrelas */
export default function SeletorEstrelas({ valor, onChange, nome = "nota" }) {
  const [hover, setHover] = useState(0);
  const ativo = hover || valor;

  return (
    <fieldset className="my-2 flex gap-1 border-0 p-0" onMouseLeave={() => setHover(0)}>
      <legend className="sr-only">Nota de 1 a 5</legend>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)} title={`${n} ${n === 1 ? "estrela" : "estrelas"}`}>
          <input
            type="radio"
            name={nome}
            value={n}
            checked={valor === n}
            onChange={() => onChange(n)}
            className="peer sr-only"
            required
          />
          <IconeEstrela
            className={`size-10 transition peer-focus-visible:rounded peer-focus-visible:outline-3 peer-focus-visible:outline-roxo ${
              n <= ativo ? "text-amarelo-escuro" : "text-[#D5CCE6]"
            }`}
          />
          <span className="sr-only">
            {n} {n === 1 ? "estrela" : "estrelas"}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
