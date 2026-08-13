// ============================================================
// UNISENAI STORE — LÓGICA DA LOJA (app.js)
// ------------------------------------------------------------
// Este arquivo contém toda a lógica JavaScript do e-commerce.
// Ele foi comentado passo a passo para servir de material de
// estudo dos seguintes conceitos: vetores, matrizes, laços
// (for, while, do...while), switch/case e expressões regulares.
// ============================================================


// ==========================================
// 1. VETORES (Arrays)
// ==========================================

// Vetor com os produtos da loja. Cada produto é um objeto com
// id, nome, preço e o caminho da imagem (dentro da pasta img/).
const products = [
    { id: 0, name: "Notebook Pro", price: 5000.00, image: "img/notebook-pro.jpg" },
    { id: 1, name: "Smartphone 5G", price: 3000.00, image: "img/smartphone-5g.jpg" },
    { id: 2, name: "Headphone", price: 500.00, image: "img/headphone.jpg" }
];

// Vetor que armazena os itens do carrinho.
// Cada "compra" empurra (push) um produto inteiro para dentro
// deste vetor — se o cliente comprar 3 unidades, o mesmo produto
// aparece 3 vezes aqui.
let cart = [];


// ==========================================
// 2. MATRIZES (Arrays Bidimensionais)
// ==========================================
// Uma matriz é um "vetor de vetores": cada linha representa um
// produto (na mesma ordem/índice do vetor "products") e cada
// coluna representa a quantidade em estoque numa filial.
//
// Linhas: IDs dos Produtos (0, 1, 2)
// Colunas: Quantidade em estoque por filial (Filial A, Filial B)
const stockMatrix = [
    [10, 5],  // Produto 0 (Notebook Pro)  -> 10 na Filial A e 5 na Filial B
    [0, 2],   // Produto 1 (Smartphone 5G) -> 0 na Filial A e 2 na Filial B
    [15, 20]  // Produto 2 (Headphone)     -> 15 na Filial A e 20 na Filial B
];


// ==========================================
// REFERÊNCIAS AOS ELEMENTOS DO HTML
// ==========================================
// Guardamos os elementos que vamos manipular várias vezes em
// constantes, para não ficar chamando document.getElementById()
// repetidamente.
const productList = document.getElementById('product-list');   // <div> onde os cards de produto são desenhados
const cartItems = document.getElementById('cart-items');         // <div> onde os itens do carrinho são desenhados
const checkoutForm = document.getElementById('checkout-form');   // formulário de entrega (só aparece com carrinho não-vazio)
const regionSelect = document.getElementById('user-region');     // <select> de região (usado no switch/case do frete)
const formMessage = document.getElementById('form-message');     // <p> onde aparecem os avisos de erro/sucesso do checkout

let freteGlobal = 0; // valor do frete atual, calculado pelo switch/case da região


// Mostra uma mensagem de erro (vermelho) ou sucesso (verde) dentro
// do próprio formulário de checkout.
// Por que não usar alert()? Porque o alert() do navegador mostra o
// nome do PROGRAMA (ex: "Code"), não o nome da loja — e também
// trava a página até o usuário clicar em "OK". Uma mensagem dentro
// do próprio site fica mais profissional e mais fácil de estilizar.
function showFormMessage(text, isError) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + (isError ? 'error' : 'success');
}


// ==========================================
// 3. LAÇO FOR (Clássico)
// ==========================================

// Percorre o vetor "products" e desenha um card na tela para cada
// produto, já mostrando o estoque total (somando as duas filiais
// na matriz) e desabilitando o botão "Comprar" quando o estoque
// chega a zero.
function renderProducts() {
    productList.innerHTML = ''; // limpa a lista antes de redesenhar

    // FOR percorre cada posição do vetor "products" (índice 0 até o último)
    for (let i = 0; i < products.length; i++) {
        let prod = products[i];

        // Estoque total = soma da linha "i" da matriz (Filial A + Filial B)
        let estoqueTotal = stockMatrix[i][0] + stockMatrix[i][1];

        // Monta o HTML do card e adiciona na lista (por isso o "+=")
        productList.innerHTML += `
            <div class="product-card">
                <img src="${prod.image}" alt="${prod.name}">
                <h3>${prod.name}</h3>
                <p class="product-price">R$ ${prod.price.toFixed(2)}</p>
                <p class="stock-info">Estoque disponível: ${estoqueTotal}</p>
                <label class="qty-label" for="qty-${prod.id}">Quantidade:</label>
                <input type="number" id="qty-${prod.id}" class="qty-input" min="1" max="${estoqueTotal}" value="1" ${estoqueTotal === 0 ? 'disabled' : ''}>
                <button class="btn-primary" onclick="addToCart(${prod.id})" ${estoqueTotal === 0 ? 'disabled' : ''}>
                    Comprar
                </button>
            </div>
        `;
    }
}

// Adiciona um produto ao carrinho, respeitando a quantidade que o
// cliente escolheu no campo <input> do card.
function addToCart(id) {
    // Pega o campo de quantidade específico deste produto (id no final do "id do input")
    let inputQty = document.getElementById('qty-' + id);
    let quantidade = parseInt(inputQty.value);

    // Se o campo estiver vazio, com letras ou número menor que 1,
    // assume 1 unidade (evita carrinho com quantidade inválida)
    if (isNaN(quantidade) || quantidade < 1) {
        quantidade = 1;
    }

    // FOR repete "quantidade" vezes, empurrando o mesmo produto
    // para o vetor "cart" a cada repetição
    for (let i = 0; i < quantidade; i++) {
        cart.push(products[id]); // adiciona o objeto inteiro do produto no vetor
    }

    inputQty.value = 1; // reseta o campo de quantidade para a próxima compra
    updateCartUI();      // redesenha o carrinho com o item novo
}


// ==========================================
// 4. LAÇO WHILE
// ==========================================

// Redesenha a lista de itens do carrinho e recalcula os totais
// (subtotal, frete e total final) toda vez que o carrinho muda.
function updateCartUI() {
    cartItems.innerHTML = '';
    let totalItens = cart.length; // quantidade de linhas no carrinho
    let subtotal = 0;

    if (totalItens === 0) {
        // Carrinho vazio: esconde o formulário de entrega e desabilita o checkout
        cartItems.innerHTML = '<p>Carrinho vazio.</p>';
        checkoutForm.style.display = 'none';
        document.getElementById('btn-checkout').disabled = true;
    } else {
        checkoutForm.style.display = 'block';
        document.getElementById('btn-checkout').disabled = false;

        // WHILE percorre o vetor "cart" enquanto "index" for menor que o tamanho dele.
        // Toda vez que o corpo do laço roda, soma o preço do item ao subtotal
        // e desenha uma linha na tela.
        let index = 0;
        while (index < cart.length) {
            let item = cart[index];
            subtotal += item.price;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>R$ ${item.price.toFixed(2)}</span>
                </div>
            `;
            index++; // sem isso o laço nunca terminaria (loop infinito!)
        }
    }

    // Atualiza os números exibidos na tela (cabeçalho + rodapé do carrinho)
    let valorFinal = subtotal + freteGlobal;
    document.getElementById('cart-count').innerText = totalItens;
    document.getElementById('cart-summary-total').innerText = valorFinal.toFixed(2);
    document.getElementById('cart-total').innerText = valorFinal.toFixed(2);
}


// ==========================================
// 5. LAÇO DO-WHILE
// ==========================================
// O botão "Esvaziar Carrinho" remove um item por vez do vetor
// "cart" até ele ficar vazio. Usamos DO-WHILE (em vez de WHILE)
// porque, aqui dentro do "if", já sabemos que existe pelo menos
// 1 item — então o corpo do laço sempre executa ao menos uma vez.
document.getElementById('btn-clear').addEventListener('click', function() {
    if (cart.length > 0) {
        do {
            cart.pop(); // remove o último elemento do vetor
        } while (cart.length > 0); // repete até o vetor esvaziar

        // Zera o frete, já que não há mais itens/região selecionada valendo
        freteGlobal = 0;
        document.getElementById('shipping-value').innerText = '0.00';
        updateCartUI();
    }
});


// ==========================================
// 6. ESTRUTURA CASE (Switch)
// ==========================================
// Sempre que o cliente troca a região no <select>, este evento
// dispara e decide o valor do frete de acordo com a opção escolhida.
regionSelect.addEventListener('change', function() {
    let regiao = this.value; // "this" é o próprio <select> que disparou o evento

    // SWITCH compara "regiao" com cada "case" até encontrar uma correspondência.
    // Sul e Sudeste caem no mesmo valor de frete (por isso ficam "empilhados",
    // sem "break" entre eles).
    switch (regiao) {
        case 'SUL':
        case 'SUDESTE':
            freteGlobal = 15.00;
            break;
        case 'CENTRO-OESTE':
            freteGlobal = 35.00;
            break;
        case 'NORDESTE':
            freteGlobal = 50.00;
            break;
        case 'NORTE':
            freteGlobal = 75.00;
            break;
        default:
            // Cai aqui se nada foi selecionado (valor "")
            freteGlobal = 0.00;
            break;
    }

    document.getElementById('shipping-value').innerText = freteGlobal.toFixed(2);
    updateCartUI(); // recalcula o total, já que o frete mudou
});


// ==========================================
// 7. EXPRESSÕES REGULARES (Regex)
// ==========================================
// Ao clicar em "Finalizar Compra", validamos os campos de e-mail
// e CEP usando expressões regulares (regex) antes de aceitar o pedido.
document.getElementById('btn-checkout').addEventListener('click', function() {
    let email = document.getElementById('user-email').value;
    let cep = document.getElementById('user-cep').value;
    let regiao = regionSelect.value;

    // Padrão para e-mail: "algo" + "@" + "algo" + "." + "algo"
    // (ex: aluno@exemplo.com), sem espaços em branco
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Padrão para CEP brasileiro: 5 dígitos + hífen + 3 dígitos (ex: 12345-678)
    let cepRegex = /^\d{5}-\d{3}$/;

    // .test() retorna true/false dizendo se o texto bate com o padrão.
    // As mensagens exibidas ao usuário são simples, sem termos técnicos
    // como "regex" — isso fica só aqui nos comentários, para quem for
    // estudar o código.
    if (!emailRegex.test(email)) {
        showFormMessage("Por favor, insira um e-mail válido.", true);
        return; // interrompe a função, não deixa continuar
    }

    if (!cepRegex.test(cep)) {
        showFormMessage("CEP inválido. Use o formato 00000-000.", true);
        return;
    }

    if (regiao === '') {
        showFormMessage("Selecione uma região para o frete.", true);
        return;
    }

    // Se passou por todas as validações acima, a compra é aprovada
    showFormMessage("Compra realizada com sucesso! Recibo enviado para: " + email, false);
});


// ==========================================
// INICIALIZAÇÃO
// ==========================================
// Assim que o app.js é carregado, desenha a lista de produtos na tela.
renderProducts();
