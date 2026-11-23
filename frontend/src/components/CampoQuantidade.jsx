/** Campo − [n] + */
export default function CampoQuantidade({ valor, onChange, min = 1, max = 99, pequeno = false, rotulo = "Quantidade" }) {
  const limitar = (v) => Math.max(min, Math.min(max, Number.isNaN(v) ? min : v));
  const botao = `grid place-items-center font-bold text-roxo hover:bg-lilas-2 cursor-pointer ${pequeno ? "size-[30px]" : "h-10 w-[38px] text-xl"}`;

  return (
    <div role="group" aria-label={rotulo} className="inline-flex items-center overflow-hidden rounded-full border-2 border-roxo bg-white">
      <button type="button" className={botao} onClick={() => onChange(limitar(valor - 1))} aria-label="Diminuir">
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={valor}
        onChange={(e) => onChange(limitar(parseInt(e.target.value, 10)))}
        aria-label={rotulo}
        className={`[appearance:textfield] bg-transparent text-center font-bold text-roxo-escuro outline-none [&::-webkit-inner-spin-button]:appearance-none ${pequeno ? "w-8 text-[.95rem]" : "w-11"}`}
      />
      <button type="button" className={botao} onClick={() => onChange(limitar(valor + 1))} aria-label="Aumentar">
        +
      </button>
    </div>
  );
}
