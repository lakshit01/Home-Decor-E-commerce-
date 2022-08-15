// navbar

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (scrollY >= 100) {
        navbar.classList.add('bg');
    } else {
        navbar.classList.remove('bg');
    }

    // console.log(scrollY);
})

const createNavbar = () => {
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `
<ul class="links-container">
    <li class="link-item"><a href="index.html" class="link">HOME</a></li>
    <li class="link-item"><a href="products.html" class="link">PRODUCTS</a></li>
    <li class="link-item"><a href="404.html" class="link">ABOUT</a></li>
    <li class="link-item"><a href="404.html" class="link">CONTACT US</a></li>
</ul>
<div class="user-interactions">
    <div class="cart">
        <a href="#"><img src="images/cart(1).jpeg" class="cart-icon" alt=""></a>
        <span class="cart-item-count">00</span>
        <div class="full-cart-page">
        <div class="my-cart">
            <h1 class="cart-heading">My Cart</h1>
            <div class="products">
                
            </div>
        </div>
        <div class="cart-price">
            <h4 class="price-heading">Price Details</h4>
            <div class="products-price">
                <p>Price</p>
                <div>$<span class="product-amount">00</span></div>
            </div>
            <div class="delivery-charges">
                <p>Delivery Charges</p>
                <div>$<span class="delivery-amount">00</span></div>
            </div>
            <div class="total-amount">
                <p>Total Amount</p>
                <div>$<span class="total-payable">00</span></div>
            </div>
            <button class="place-order">Place Order</button>
        </div>
    </div>
    </div>
    <div class="user">
        <a href="#"><img src="images/user.jpeg" class="user-icon" alt=""></a>
        <div class="user-icon-popup">
            <p>Login to your account</p>
            <a>Login</a>
        </div>
    </div>
</div>
`
}

createNavbar();

// login popup

let userIcon = document.querySelector('.user-icon');
let userPopupIcon = document.querySelector('.user-icon-popup');

userIcon.addEventListener('click', () => {
    userPopupIcon.classList.toggle('active');
});

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let user = JSON.parse(sessionStorage.user || null);

if(user != null) {
    text.innerHTML = `Log in as ${user.name}`;
    actionBtn.innerHTML = 'Logout';
    actionBtn.addEventListener('click', () => logout());
} else {
    text.innerHTML = 'Login to your account';
    actionBtn.innerHTML = 'Login'; 
    actionBtn.addEventListener('click', () => signin());
}

const logout = () => {
    sessionStorage.clear();
    location.reload();
}

const signin = () => {
    location.href = '/login';
}

let myCart = document.querySelector('.cart-icon');

let cartPage = document.querySelector('.full-cart-page');

myCart.addEventListener('click', () => {
    cartPage.classList.toggle('cart-show');
})

let addToCart = document.querySelector('.cart-btn');
let cartItem = document.querySelector('.cart-item-count');

let cartItemCount = 0;
let deliveryCharges = 0;
let allProductCharges = 0;
let totalCharges = 0;

let products = document.querySelector('.products');
let deliveryAmount = document.querySelector('.delivery-amount');
let allProductAmount = document.querySelector('.product-amount');
let totalAmount = document.querySelector('.total-payable');

let productImage = document.querySelector('.product-image').src;
let productName = document.querySelector('.product-title').innerHTML;
let productPrice = document.querySelector('.price').innerHTML;
let productAmount = parseInt(productPrice);
// console.log(productAmount)

addToCart.addEventListener('click', () => {
    cartItemCount += 1;
    cartItem.innerHTML = cartItemCount;

    deliveryCharges += 10;
    deliveryAmount.innerHTML = deliveryCharges;

    allProductCharges += productAmount;
    allProductAmount.innerHTML = allProductCharges;

    totalCharges = deliveryCharges + allProductCharges;
    totalAmount.innerHTML = totalCharges;

    let singleProduct = document.createElement('div');
    singleProduct.classList.add('single-product');

    let productImg = document.createElement('img');
    productImg.src = productImage;
    productImg.classList.add('cart-product-img');
    
    let productDetails = document.createElement('div');
    productDetails.classList.add('product-details');

    let productDetailsName = document.createElement('h2');
    productDetailsName.classList.add('cart-product-name');
    productDetailsName.innerHTML = productName;

    let productDetailsPrice = document.createElement('p');
    productDetailsPrice.classList.add('cart-product-price');
    productDetailsPrice.innerHTML = '$' + productPrice;

    let productDetailsRemove = document.createElement('a');
    productDetailsRemove.classList.add('cart-product-remove');
    productDetailsRemove.innerHTML = 'Remove';

    productDetails.appendChild(productDetailsName);
    productDetails.appendChild(productDetailsPrice);
    productDetails.appendChild(productDetailsRemove);

    singleProduct.appendChild(productImg);
    singleProduct.appendChild(productDetails);

    products.appendChild(singleProduct);

    // console.log(products)
});

document.querySelector('.place-order').addEventListener('click', () => {
    location.replace('/order-placed');
})