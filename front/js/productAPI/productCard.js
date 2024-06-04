import { addToCart } from "../cartAPI/cart.js";
import { attachEventHandler, getUser } from "../config.js";
import { popUp } from "../popup.js";
import { showInfoAboutProduct, editProduct, removeProduct } from "./products.js";
export const productCardRender = (product) => {
    // Виймаємо з product об'єкт category
    const { category } = product;
    // console.log(product);
    const prdStr = JSON.stringify(product);
    const prdId = JSON.stringify(product._id).trim();
    // console.log(prdStr);
    // Функціонал для формування карточки продукту
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    // Карточка продукту буде мати різний вигляд в залежності від стану авторизації
    // Верхня частина буде однаковою, футер - буде відрізнятися
    const commonProductCardPart = `<div class="product-data">
    <div class="image-container"><img src="${product.image}" class="product-img"></div>

                                        <div class="product-category"><div class="product-category-text">${category.name}</div></div>
                                        <div class="product-brand">${product.brand} ${product.model}</div>
                                        <div class="product-text">Year: <span class="product-year">${product.year}</span> </div>
                                        <div class="product-text">Mileage: <span class="product-mileage">${product.mileage}</span> km</div> 
                                        <div class="product-text">Engine capacity: <span class="product-engineCapacity">${product.engineCapacity}</span></div>
                                        <div class="product-text">Description: <span class="product-description"></span><span><div class="fas fa-eye product-btn showButton" id='showInfoAboutProduct${product._id}'> </div></span></div>
                                    </div>`;
    const adminProductCardFooter = `  <div class="product-footer">
                                        <div> <span class="product-price">${product.price} $ </span> </div>                                    
                                        <div class="product-manage-btns">
                                            <div class="fas fa-edit product-btn" id='editProduct${product._id}'> </div>
                                            <div class="fa-solid fa-trash-can product-btn" id="removeProduct${product._id}"></div>
                                        </div> 
                                    </div>`;
    const userProductCardFooter = `
                                    <div class="product-footer">
                                        <div> <span class="product-price">${product.price} $ </span> </div>                                    
                                        <div class="product-manage-btns">
                                            <div class="fa fa-shopping-cart product-cart-btn" id="addToCart${product._id}"> </div>
                                        </div> 
                                    </div>`;
    const unAuthProductCardFooter = `
                                    <div class="product-footer">
                                        <div> <span class="product-price">${product.price} $ </span> </div>                                    
                                        <div class="product-manage-btns">
                                        <div class="fa fa-shopping-cart product-cart-btn" id='popUp${product._id}' > </div>
                                        </div> 
                                    </div>`;
    // Перевіряємо стан авторизації
    const user = getUser();

    // В залежності від стану авторизації формуємо карточку
    switch (true) {
        // Перевіряємо чи авторизований користувач
        case user === null:
            // Картка продукуту для  неваторизованого користувача
            productCard.innerHTML = `${commonProductCardPart} ${unAuthProductCardFooter}`;
            break;
        // Перевіряємо, чи авторизований користувач є покупцем 
        case user && !user.isAdmin:
            // Меню авторизованого покупця
            productCard.innerHTML = `${commonProductCardPart} ${userProductCardFooter}`;
            break;
        // Перевіряємо, чи авторизований користувач є адміністраторои
        case user.isAdmin:
            // Меню адміністратора
            productCard.innerHTML = `${commonProductCardPart} ${adminProductCardFooter}`;
            break;
    }

    // Розміщаємо карточку продукту
    const dataContainer = document.querySelector(".data-container");
    dataContainer.appendChild(productCard);

    // Навішуємо обробники подій
    attachEventHandler(`popUp${product._id}`, 'click', () => { popUp('Please log in', 'danger') });
    attachEventHandler(`addToCart${product._id}`, 'click', () => { addToCart(product) });
    attachEventHandler(`editProduct${product._id}`, 'click', () => { editProduct(product) });
    attachEventHandler(`showInfoAboutProduct${product._id}`, 'click', () => { showInfoAboutProduct(product) });
    attachEventHandler(`removeProduct${product._id}`, 'click', () => { removeProduct(product) });
}
