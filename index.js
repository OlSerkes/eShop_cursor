let data = [];
let googleData = [];

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
        data = googleData.sort((product1, product2) => {
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
    const newData = googleData.filter((product) => {
        if (checked) {
            return product.quantity > 0;
        }
        return true;
    });
    updateData(newData);
}
const filterByCategory = (event) => {
    const category = event.target.value;
    const newData = googleData.filter((product) => {
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
    const newData = googleData.filter((product) => {
        return product.sizes.some((size) => {
            return activeSizes.includes(size);
        });
    });
    return updateData(newData);
}
const filterByPriceFrom = (event) => {
    const price = +event.target.value;
    const newData = googleData.filter((product) => {
        return product.price * (1 - product.discount) >= price;
    });
    return updateData(newData);
}
const filterByPriceTo = (event) => {
    const price = +event.target.value;
    const newData = googleData.filter((product) => {
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
            <a class="product-wrapper" href="#product/${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-name">${product.name}</div>
                <div class="product-price-wrapper">
                <div class="product-price-line"> 
                    <div class="product-price">
                        $${product.price * (1 - product.discount)}
                    </div>
                    <div class="product-price product-price-old">
                        $${product.price}
                    </div>
                </div>
                <div class="button">Add to cart</div>
                </div>
            </a>
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
const getHeaderHTML = () => {
    return `
    <header>
        <img class="logo" src="img/logo.png" alt="logo">
        <a class="link" href="#">Home</a>
        <div class="cart">
            <div class="cart-count">3</div>
            <div class="cart-total">$1000</div>
        </div>
    </header>
    
    
    `
}


const renderHome = (container) => {
    const categories = getCategories(googleData);
    const sizes = getSizes(googleData);
    container.innerHTML = `
    ${getHeaderHTML()}
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
    updateData(googleData);
}
const renderProduct = (container, product) => {
    container.innerHTML = `
        ${getHeaderHTML()}
        <div class="product-page-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-page-image">
            <div class="product-page-detail">
                <div class="product-page-name">${product.name}</div>
                <div class="product-page-price">
                    $${product.price * (1 - product.discount)}
                </div>
                <p>Category: ${product.category}</p>
                <p>Availability: ${product.quantity > 0 ? "In Stock" : "Out of Stock"}</p> 
                <div class="product-page-description">
                    ${product.description}
                </div>
                <div class="product-page-quantity">
                    Quantity: <input type="number">
                </div>
                <div class="button">Add to cart</div>
                </div>               
        </div>
    `;
}
const container = document.querySelector(".container");

const checkHash = () => {
    const hash = window.location.hash.replase("#", "");
    const [path, param] = hash.split("/");
    switch (path){
        case "product": {
           return renderProduct(container, googleData.find((p) => p.id === +param));
        }
        default: {
            return renderHome(container);
        }
    }
}
window.onhashchange = checkHash;

document.addEventListener("DOMContentLoaded", () => {    
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1b02uqOkLvoEf59aeRw_mO58vZKJ8uO77lZUwH7xNQMQ/?key=AIzaSyDqCdb2FbPJ13YyhvooHCtkTgBD5iYtJp8&ranges=A1:I100&fields=properties.title,sheets(properties,data.rowData.values)")
        .then((res) => res.json())
        .then((json) => {
           const data = json.sheets[0].data[0].rowData.slice(1).map((row) => {
               return {
                id: +row.values[0].formattedValue,
                name: row.values[1].formattedValue,
                category: row.values[2].formattedValue,
                description: row.values[3].formattedValue,
                price: +row.values[4].formattedValue,
                sizes: row.values[5].formattedValue.split(",").map((s) => +s),
                discount: +row.values[6].formattedValue,
                quantity: +row.values[7].formattedValue,
                image: row.values[8].formattedValue
               }
           }); 
            googleData = data;            
            checkHash();
            
        });    
});


