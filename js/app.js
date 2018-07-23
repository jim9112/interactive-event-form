// set focus in name field
document.getElementById('name').focus();

// global vars
const userTitle = document.getElementById('title');
const other = document.getElementById('other-title');
const otherText = document.createElement('input');
const design = document.getElementById('design');
const colors = document.getElementById('color').children;
const colorDiv = document.getElementById('color').parentElement;
const activities = document.querySelector('.activities');
const paymentOptions = document.getElementById('payment');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const credit = document.getElementById('credit-card');
const individualActivities = document.querySelectorAll('.activities label input');

console.log(individualActivities);
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

var totalPrice = 0;
const totalText = document.createElement('p');
totalText.id = 'eventTotal';
activities.appendChild(totalText);

const printTotal = () => {
    const newTotal = document.getElementById('eventTotal');
    newTotal.textContent = 'Total: $' + totalPrice;
};

// event listener for the event selection menu
activities.addEventListener('change', (e) => {
    // const checked = e.target.checked = true;
    const selection = e.target;
    const label = selection.parentElement;

     // disable events of the same time slot
    const disableWhenChecked = () => {
        const activityLabels = document.querySelectorAll('.activities label');
        if (label.textContent.includes('Tuesday 9am-12pm')){
            for(let i = 0; i < activityLabels.length; i++){
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 9am-12pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = true;
                }
            }
        } else if (label.textContent.includes('Tuesday 1pm-4pm')){
            for(let i = 0; i < activityLabels.length; i++){
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 1pm-4pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = true;
                }
            }
        }
    };

    // enable fields when unchecked
    const enableWhenUnchecked = () => {
        const activityLabels = document.querySelectorAll('.activities label');
        if (label.textContent.includes('Tuesday 9am-12pm')){
            for(let i = 0; i < activityLabels.length; i++){
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 9am-12pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = false;
                }
            }
        } else if (label.textContent.includes('Tuesday 1pm-4pm')){
            for(let i = 0; i < activityLabels.length; i++){
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 1pm-4pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = false;
                }
            }
        }
    };


    // adjust the totals for event costs
    if (selection.checked === true){
        console.log(label.textContent);
        if (label.textContent.includes("200")) {
            totalPrice += 200;
            printTotal();
            disableWhenChecked();
        } else if (label.textContent.includes("100")) {
            totalPrice += 100;
            printTotal();
            disableWhenChecked();
        }
    } else if (selection.checked != true){
        console.log(label.textContent);
        if (label.textContent.includes("200")) {
            totalPrice -= 200;
            printTotal();
            enableWhenUnchecked();
        } else if (label.textContent.includes("100")) {
            totalPrice -= 100;
            printTotal();
            enableWhenUnchecked();
        }
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