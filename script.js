const btt_op = document.getElementById('open_op');
const list = document.querySelector('ul');
const descri = document.querySelector('.products'); // container de detalhes
const viwAll = document.getElementById('viewAll');
const descont = document.getElementById('descont');
const filter = document.getElementById('filter');
const sumAll = document.getElementById('sumAll');

// mantém referência do que está sendo exibido (após filtro/desconto)
let currentArray = [];

// --- render da lista ---
function showAll(array) {
    currentArray = array;
    const html = array.map((p, i) => `
    <li class="product" data-index="${i}" style="cursor:pointer">
      <img src="${p.src}" alt="${p.name}">
      <h2 class="product-name">${p.name}</h2>
      <p id="price">R$ ${Number(p.price).toFixed(2)}</p>
    </li>
  `).join('');
    list.innerHTML = html;
    if (descri) descri.innerHTML = ''; // limpa detalhes quando listar
}

// --- render de detalhes ---
function showDetailsByIndex(index) {
    const p = currentArray[index];
    if (!p || !descri) return;
    const fundo = document.querySelector('section')
    fundo.style.display = 'block'
    descri.innerHTML = `
    <div class="infor">
      <img src="${p.src}" alt="${p.name}">
      <h2>${p.name}</h2>
    </div>
    <div class="description">
      <h2>Descrição:</h2>
      <p>${p.description ? p.description : 'Produto delicioso!'}</p>
      <p id="price">R$ ${Number(p.price).toFixed(2)}</p>
      <button id="backList">Voltar</button>
    </div>
  `;

    document.getElementById('backList').addEventListener('click', () => {
        descri.innerHTML = '';
        list.scrollIntoView({ behavior: 'smooth' });
        fundo.style.display = 'none'
    });

    descri.scrollIntoView({ behavior: 'smooth' });
}

// --- clique nos cards (delegação, 1x só) ---
list.addEventListener('click', (e) => {
    const li = e.target.closest('li.product');
    if (!li) return;
    const index = Number(li.dataset.index);
    showDetailsByIndex(index);
});

// --- ações do menu ---
function add10pocent() {
    const newPrice = product.map(item => ({
        ...item,
        price: Number((Number(item.price) * 0.75).toFixed(2)),
    }));
    showAll(newPrice);
}

function showVegan() {
    const veganProducts = product.filter(item => item.vegan);
    showAll(veganProducts);
}

function sunAll() {
    const total = product.reduce((acc, item) => acc + Number(item.price), 0);
    list.innerHTML = `
    <div class="receipt">
     <p class="shop-name">O Valor de todos</p>
     <p class="info">
         1234 Market Street, Suite 101<br />
         City, State ZIP<br />
         Date: 23/08/2025<br />
         Time: 02:15 PM
    </p>

    <table>
        <thead>
         <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
         </tr>
        </thead>
        <tbody>
            <tr>
            <td>X-Salada</td>
            <td>1</td>
            <td>$30.00</td>
        </tr>
        <tr>
            <td>X-Bacon</td>
            <td>1</td>
            <td>R$ 34.00</td>
        </tr>
            <tr>
            <td>X-Bacon Egg</td>
            <td>1</td>
        <td>R$ 39.00</td>
            </tr>
            <tr>
                <td>.....</td>
                <td>..</td>
                <td>....</td>
            </tr>
        </tbody>
    </table>

    <div class="total">
        <p>Total:</p>
        <p>R$ ${total.toFixed(2)}</p>
    </div>

  <p class="thanks">Esse valor de todos os pedidos somados !!!</p>
</div>

  `;
    if (descri) descri.innerHTML = '';

}

function openMenu() {
    const menu = document.querySelector('.menu-btt');
    if (menu.style.right === '-295px') {
        menu.style.right = '0px';
        btt_op.innerHTML = '&#11167;';
        btt_op.style.left = '0px';
    } else {
        menu.style.right = '-295px';
        btt_op.style.left = '-50px';
        btt_op.innerHTML = '&#11166;';
        btt_op.style.transition = '0.5s ease-in-out';
    }
}

function clouseMenu() {
    const menu = document.querySelector('.menu-btt');
    if (menu.style.right === '0px') {
        menu.style.right = '-295px';
        btt_op.style.left = '-50px';
        btt_op.innerHTML = '&#11166;';
        btt_op.style.transition = '0.5s ease-in-out';
    }
}

// --- listeners dos botões ---
btt_op.addEventListener('click', openMenu);

sumAll.addEventListener('click', sunAll);
sumAll.addEventListener('click', clouseMenu);

filter.addEventListener('click', showVegan);
filter.addEventListener('click', clouseMenu);

viwAll.addEventListener('click', () => showAll(product));
viwAll.addEventListener('click', clouseMenu);

descont.addEventListener('click', add10pocent);
descont.addEventListener('click', clouseMenu);

// --- inicializa mostrando tudo ---
document.addEventListener('DOMContentLoaded', () => {
    if (Array.isArray(window.product)) {
        showAll(product);
    } else {
        console.error('Array "product" não encontrado. Verifique seu products.js');
    }
});
