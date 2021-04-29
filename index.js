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
let data = [];

const updateData = (newData) => {
    data = [...newData];
    const productContainer = document.querySelector(".product-list");
    renderList(productContainer);
}

const filterInStock = (event) => {
    const checked = event.target.checked;
    const newData = mockData.filter((product) => {
        if (checked) {
            return product.quantity > 0;
        }
        return true;
    });
    updateData(newData);
}
const filterByCategory = (event) => {
    const category = event.target.value;
    const newData = mockData.filter((product) => {
        return category === "all" || product.category === category;
    });
    updateData(newData);
}
const renderList = (container) => {
    const html = `<div class="products-container">` + data.reduce((html, product) => {
        return html + `
<div class="product-wrapper">
<img src="${product.image}" alt="${product.name}" class="product-image">
<div class="product-name">${product.name}</div>
<div class="product-price-wrapper">
<div class="product-price-line"> 
<div class="product-price">
$${product.price * (1 - product.discount)}
</div>
<div class="product-old-price">
$${product.price}
</div>
</div>
<div class="button">Add to cart</div>



</div>
</div>
`
    }, "") + `</div>`;
    container.innerHTML = html
}
const getCategories = (data) => {
    return data.reduce((categories, product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
        return categories;
    }, []);
}
const getSizes = (data) => {
    const allSizes = data.reduce((sizes, product) => {
        return [...sizes, ...product.sizes];
    }, []);
    return [...new Set(allSizes)].sort();
}
const renderBase = (container) => {
    const categories = getCategories(mockData);
    const sizes = getSizes(mockData);
    container.innerHTML = `
<div class="filters-wrapper">
<label>
<input type="checkbox" id="instock-checkbox">
Только в наличии
</label>
<select id="category-filter">
<option value="all">All categories</option>
${categories.map((category) => (`
<option value="${category}">${category}</option>
`)).join("")}
</select>
<div class="filter-checkboxes">
Размеры:
${sizes.map((size) => (`
<p>
<label for=""><input type="checkbox" value="${size}">${size}</label>
</p>
`)).join("")}
</div>
</div>
<div class="product-list"></div>
`;
    const inStockCheckbox = document.querySelector("#instock-checkbox");
    inStockCheckbox.addEventListener("change", filterInStock);
    const categoryFilter = document.querySelector("#category-filter");
    categoryFilter.addEventListener("change", filterByCategory);
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    renderBase(container);
    updateData(mockData);
})


