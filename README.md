# UniSENAI Store — E-commerce (JavaScript)

🔗 **Online:** [unisenai-store.vercel.app](https://unisenai-store.vercel.app/)

Projeto de estudo da Unidade Curricular **Desenvolvimento Web**, com foco em lógica de programação avançada em JavaScript (vetores, matrizes, laços de repetição, switch/case e regex) e no fluxo de versionamento Git/GitHub + deploy contínuo na Vercel.

## Estrutura do projeto

```
ecommerce/
├── index.html      # Estrutura da página (lista de produtos, carrinho, checkout)
├── css/
│   └── style.css   # Estilos (layout em grid, cards de produto, carrinho lateral)
├── img/             # Fotos dos produtos (notebook, smartphone, headphone)
└── js/
    └── app.js       # Toda a lógica da aplicação
```

## Conceitos de JavaScript aplicados (em `js/app.js`)

| Conceito | Onde é usado |
|---|---|
| **Vetores (Arrays)** | `products` (lista de produtos) e `cart` (itens no carrinho) |
| **Matrizes (arrays 2D)** | `stockMatrix` — estoque por produto x filial (Filial A / Filial B) |
| **Laço `for`** | `renderProducts()` — percorre produtos e monta os cards na tela |
| **Laço `while`** | `updateCartUI()` — soma os valores dos itens do carrinho |
| **Laço `do...while`** | Botão "Esvaziar Carrinho" — remove item a item até zerar |
| **`switch/case`** | Cálculo de frete por região (SUL/SUDESTE, CENTRO-OESTE, NORDESTE, NORTE) |
| **Regex** | Validação de e-mail e CEP (`00000-000`) no checkout |

## Regras de negócio

- Produtos: Notebook Pro (R$ 5000), Smartphone 5G (R$ 3000), Headphone (R$ 500).
- Estoque = soma das duas filiais na `stockMatrix`; produto sem estoque tem o botão "Comprar" desabilitado (o valor exibido é fixo, calculado na renderização — comprar não decrementa a matriz nesta versão simplificada).
- Cada clique em "Comprar" adiciona o produto ao carrinho; comprar o mesmo item várias vezes gera uma linha por unidade (sem contador de quantidade).
- Frete por região:
  - Sul / Sudeste: R$ 15,00
  - Centro-Oeste: R$ 35,00
  - Nordeste: R$ 50,00
  - Norte: R$ 75,00
- Checkout só é liberado com e-mail válido, CEP no formato `00000-000` e região selecionada. As mensagens de erro/sucesso usam `alert()` simples, sem termos técnicos (ex: nada de "REGEX" aparece para o usuário final).

> **Nota para quem for evoluir o projeto:** dá pra ir além (estoque que realmente diminui a cada compra, quantidade por item no carrinho, remover item individual, mensagens visuais em vez de `alert()`) — isso já foi prototipado e depois revertido de propósito para manter o código no nível dos alunos (1º ano, recém viram `for`/`while`/`do-while`/vetores/matrizes/regex). São boas sugestões de **desafio extra/avançado** para grupos que quiserem ir além do básico.

## Pendências / próximos passos

- [ ] Inicializar o Git (`git init`), commitar e subir para um repositório no GitHub (`ecommerce-avancado`).
- [ ] Fazer deploy do projeto na Vercel a partir do repositório GitHub.
- [ ] Criar branch `feature/...` para próximas alterações e praticar Pull Request antes de mesclar na `main`.
- [ ] Ideias de exercício para os alunos: busca de produtos com regex, ordenação de produtos por preço, cupom de desconto com regex, seleção de filial no checkout.

## Identidade visual

- **Nome:** UniSENAI Store
- **Cores:** azul institucional `#0B3D91` (primária) e laranja `#F7941D` (acento/secundária), reproduzindo a paleta da logo UniSENAI.
- O logo no `header` é recriado via CSS/texto (tipografia em itálico/negrito + acento laranja). Para usar a marca oficial em PNG/SVG, salve o arquivo em `img/unisenai-logo.png` (ou `.svg`) e troque o `<div class="logo">` do `index.html` por uma tag `<img>` apontando para esse caminho.

## Como rodar localmente

Basta abrir o `index.html` diretamente no navegador (não depende de servidor/backend).

---


