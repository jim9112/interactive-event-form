// set focus in name field
document.getElementById('name').focus();

// global vars
const userTitle = document.getElementById('title');
const other = document.getElementById('other-title');
const otherText = document.createElement('input');
const design = document.getElementById('design');
const colors = document.getElementById('color').children;
const colorDiv = document.getElementById('color').parentElement;
const activities = document.querySelector('.activities').children;
const paymentOptions = document.getElementById('payment');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const credit = document.getElementById('credit-card');


// hides other text input box
other.style.display = 'none';

// shows text input for "other" field when selected
userTitle.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        other.style.display = '';
    } else {
        other.style.display = 'none';
    } 
});
// set all color displays to none
for (let i = 0; i < colors.length; i++ ){
    let options = color[i];
    options.style.display = 'none';
}
//  hide color choice selector
colorDiv.style.display = 'none';

// adjusts shirt color options based on style selection
design.addEventListener('change', (e) => {
    if(e.target.value === 'js puns'){
        const colors = document.getElementById('color').children;
        for(let i = 0; i < colors.length; i++){
            let options = color[i];
            if(options.textContent.endsWith('(JS Puns shirt only)')){
                options.style.display = '';
            } else {
                options.style.display = 'none';
            }
        }
        colorDiv.style.display = '';
    } else if(e.target.value === 'heart js'){
        const colors = document.getElementById('color').children;
        for(let i = 0; i < colors.length; i++){
            let options = color[i];
            if(options.textContent.endsWith('JS shirt only)')){
                options.style.display = '';
            } else {
                options.style.display = 'none';
            }
        }
        colorDiv.style.display = '';
    }
});

// hide all payment options until one is selected
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// event listener for payment options and only display selected payment option
paymentOptions.addEventListener('change', (e) => {
    if(e.target.value === 'credit card'){
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        credit.style.display = '';
    } else if(e.target.value === 'paypal'){
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        credit.style.display = 'none';
    } else if(e.target.value === 'bitcoin'){
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        credit.style.display = 'none';
    }
});