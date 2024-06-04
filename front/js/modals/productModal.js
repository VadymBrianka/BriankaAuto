import { getCategories } from "../config.js";
import { getAndShowAllProducts, sendProductData } from "../productAPI/products.js";
import { CustomModal } from "./main.js";

//
// ********* Модальне вікно для створення та редагування продукту ************
// 
const productModalTitle = `Create product`;
const productModalContent = `<form name="productForm" enctype="multipart/form-data" id="productForm">
    <input type="hidden" name="productId" id="productId">
    <input type="hidden" name="oldCloudinaryPublicId" id="oldCloudinaryPublicId">
    <input type="hidden" name="oldImagePath" id="oldImagePath">
    <table class="form-table">
        <tr>
            <td class="form-label"><label for="producCategory" id="productCategoryLabel">Category:</label> </td>
            <td class="form-input">
                <select name="producCategory" id="producCategory" class="form-select" required>
                </select>
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="productBrand" id="productBrandLabel">Brand:</label> </td>
            <td class="form-input"><input type="text" name="productBrand" id="productBrand" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productModel" id="productModelLabel">Model:</label> </td>
            <td class="form-input"><input type="text" name="productModel" id="productModel" class="form-control" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productYear" id="productYearLabel">Year:</label> </td>
            <td class="form-input"><input type="number" name="productYear" id="productYear" class="form-control no-spinners" min="1000" max="2024" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productMileage" id="productMileageLabel">Mileage:</label> </td>
            <td class="form-input"><input type="number" name="productMileage" id="productMileage" class="form-control  no-spinners" min="0" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productEngineCapacity" id="productEngineCapacityLabel">Engine capacity:</label> </td>
            <td class="form-input"><input type="number" name="productEngineCapacity" id="productEngineCapacity" class="form-control  no-spinners" min="0" step="0.01" required></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productDescription" id="productDescriptionLabel">Description:</label> </td>
            <td class="form-input"><textarea name="productDescription" id="productDescription" class="form-control" required></textarea></td>
        </tr>
        <tr>
            <td></td>
            <td class="form-image-container">
                <img class="form-image" id="formImage" >
            </td>
        </tr>
        <tr>
            <td class="form-label"><label for="productImage" id="productImageLabel">Image:</label> </td>
            <td class="form-input"><input type="file" name="productImage" id="productImage" class="form-control" multiple onchange="document.getElementById('formImage').src = window.URL.createObjectURL(this.files[0])" ></td>
        </tr>
        <tr>
            <td class="form-label"><label for="productPrice" id="productPriceLabel">Price, $:</label> </td>
            <td class="form-input"><input type="number" name="productPrice" id="productPrice" class="form-control no-spinners" required min="0" step="0.01"></td>
        </tr>
    </table>
    <div class="modal-form-footer" id="modal-form-footer">
    <input type="reset" class="btn btn-danger" id="cancelProductBtn" data-close="true" value="Cancel">
    <input type="submit" class="btn btn-success" id="submitProductBtn" value="Create">
    </div>
    </form>`;
const productModalFooter =``;
export const productModal = new CustomModal('prd', productModalTitle, productModalContent, productModalFooter);
productModal.create();

export const convertModalToCreate = () => {
    document.getElementById("productId").setAttribute("value", "");
    // document.getElementById('productForm').reset();
    document.getElementById('title-prd').innerText = "Create product";
    document.getElementById('submitProductBtn').value = "Create" 
    convertToCreateOrEdit();
}

export const convertModalToShow = () => {
    document.getElementById('title-prd').innerText = "Info about product";
    document.getElementById('productBrand').style.display = 'none';
    document.getElementById('productModel').style.display = 'none';
    document.getElementById('productYear').style.display = 'none';
    document.getElementById('productMileage').style.display = 'none';
    document.getElementById('productEngineCapacity').style.display = 'none';
    document.getElementById('producCategory').style.display = 'none';
    document.getElementById('productImage').style.display = 'none';
    document.getElementById('productDescription').setAttribute('readonly', true);
    document.getElementById('productDescription').style.height = '550px';
    document.getElementById('productDescription').style.width = 'calc(100% + 5%)';
    document.getElementById('productDescription').style.margin = '-100px 0 -160px -10%';
    document.getElementById('productPrice').style.display = 'none';
    document.getElementById('productMileageLabel').style.display = 'none';
    document.getElementById('productYearLabel').style.display = 'none';
    document.getElementById('productBrandLabel').style.display = 'none';
    document.getElementById('productModelLabel').style.display = 'none';
    document.getElementById('productEngineCapacityLabel').style.display = 'none';
    document.getElementById('productCategoryLabel').style.display = 'none';
    document.getElementById('productPriceLabel').style.display = 'none';
    document.getElementById('modal-form-footer').style.display = 'none';
    document.getElementById('formImage').style.display = 'none';
    document.getElementById('productImageLabel').style.display = 'none';
    // document.getElementById('productDescriptionLabel').style.display = 'none';
}


//Функції для зміни режиму вікна Створення/Редагування/Показу даних

export const convertModalToEdit = () => {
    document.getElementById('title-prd').innerText = "Edit product";
    document.getElementById('submitProductBtn').value = "Confirm" 
    convertToCreateOrEdit();
}

function convertToCreateOrEdit(){
    document.getElementById('productBrand').style.display = 'flex';
    document.getElementById('productModel').style.display = 'flex';
    document.getElementById('productYear').style.display = 'flex';
    document.getElementById('productMileage').style.display = 'flex';
    document.getElementById('productEngineCapacity').style.display = 'flex';
    document.getElementById('producCategory').style.display = 'flex';
    document.getElementById('productImage').style.display = 'flex';
    document.getElementById('productDescription').removeAttribute('readonly', true);
    document.getElementById('productDescription').style.height = '62px';
    document.getElementById('productDescription').style.width = '100%';
    document.getElementById('productDescription').style.margin = '0px';
    document.getElementById('productPrice').style.display = 'flex';
    document.getElementById('productMileageLabel').style.display = 'flex';
    document.getElementById('productYearLabel').style.display = 'flex';
    document.getElementById('productBrandLabel').style.display = 'flex';
    document.getElementById('productModelLabel').style.display = 'flex';
    document.getElementById('productEngineCapacityLabel').style.display = 'flex';
    document.getElementById('productCategoryLabel').style.display = 'flex';
    document.getElementById('productPriceLabel').style.display = 'flex';
    document.getElementById('modal-form-footer').style.display = 'flex';
    document.getElementById('formImage').style.display = 'flex';
    document.getElementById('productImageLabel').style.display = 'flex';
    document.getElementById('productDescriptionLabel').style.display = 'flex';
}

export const openProductModalWithCreate = () => {
    document.getElementById('productForm').reset();
    convertModalToCreate();
    renderProductCategoriesOptions();
    productModal.open();
}

export const openProductModalWithShow = () => {
    convertModalToShow();
    productModal.open();
}

// Обробник відправки форми
document.forms["productForm"].addEventListener ('submit', (e) => {
    e.preventDefault();
    productModal.close();
    // convertModalToCreate();
    sendProductData()
    .then( () => {getAndShowAllProducts()} )
    .catch (err => console.error(err)) ;    
})


// Випадаючий список для категорій товарів в модалці продуктів
// тобто дані блоки перемальовуються при створенні нової категорії

export const renderProductCategoriesOptions = () =>  {
    
    // Вибираємо select модалкки продуктів i очищуємо його
    const producCategory = document.getElementById('producCategory');
    // console.log('producCategory', producCategory);
    producCategory.innerHTML = ``;
    // Додаємо в нього опцію по замовчуванню 
    // <option disabled selected value> -- select a category -- </option>
    const defaultProductCategoryOption = document.createElement('option');
    defaultProductCategoryOption.setAttribute("disabled", "");
    defaultProductCategoryOption.setAttribute("selected", "");
    defaultProductCategoryOption.setAttribute("value", "");
    defaultProductCategoryOption.innerText = ` -- select a category -- `;
    producCategory.appendChild(defaultProductCategoryOption);
    
    // Вибираємо категорії товарів з LS
    const categoryArr = getCategories();
    
    categoryArr.forEach(category => {
        const categoryOption = document.createElement('option');
        categoryOption.value = category._id;
        categoryOption.innerText = `${category.name}`;
        producCategory.appendChild(categoryOption);
    });
}