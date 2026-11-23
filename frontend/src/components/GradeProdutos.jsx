import CardProduto from "./CardProduto";

export default function GradeProdutos({ produtos, escuro = false }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-12 gap-y-10">
      {produtos.map((p) => (
        <CardProduto key={p.id} produto={p} escuro={escuro} />
      ))}
    </div>
  );
}
