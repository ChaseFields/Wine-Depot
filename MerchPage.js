//global variables

const images = document.querySelectorAll('.item-img')
const buttons = document.querySelectorAll('button');
const cartItemCounter = document.querySelector('.cart-item-counter');
let cartCountDisplay = document.getElementById('cart-item-count');
const emptyCartMessage = document.querySelector('#empty-cart-message')
const cartImage = document.getElementById('cart');
const selectionQtys = document.querySelectorAll('.select-element');
const itemContainers = document.querySelectorAll('.item-container');
const items = document.querySelectorAll('.item');
const itemDivs = document.querySelectorAll('.merch-container > div')

//controls border animation around summary when cart updates

function borderAnimation(){
    const summaryContainer =  document.querySelector('#order-summary-container');
    summaryContainer.style.animation = 'borderAnimation .7s linear'
    setTimeout(() => {
        summaryContainer.style.animation = 'none'
    }, 2000)
}

function qtyBorderAnimation(index){
    selectionQtys[index].style.animation = 'qtyborderAnimation .6s linear';
    setTimeout(() => {
        selectionQtys[index].style.animation = 'none'
    }, 2000)

}
//handles cart effect

function cartEffect(index){
    let clonedImage;
    let header = document.getElementById('header');
    let cart = document.getElementById('cart');
    clonedImage = images[index].cloneNode();
    clonedImage.classList.add('zoom');
    cart.classList.add('shake');
    header.insertBefore(clonedImage, header.childNodes[1]);
    setTimeout(function(){
                clonedImage.remove();
            }, 2000);
    setTimeout(() => {
                cart.classList.remove('shake');
            },3000)
        }
            


    



