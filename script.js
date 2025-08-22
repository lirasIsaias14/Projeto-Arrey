const btt_op = document.getElementById('open_op');
const list = document.querySelector('ul');
const viwAll = document.getElementById('viewAll');
const descont = document.getElementById('descont');
const filter = document.getElementById('filter');
const sumAll = document.getElementById('sumAll');

function showAll(arrey) {
    let myProduct = '';

    arrey.forEach(product => {
        myProduct += `
            <li class="product">
                <img src="${product.src}" alt="${product.name}">
                <h2 id='porduct'>${product.name}</h2>
                <p id='price'>R$ ${product.price.toFixed(2)}</p>
            </li>
        `
    });

    list.innerHTML = myProduct;

    document.querySelectorAll(".product").forEach(item => {
        item.addEventListener("click", () => {
            const name = item.dataset.name;
            alert(`Você clicou em: ${name}`);
        });
    });
}


function add10pocent() {
    const newPrice = product.map((item) => ({
        ...item,
        price: Number((item.price * 0.9).toFixed(2)),
    }));
    showAll(newPrice);
}

function showVegan() {
    const veganProducts = product.filter(item => item.vegan);
    showAll(veganProducts);
}

function sunAll() {
    const total = product.reduce((acc, item) => acc + item.price, 0);
    list.innerHTML = `
    <li class="product">
        <h2>Total: R$ ${total.toFixed(2)}</h2>
    </li>
    `
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

btt_op.addEventListener('click', openMenu);

sumAll.addEventListener('click', sunAll);
sumAll.addEventListener('click', clouseMenu);

filter.addEventListener('click', showVegan);
filter.addEventListener('click', clouseMenu);

viwAll.addEventListener('click', showAll(product));
viwAll.addEventListener('click', clouseMenu);

descont.addEventListener('click', add10pocent);
descont.addEventListener('click', clouseMenu);



