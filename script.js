const btt_op = document.getElementById('open_op');
const list = document.querySelector('ul');
const viwAll = document.getElementById('viewAll');
const descont = document.getElementById('descont');
const filter = document.getElementById('filter');
const sumAll = document.getElementById('sumAll');
const add = document.getElementById('add');

btt_op.onclick = function () {
    nav = document.getElementById('menu-btt');
    if (nav.style.width == '260px') {
        nav.style.width = '0px';
        nav.style.right = '5px';
        btt_op.style.left = '-22px';
        btt_op.style.width = '55px';
    } else {
        btt_op.style.left = '0px';
        btt_op.style.width = '260px';
        nav.style.width = '260px';
        nav.style.right = '5px';
    }
}

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
}


function add10pocent() {
    const newPrice = product.map((item) => ({
        ...item,
        price: item.price * 0.9.toFixed(2),
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

sumAll.addEventListener('click', sunAll)
filter.addEventListener('click', showVegan)
viwAll.addEventListener('click', () => showAll(product));
descont.addEventListener('click', add10pocent);