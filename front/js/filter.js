import { attachEventHandler, setPage } from "./config.js";
import { getAndShowAllProducts } from "./productAPI/products.js";

export const renderFiltration = () => {
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.innerHTML = `<form class="filter-form">
                <div class="filter-category">
                    <select class="form-select" id="filter-category" >
                    </select>
                </div>
                <div class="filter-search">
                    <input class="form-control search-input" id="filter-search" type="text">
                    <button type="button" id="searchButton" class="fas fa-search search-button"></button>
                    <button type="button" id="clearButton" class="clear-button">&times;</button>
                    
                </div>
                <div class="filter-sort">
                    <select class="form-select" id="filter-sort">
                        <option selected value="nosort">-- sort products (Don't sort) --</option>
                        <option value="incPr">by increasing price</option>
                        <option value="decPr">by decreasing price</option>
                        <option value="incYe">by increasing year</option>
                        <option value="decYe">by decreasing year</option>
                        <option value="nf">newest first</option>
                        <option value="of">oldest first</option>
                      </select>
                </div>
            </form>`;
    // Навішуємо обробники
    // Фільтація по категоріях
    attachEventHandler('filter-category', 'change', filtration);
    // Сортуавння
    attachEventHandler('filter-sort', 'change', filtration);
    // Пошук
    attachEventHandler('filter-search', 'input', filtration);
}

export const renderFilterCategoriesOptions = (categories) => {
    // Вибираємо відповідний select з блоку фільтрації i очищуємо його
    const filterCategory = document.getElementById('filter-category');
    filterCategory.innerHTML = ``;
    // Додаємо в них опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    // defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "all");
    defaultProductCategoryOption.innerText = ` -- select a category (All categories) -- `;
    filterCategory.appendChild(defaultProductCategoryOption);
    // Вибираємо категорії товарів з LS
    // const categoryArr = getCategories();
    categories.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        filterCategory.appendChild(categoryOption);
    });
}

// При будь-якій фільтрації - стаємо на 1-шу сторінку
const filtration = async () => {
    setPage(1);
    await getAndShowAllProducts();
}


document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.getElementById('filter-search');
    const clearButton = document.getElementById('clearButton');
    const searchButton = document.getElementById('searchButton');
    searchInput.addEventListener('focus', function() {
        searchButton.style.display = 'none';
    });

    function checkOfButtons(){
        if (clearButton.style.display === "none") {
            searchButton.style.display = 'block';
        } else {
            searchButton.style.display = 'none';
        }
    }
    searchInput.addEventListener('blur', function() {
        checkOfButtons();
    });
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.blur(); // Знімає фокус з поля вводу
        clearButton.style.display = 'none'; // Приховує кнопку очищення
        checkOfButtons();
    });

    searchButton.addEventListener('click', () => {
        searchInput.focus();
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value !== '') {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });
    attachEventHandler('clearButton', 'click', filtration);
});