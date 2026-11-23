# Protótipo navegável — Nebulosa Costumize

HTML + CSS + JS puro, sem build. Os dados são mockados em `js/data.js`, com os campos das tabelas de `db/nebulosabd.sql`.

## Como abrir

```powershell
python -m http.server 5500 --directory prototipo
```

Depois abra http://localhost:5500.

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Home: hero, destaques (`produto.emDestaque`), sustentabilidade e FAQ |
| `produtos.html` | Vitrine: busca, filtro por `categoria`, ordenação e faixa "Em destaque" |
| `produto.html?id=1` | Detalhes do produto, avaliações e formulário de avaliação (só aparece logado) |
| `login.html` | Login com e-mail e senha (`?volta=` leva de volta à página de origem) |
| `cadastro.html` | Cadastro: nome completo, e-mail, telefone, senha e confirmação |
| `perfil.html` | Dados pessoais (ver, editar e excluir a conta) e pedidos com itens e total |
| `pedido.html` | Checkout: endereço, forma de pagamento, resumo e confirmação |
| `sobre.html` | Sobre nós |
| drawer (todas) | Carrinho lateral: quantidade, subtotal, frete e botão "Finalizar pedido" |

## Simulações (localStorage)

- `nebulosa:usuario`: sessão. Qualquer e-mail e senha entram como cliente. Quando a pessoa está logada, o header mostra **Sair**.
- `nebulosa:carrinho`: itens do carrinho.
- `nebulosa:pedidos`: pedidos criados no checkout, sempre com `status = "pendente"`. O status muda depois, pelo Prisma Studio.
- `nebulosa:avaliacoes`: avaliações enviadas, uma por usuário e produto, como na PK da tabela.

## Regras do banco refletidas no protótipo

- `usuario.telefone` é obrigatório e `usuario.email` é `UNIQUE`. O cadastro recusa e-mail repetido.
- `usuario_avalia_produto` guarda só a `nota`, sem comentário.
- `pedido.frete` é opcional (`NULL` = frete grátis). `pedido.total` é a soma de `item_pedido.preco * quantidade` mais o frete, gravada no momento do checkout.
- O produto tem uma só `cor` e um só `tamanho`, então a página não oferece seletor de variações.
- `pedido.endereco` é um `VARCHAR(255)` único, então o checkout junta todos os campos do endereço em uma linha.
