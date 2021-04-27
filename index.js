const mockData = [{
    id: 1,
    name: 'ADDIDAS XS-135',
    category: "Household",
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 150,
    sizes: [41, 42, 43, 45],
    discount: 0.1,
    quantity: 10,
    image: "img/p1.jpg"
}, {
    id: 2,
    name: 'NIKE GX-54',
    category: "Jogging",
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 250,
    sizes: [39, 40, 42, 45],
    discount: 0.15,
    quantity: 2,
    image: "img/p2.jpg"
}, {
    id: 3,
    name: 'REEBOK Vlu',
    category: "For dancing",
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 150,
    sizes: [41, 43, 47, 49],
    quantity: 1,
    discount: 0.1,
    image: "img/p3.jpg"
}, {
    id: 4,
    name: 'Puma Supercat',
    category: "Walking",
    quantity: 0,
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 250,
    discount: 0.15,
    sizes: [39, 47, 41, 36],
    image: "img/p4.jpg"
}, {
    id: 5,
    name: 'ADDIDAS MK-345',
    category: "Household",
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 150,
    quantity: 5,
    discount: 0.1,
    sizes: [36, 37, 38, 39],
    image: "img/p5.jpg"
}, {
    id: 6,
    name: 'NIKE PL-654',
    category: "Jogging",
    quantity: 3,
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 189.54,
    discount: 0.3,
    sizes: [40, 41, 42, 43],
    image: "img/p6.jpg"
}, {
    id: 7,
    name: 'REEBOK Lightsaber',
    category: "For dancing",
    quantity: 150,
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 743,
    discount: 0.1,
    sizes: [40, 42, 44, 46],
    image: "img/p7.jpg"
}, {
    id: 8,
    name: 'Puma Killogram',
    category: "Walking",
    description: `Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for something that can make your interior look awesome, and at the same time give you the pleasant warm feeling during the winter.`,
    price: 599,
    quantity: 0,
    discount: 0.35,
    sizes: [40, 44, 48],
    image: "img/p8.jpg" 
}]
const data = [...mockData];
const renderList = (container) => {
        const html = `<div class="products-container">` + data.reduce((html, product) => {
        return html + `
<div class="product-wrapper">
<img src="${product.image}" alt="${product.name}" class="product-image">
<div class="product-name">${product.name}</div>
<div class="product-price-wrapper">
<div class="product-price">
${product.price*(1 - product.discount)}
</div>
<div class="product-old-price">
${product.price}
</div>



</div>
</div>
`
    }, "") + `</div>`;
    container.innerHTML = html
}

const renderFiltres = () => {

}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    renderList(container);
})


