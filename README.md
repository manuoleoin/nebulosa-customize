# Nebulosa Customize

Loja de produtos personalizados. **Backend:** Express + Prisma 7 (MySQL). **Frontend:** React + Vite + Tailwind.

## Pré-requisitos

- Node **22.22+**
- MySQL rodando em `localhost:3306`

Usuário e senha do MySQL ficam em `backend/.env` (`DATABASE_URL`, padrão `root:aluno`). Se o arquivo não existir, copie o `backend/.env.example`. O banco `nebulosabd` é criado sozinho pelo `db push`.

## Como subir

**Terminal 1 — API** (http://localhost:3000/api)

```bash
cd backend
npm install
npx prisma generate
npx prisma db push --force-reset   # APAGA e recria todas as tabelas
npx prisma db seed                 # produtos, usuários, pedidos e avaliações de exemplo
npm run dev
```

**Terminal 2 — Prisma Studio** (http://localhost:5555, para editar os dados, por exemplo o status dos pedidos)

```bash
cd backend
npx prisma studio
```

**Terminal 3 — Site** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

> Para só atualizar as tabelas **sem apagar os dados**, use `npx prisma db push` sem o `--force-reset` e não rode o seed. O seed limpa todas as tabelas antes de inserir.

## Usuários de teste (seed)

A senha de todos é `nebulosa123`.

| E-mail               | Tipo    | Situação                                                   |
| -------------------- | ------- | ---------------------------------------------------------- |
| `admin@nebulosa.com` | admin   | sem pedidos                                                |
| `marina@exemplo.com` | cliente | um pedido em cada status: pendente, enviado, cancelado e entregue |
| `joao@exemplo.com`   | cliente | pedido entregue + avaliações                               |
| `bia@exemplo.com`    | cliente | pedido entregue + avaliações                               |
| `rafa@exemplo.com`   | cliente | pedido entregue + avaliações                               |

## "ENUMs" do banco (colunas VARCHAR)

O banco guarda esses campos como texto livre. Os valores válidos estão abaixo e no código em `backend/src/utils/regras.js` (o frontend repete os rótulos em `frontend/src/utils/regras.js`). Ao editar pelo Prisma Studio, digite **exatamente** como está aqui (minúsculas e acentos).

### `usuario.tipo`

| Valor     | Significado                                                        |
| --------- | ------------------------------------------------------------------ |
| `cliente` | padrão de todo cadastro feito pelo site                            |
| `admin`   | pode criar, editar e excluir produtos (`POST/PUT/DELETE /api/produtos`) |

### `pedido.status`

Fluxo normal: `pendente` → `pago` → `em produção` → `enviado` → `entregue`

| Valor                  | Significado                                              |
| ---------------------- | -------------------------------------------------------- |
| `pendente`             | aguardando pagamento (todo pedido nasce assim)           |
| `pago`                 | pagamento confirmado                                     |
| `em produção`          | personalização sendo feita no ateliê                     |
| `enviado`              | entregue à transportadora                                |
| `entregue`             | recebido pelo cliente (preencha também `dataEntrega`)    |
| `cancelado`            | cancelado antes do envio (pagamento recusado ou desistência) |
| `devolução solicitada` | cliente pediu para devolver depois de receber            |
| `devolvido`            | produto voltou e o valor foi reembolsado                 |

O site só cria pedidos como `pendente`. Os outros status são alterados pelo Prisma Studio.

### `produto.categoria`

`Roupas e acessórios` · `Papelaria e organização` · `Casa e decoração` · `Acessórios personalizados` · `Informática`

A API de produtos (admin) recusa outras categorias. Para criar uma nova, inclua o nome em `CATEGORIAS_PRODUTO`.

### `pedido.metodoPagamento`

`Pix` · `Boleto` · `Cartão de crédito (1x)` · `Cartão de crédito (2x)` · `Cartão de crédito (3x)`

## Regras de negócio

- **Avaliação:** o usuário só avalia produtos que vieram em um pedido dele com status `entregue`, `devolução solicitada` ou `devolvido`. Fica uma avaliação por usuário e produto; enviar de novo atualiza a nota (de 1 a 5, aceita meia estrela).
- **Frete:** R$ 19,90, grátis a partir de R$ 199. Quando é grátis, `pedido.frete` fica `NULL`.
- **Preços:** o backend sempre recalcula o pedido com o `precoDesconto` do banco. O valor que vem do carrinho é ignorado.
- **Parcelamento:** até 3x sem juros, só no cartão.
