//global variables

const updateQtyButtons =  document.querySelectorAll('.item-subcontainer > .update-qty-div > button');
const backToSelectionsButton = document.querySelector('#back-to-cart');
const mainSelectionsContainer = document.querySelector('#main-selections-container');
const mainShoppingCartContainer = document.querySelector('#main-shopping-cart-container');
const shoppingCartContainer = document.querySelector('#shopping-cart-container');
const titles = document.querySelectorAll('.merch-container h2');
const prices = document.querySelectorAll('.price');
const subtotal = document.getElementById('subtotal');
const taxes = document.getElementById('taxes');
const total = document.getElementById('total');
let subtotalArray = [];
let cartDeleteMessage = document.getElementById('all-cart-deleted');
let orderSummaryContainer = document.getElementById('order-summary-container');



let cartObject = {
    subtotal_array: [],

    items: [],

    calculateCart(){
        this.subtotal_array = [];
        this.items.forEach(item => {
            let makeQtyANumber = parseInt(item.select_Qty);
            let makePriceANumber = parseInt(item.price);
            let subtotalPerItem = makePriceANumber * makeQtyANumber;
            this.subtotal_array.push(subtotalPerItem);
            let sub = 0;
            let tax = 0;
            let cartTotal = 0;
            this.subtotal_array.forEach(number => {
                sub = sub + number;
            })
            tax = sub * .06;
            let roundedTax = Math.round(tax * 100) / 100;
            cartTotal = sub + roundedTax;
            let subToString = sub.toString();
            let taxToString = roundedTax.toString();
            let CartTotalToString = cartTotal.toString();
            subtotal.innerHTML = `Subtotal - $${subToString}`;
            taxes.innerHTML = `Taxes - $${taxToString}`;
            total.innerHTML = `Total - $${CartTotalToString}`;
        })
        
    }
}


//sets the items in the cart


buttons.forEach((button, index) => {

    button.addEventListener('click', () => {
    
            cartEffect(index); //defined in MerchPage.js//
            setTimeout(adjustCartAmount, 2000);
        

        const cartItemContainer = document.createElement('div');
        cartItemContainer.classList.add('cart-item-container');
        shoppingCartContainer.appendChild(cartItemContainer);

        let object = {}

        let grabTitleForCart = titles[index];
        let copyTitleForCart = grabTitleForCart.cloneNode();
        copyTitleForCart.innerHTML = titles[index].innerHTML;
        copyTitleForCart.classList.add('title');
        cartItemContainer.appendChild(copyTitleForCart);
        object.index = index;
        object.title = copyTitleForCart.innerHTML;

        const cartSubcontainer = document.createElement('div');
        cartSubcontainer.classList.add('item-subcontainer');
        cartItemContainer.appendChild(cartSubcontainer);
        
        let grabImageForCart = images[index];
        let copyImageForCart = grabImageForCart.cloneNode();    
        copyImageForCart.classList.add('subcontainer-image');
        cartSubcontainer.appendChild(copyImageForCart);

        const updateQtyDiv = document.createElement('div');
        updateQtyDiv.classList.add('update-qty-div');
        cartSubcontainer.appendChild(updateQtyDiv);

        const selectElement = document.createElement('select');
        selectElement.classList.add('select-element');
        updateQtyDiv.appendChild(selectElement);
        

        for(let i = 0; i < 11; i++){
            let opt = document.createElement('option');
            opt.classList.add('option');
            if(i < 10){
                opt.innerHTML = i;
                opt.value = i;

            }else{
                opt.innerHTML = '10+';
                opt.value = '10+';
            }
            selectElement.appendChild(opt);
        }


        const newInput = document.createElement('input');
        const updateBtn = document.createElement('button');
        let currentSelectionsQty = selectionQtys[index].value;

        //controls behavior in cart if 10+ is selected on merchpage
        if(currentSelectionsQty != '10+'){
            selectElement.value = currentSelectionsQty;
            object.select_Qty =  selectElement.value;
        }else{
            selectElement.remove()
            newInput.classList.add('new-input')
            newInput.setAttribute('placeholder', 'qty')
                window.setTimeout(() => {
                        newInput.style.width = '50px';
                    },600)
                updateQtyDiv.appendChild(newInput)
                newInput.value = newQtyVal;
                object.select_Qty = newInput.value;
                updateBtn.classList.add('update-qty-button');
                updateBtn.classList.add('update-qty-button:hover');
                updateBtn.innerHTML = 'Update';
                updateQtyDiv.appendChild(updateBtn);
                updateBtn.addEventListener('click', () => {
                    cartObject.items.forEach(item => {
                        if(item.index === index){
                            item.select_Qty = newInput.value;
                            cartObject.calculateCart();
                            adjustCartAmount();
                        }
                    })  
                    })
                }
    
        selectElement.addEventListener('change', e => {
            borderAnimation();
            let numberOptions = e.target.options;
            let ind = e.target.selectedIndex;
            let chosenNumber = numberOptions[ind].value;
             selectionQtys[index].value = chosenNumber;
            
            if(chosenNumber === '10+'){
                e.target.remove();
                newInput.classList.add('new-input')
                window.setTimeout(() => {
                        newInput.style.width = '50px';
                    },600)
                newInput.setAttribute('placeholder', 'qty');
                updateQtyDiv.appendChild(newInput)
                updateBtn.classList.add('update-qty-button');
                updateBtn.classList.add('update-qty-button:hover');
                updateBtn.innerHTML = 'Update';
                updateQtyDiv.appendChild(updateBtn);
                updateBtn.addEventListener('click', () => {
                    borderAnimation();
                    cartObject.items.forEach(item => {
                        if(item.index === index){
                            item.select_Qty = newInput.value;
                            cartObject.calculateCart();
                            adjustCartAmount();
                        }
                    })
                })
                }else{
                    cartObject.items.forEach(item => {
                        if(item.index === index){
                            item.select_Qty = chosenNumber
                            cartObject.calculateCart();
                            adjustCartAmount();
                        }
                    })
                   
                } 
            })

        const grabPrice = prices[index]
        const copyPriceForCart = grabPrice.cloneNode();
        copyPriceForCart.innerHTML = `price ${grabPrice.innerHTML}`;
        copyPriceForCart.classList.add('prices');
        cartSubcontainer.appendChild(copyPriceForCart);
        object.price = copyPriceForCart.innerHTML.replace('price ', '');

      
      
 //iife calculates cart numbers every time an item is added
(function(){
    let makePriceANumber = parseInt(grabPrice.innerHTML);
    let makeQtyANumber
    if(currentSelectionsQty != '10+'){
        makeQtyANumber = parseInt(currentSelectionsQty);
    }else if(newQtyVal === ''){
        alert('please enter a qty')
} else{
        makeQtyANumber = parseInt(newQtyVal);
    }
    let subtotalPerItem = makePriceANumber * makeQtyANumber;
    subtotalArray.push(subtotalPerItem);
    let sub = 0;
    let tax = 0;
    let cartTotal = 0;
    subtotalArray.forEach(number => {
        sub = sub + number;
    })
    tax = sub * .06;
    let roundedTax = Math.round(tax * 100) / 100;
    cartTotal = sub + roundedTax;
    let subToString = sub.toString();
    let taxToString = roundedTax.toString();
    let cartTotalToString = cartTotal.toString();
    subtotal.innerHTML = `Subtotal - $${subToString}`;
    taxes.innerHTML = `Taxes - $${taxToString}`;
    total.innerHTML = `Total - $${cartTotalToString}`;
})()
    

        const deleteOption = document.createElement('p');
        deleteOption.innerHTML = 'delete'
        deleteOption.classList.add('delete-from-cart');
        deleteOption.classList.add('delete-from-cart:hover');
        cartSubcontainer.appendChild(deleteOption);
        deleteOption.addEventListener('click', () => {
            shoppingCartContainer.removeChild(cartItemContainer);

            cartObject.items.forEach((item, ind) => {
                if(item.index === index){
                    cartObject.items.splice(ind, 1);
                    if(cartObject.items.length === 0){
                        orderSummaryContainer.style.display = 'none';
                        cartDeleteMessage.style.display = 'block';
                        subtotal.innerHTML = `Subtotal - $0`;
                        taxes.innerHTML = `Taxes - $0`;
                        total.innerHTML = `Total - $0`
                        return
                    }
                    }
            })
        cartObject.calculateCart();
        adjustCartAmount();
        })
        cartObject.items.push(object);
         //moves newly created object to items array in global cartObject.

        button.remove();
        const updateButton = document.createElement('button');
        updateButton.classList.add('update-button');
        updateButton.classList.add()
        updateButton.innerHTML = 'Update';
        itemContainers[index].insertBefore(updateButton, itemContainers[index].childNodes[2]);
        updateButton.addEventListener('click', () => {
            qtyBorderAnimation(index);
            if(selectionQtys[index].value === '10+'){
                cartObject.items.forEach(item => {
                    if(item.index === index){
                        item.select_Qty = newQtyVal;
                        newInput.value = newQtyVal;
                        newInput.classList.add('new-input')
                        selectElement.remove();
                        cartSubcontainer.insertBefore(newInput, cartSubcontainer.childNodes[2])
                        setTimeout(() => {
                            newInput.style.width = '50px'
                        }, 200)
                        updateBtn.innerHTML = 'Update';
                        updateBtn.classList.add('update-qty-button');
                        updateBtn.classList.add('update-qty-button:hover');
                        cartSubcontainer.insertBefore(updateBtn, cartSubcontainer.childNodes[3])
                        updateBtn.addEventListener('click', () => {
                            borderAnimation();
                            cartObject.items.forEach(item => {
                                if (item.index === index){
                                    item.select_Qty = newInput.value;
                                    cartObject.calculateCart(); 
                                    adjustCartAmount();
                                }
                            })
                        })
                        }})
                
            }else{
                cartObject.items.forEach(item => {
                    if(item.index === index){
                        item.select_Qty = selectionQtys[index].value;
                        selectElement.value = selectionQtys[index].value;
                    }
                })
            }
            cartObject.calculateCart();
            adjustCartAmount();
            })
            
        })

})
//end of cart and main object creation function



//takes user back to selections from cart
backToSelectionsButton.addEventListener('click', () => {
    if(cartDeleteMessage.style.display === 'block'){
        cartDeleteMessage.style.display = 'none';
        orderSummaryContainer.style.display = 'block';
        location.reload();
    }
    mainSelectionsContainer.style.display = 'block';
    mainShoppingCartContainer.style.display = 'none';
})

//controls cartQty appearing on the selections page cart image

function adjustCartAmount(){
    
    let totalQty = 0
    cartObject.items.forEach(item => {
        let makeQtyANumber = parseInt(item.select_Qty);
        totalQty = totalQty + makeQtyANumber;
    })
    let makeQtyAString = totalQty.toString();
    cartCountDisplay.innerHTML = makeQtyAString;
    if(makeQtyAString === '0'){cartItemCounter.style.opacity = '0';
    }else{
        cartItemCounter.style.opacity = '1';
    }
    
}

//controls entry into cart and already in cart message

cartImage.addEventListener('click', () => {
    if(cartObject.items.length === 0) {
        emptyCartMessage.style.transform = 'translateY(0)';
            setTimeout(() => {
                emptyCartMessage.style.transform = 'translateY(-300px)'
            },4000)
        }else{
            mainSelectionsContainer.style.display = 'none';
            mainShoppingCartContainer.style.display = 'block';
        }
    })


//controls behavior of 10+ in merchpage and stores value of qty input for use in updateButton event listener.
let newQtyVal;
let newMerchQtyInput;
selectionQtys.forEach((select,index) => {
    select.addEventListener('change', () => {
        let currentQty = selectionQtys[index].value;
        if(currentQty < 10){
            selectionQtys[index].value = currentQty;
        }else{
            newMerchQtyInput = document.createElement('input');
            selectionQtys[index].remove()
                newMerchQtyInput.setAttribute('placeholder', 'qty');
                newMerchQtyInput.classList.add('new-selection-input');
                window.setTimeout(() => {
                        newMerchQtyInput.style.width = '50px';
                    },600)
                itemContainers[index].appendChild(newMerchQtyInput)
                newMerchQtyInput.addEventListener('mouseleave', e => {
                    e.stopPropagation();
                    newQtyVal = newMerchQtyInput.value;
                })
        }
    })
})




