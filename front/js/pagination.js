import { attachEventHandler, getPage, getPageCount, setPage } from "./config.js";
import { getAndShowAllProducts } from "./productAPI/products.js";

export const renderPagination = async () => {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = `
        <nav aria-label="Page navigation">
            <ul class="pagination" id="pagination"></ul>
        </nav>`;
    
    const pageCount = getPageCount();
    const currentPage = getPage() || 1 ;
    const ul = document.getElementById('pagination');
    ul.style.display = 'flex';
    ul.innerHTML = `   
        <li class="page-item" id="first-page">
            <span class="page-link" id="paginationFirstBtn" aria-label="First">
                <span aria-hidden="true">&laquo;&laquo;</span>
            </span>
        </li>
        <li class="page-item" id="previous-page">
            <span class="page-link" id="paginationLeftBtn" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </span>
        </li>
        <li class="page-item" id="previous-exist-page" ><span class="page-link" id="paginationPrevBtn">${currentPage-1}</span></li>
        <li class="page-item active"><span class="page-link"  id="current-page">${currentPage}</span></li>
        <li class="page-item" id="next-exist-page"><span class="page-link"  id="paginationNextBtn" >${currentPage+1}</span></li>
        <li class="page-item" id="next-page">
            <span class="page-link"  id="paginationRightBtn" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </span>
        </li>
        <li class="page-item" id="last-page">
            <span class="page-link" id="paginationLastBtn" aria-label="Last">
                <span aria-hidden="true">&raquo;&raquo;</span>
            </span>
        </li>`;
    
    // Attach event handlers to pagination buttons
    attachEventHandler('paginationFirstBtn', 'click', () => { changePage(1) })
    attachEventHandler('paginationLeftBtn', 'click', () => { changePage(currentPage-1) })
    attachEventHandler('paginationPrevBtn', 'click', () => { changePage(currentPage-1) })
    attachEventHandler('paginationNextBtn', 'click', () => { changePage(currentPage+1) })
    attachEventHandler('paginationRightBtn', 'click', () => { changePage(currentPage+1) })
    attachEventHandler('paginationLastBtn', 'click', () => { changePage(pageCount) })
    
    if (currentPage === 1) {
        document.getElementById('previous-page').classList.add('disabled');
        document.getElementById('previous-exist-page').style.display = 'none';
        document.getElementById('first-page').classList.add('disabled');
    }
    if (currentPage === pageCount) {
        document.getElementById('next-page').classList.add('disabled');
        document.getElementById('next-exist-page').style.display = 'none';
        document.getElementById('last-page').classList.add('disabled');
    }
    if ( pageCount === 1 ) {
        ul.style.display = 'none';
    }
}

const changePage = async (page) => {
    // Set the current page number in localStorage
    setPage(page);
    await getAndShowAllProducts();
    document.documentElement.scrollTop = 0;
}

export const hidePagination = () => {
    // Hide the pagination for products
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.style.display = 'none';
}

export const showPagination = () => {
    // Show the pagination for products
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.style.display = 'flex';
}
