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

const state = {
    sortBy: "price",
    sortOrder: "1",
    changeState(field, value) {
        this[field] = value;
        this.sort();
},
    sort(){
        data = mockData.sort((product1, product2) => {
            if(this.sortBy === "price"){
                const price1 = product1.price * (1 - product1.discount);
                const price2 = product2.price * (1 - product2.discount);
                return (price1 - price2)*+this.sortOrder;
            };
            if(this.sortBy === "category"){
                return product1.category.localeCompare(product2.category) * this.sortOrder;
            };
            if(this.sortBy === "size"){
                if(this.sortOrder === "-1") {                
                const maxSize1 = Math.max(...product1.sizes);
                const maxSize2 = Math.max(...product2.sizes);
                return maxSize2 - maxSize1;
            }
                const minSize1 = Math.min(...product1.sizes);
                const minSize2 = Math.min(...product2.sizes);
                return minSize1 - minSize2;
            }
        });
        updateData(data);
    }
};

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
const filterBySizes = () => {
    const sizeCheckboxes = document.querySelectorAll(".size-checkbox");
    const activeSizes = Array.from(sizeCheckboxes).reduce((activeSizes, checkbox) => {
        if(checkbox.checked){
            activeSizes.push(+checkbox.value)
        }
        return activeSizes;
    }, []);
    const newData = mockData.filter((product) => {
        return product.sizes.some((size) => {
            return activeSizes.includes(size);
        });
    });
    return updateData(newData);
}
const filterByPriceFrom = (event) => {
    const price = +event.target.value;
    const newData = mockData.filter((product) => {
        return product.price * (1 - product.discount) >= price;
    });
    return updateData(newData);
}
const filterByPriceTo = (event) => {
    const price = +event.target.value;
    const newData = mockData.filter((product) => {
        return product.price * (1 - product.discount) <= price;
    });
    return updateData(newData);
}
const changeSortBy = (event) => {
    state.changeState("sortBy", event.target.value);
}
const changeSortOrder = (event) => {
        state.changeState("sortOrder", event.target.value);
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
<p>
Сортировать по:
<select id="select-sort-by">
<option value="price">По цене:</option>
<option value="size">По размеру:</option>
<option value="category">По категории:</option>
</select>
</p>
<p>
Направление сортировки:
<select id="select-sort-order">
<option value="1">А > Я</option>
<option value="-1">Я > А</option>
</select>
</p>
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
<p>
<input type="number" id="input-price-from" placeholder="Цена от">
-
<input type="number" id="input-price-to" placeholder="Цена до">
</p>

<div class="filter-checkboxes">
Размеры:
${sizes.map((size) => (`
<p>
<label for=""><input type="checkbox" class="size-checkbox" value="${size}">${size}</label>
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
    const sizeCheckboxes = document.querySelectorAll(".size-checkbox");
    sizeCheckboxes.forEach((sizeCheckbox) => {
        sizeCheckbox.addEventListener("change", filterBySizes);
    })
    const inputPriceFrom = document.querySelector("#input-price-from");
    inputPriceFrom.addEventListener("change", filterByPriceFrom);
    const inputPriceTo = document.querySelector("#input-price-to");
    inputPriceTo.addEventListener("change", filterByPriceTo);
    const selectSortBy = document.querySelector("#select-sort-by");
    selectSortBy.addEventListener("change", changeSortBy);
    const selectSortOrder = document.querySelector("#select-sort-order");
    selectSortOrder.addEventListener("change", changeSortOrder);
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    renderBase(container);
    updateData(mockData);
})


