//global variables
const payButton = document.getElementById('pay-button');
const cardInput = document.getElementById('card-input')
const paymentForm = document.getElementById('payment-form');

//tests for correct credit card format

function cardError(){
    cardInput.value = 'invalid card number format'
    cardInput.style.color = 'red';
    cardInput.style.fontSize = '15px';
    setTimeout(() => {
        cardInput.style.cssText = "color: rgb(230,220,215); fontSize: 20px";
        cardInput.value = '';
    }, 7000)
}

function cardNumberValidation(cardNumber){
        let sum = 0, validCard = false;
        let singleNum = [], doubleNum = [], finalArray = undefined;
        if((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(cardNumber)) || (cardNumber.length > 16)){
            cardError();
        }
}




//object containing everything needed to set the current dates on the card expiration fields.
const forDates = {

    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',

    setDates(){
        const expMonth = document.getElementById('month-selection');
        const expYear = document.getElementById('year-selection');
        const d = new Date();
        const currentYear = d.getFullYear();
        const makeYearString = currentYear.toString();
        expYear.value = makeYearString;
        const currentMonth = d.getMonth();
        let makeMonthString = currentMonth.toString();
        for(let number in forDates){
            if(number === makeMonthString){
                expMonth.value = forDates[number];
                }
            }
        }
}


//event listener that calls validation function upon click
payButton.addEventListener('click', () => {
    cardNumberValidation(cardInput.value);
})


//submits payment form data to a server (there currently is no backend for this project).
paymentForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    fetch('path_to_server', {
        method: 'post',
        body: formData
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
    }).catch(error => {
        console.error(error)
    })

})


window.onload = forDates.setDates() 