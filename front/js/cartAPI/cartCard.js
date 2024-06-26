import { attachEventHandler, getUser, setUser } from "../config.js";
import { confirmModal, waitForRemoveButtonPress } from "../modals/confirmationModal.js";
import { navbarRender } from "../navbar.js";
import { cartRender, updateCartInDB } from "./cart.js";

// Функція рендерингу карточки айтемів корзини
export const cartCardRender = (item, index) => {
    const cartContainer = document.querySelector('.cart-container');
    const cartCard = document.createElement('div');
    cartCard.classList.add('cart-card');
    cartCard.innerHTML = `  <div class="cart-remove-btn" id="removeCartItem${item.product._id}">&times</div>
                            
                            <div class="cart-img-container">
                                <div class="cart-product-category">
                                    <div class="cart-product-category-text">${item.product.category.name}</div>
                                </div>
                                <div> <img src='${item.product.image}' class="cart-product-img"> </div>
                            </div>

                            <div class="cart-product-info">
                                <div class="cart-product-brand">${item.product.brand}</div>
                                <div class="cart-product-model">${item.product.model}</div>
                                <div class="cart-product-year">${item.product.year} year</div>
                                <div class="cart-product-engineCapacity">${item.product.engineCapacity} l.</div>
                                <div class="cart-product-mileage">${item.product.mileage} km.</div>
                                <div class="cart-product-price">${item.product.price} $ / pc</div>
                            </div>
                            <div class="cart-manage-btns">
                                <button class="cart-manage-button" id="decreaseCartItemCount${item.product._id}">-</button>
                                <div class="cart-current-item-count">${item.count}</div>
                                <button class="cart-manage-button" id="increaseCartItemCount${item.product._id}">+</button>
                            </div>
                            <div class="cart-item-price">${item.count * item.product.price} &#x20b4
                            </div>`;
    cartContainer.appendChild(cartCard);
    // Навішуємо обробники
    attachEventHandler(`removeCartItem${item.product._id}`, 'click', () => { removeCartItem(item, index) });
    attachEventHandler(`decreaseCartItemCount${item.product._id}`, 'click', () => {     (item, index) });
    attachEventHandler(`increaseCartItemCount${item.product._id}`, 'click', () => { increaseCartItemCount(index) });
}

const removeCartItem = async (item, index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const msg = document.getElementsByClassName('confirmation-message')[0];
            msg.innerHTML = `Are you sure you want to remove product <b>${item.product.brand} ${item.product.model}</b> from the cart? </br>`
            confirmModal.open();
            await waitForRemoveButtonPress();
            confirmModal.close();
            const user = getUser();
            user.cart.splice(index, 1);
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

export const clearCart = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const msg = document.getElementsByClassName('confirmation-message')[0];
            msg.innerHTML = `Are you sure you want to clear all items from the cart? </br>`;
            confirmModal.open();
            await waitForRemoveButtonPress();
            confirmModal.close();
            const user = getUser();
            user.cart = []; // Clear the cart by setting it to an empty array
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}


const increaseCartItemCount = async (index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            user.cart[index].count += 1;
            setUser(user);
            await refreshCart();
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const decreaseCartItemCount = async (item, index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = getUser();
            let count = user.cart[index].count;
            count -= 1;
            if (count === 0) {
                removeCartItem(item, index)
            } else {
                user.cart[index].count -= 1;
                setUser(user);
                await refreshCart();
            }
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

export const refreshCart = async () => {
    navbarRender(getUser());
    cartRender();
    await updateCartInDB(getUser());
}