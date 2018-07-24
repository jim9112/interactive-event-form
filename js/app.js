/*jshint esversion: 6 */

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
    if (e.target.value === 'other') {
        other.style.display = '';
    } else {
        other.style.display = 'none';
    }
});
// set all color displays to none
for (let i = 0; i < colors.length; i++) {
    let options = color[i];
    options.style.display = 'none';
}
//  hide color choice selector
colorDiv.style.display = 'none';

// adjusts shirt color options based on style selection
design.addEventListener('change', (e) => {
    if (e.target.value === 'js puns') {
        const colors = document.getElementById('color').children;
        for (let i = 0; i < colors.length; i++) {
            let options = color[i];
            if (options.textContent.endsWith('(JS Puns shirt only)')) {
                options.style.display = '';
            } else {
                options.style.display = 'none';
            }
        }
        colorDiv.style.display = '';
    } else if (e.target.value === 'heart js') {
        const colors = document.getElementById('color').children;
        for (let i = 0; i < colors.length; i++) {
            let options = color[i];
            if (options.textContent.endsWith('JS shirt only)')) {
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
        if (label.textContent.includes('Tuesday 9am-12pm')) {
            for (let i = 0; i < activityLabels.length; i++) {
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 9am-12pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = true;
                }
            }
        } else if (label.textContent.includes('Tuesday 1pm-4pm')) {
            for (let i = 0; i < activityLabels.length; i++) {
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
        if (label.textContent.includes('Tuesday 9am-12pm')) {
            for (let i = 0; i < activityLabels.length; i++) {
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 9am-12pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = false;
                }
            }
        } else if (label.textContent.includes('Tuesday 1pm-4pm')) {
            for (let i = 0; i < activityLabels.length; i++) {
                const activityCheck = activityLabels[i];
                if (activityCheck.textContent.includes('Tuesday 1pm-4pm') && activityCheck.firstChild.checked != true) {
                    activityCheck.firstChild.disabled = false;
                }
            }
        }
    };


    // adjust the totals for event costs
    if (selection.checked === true) {
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
    } else if (selection.checked != true) {
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
const creditCard = paymentOptions.querySelector('option[value="credit card"]');
creditCard.selected = true;
paymentOptions.addEventListener('change', (e) => {
    if (e.target.value === 'credit card') {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        credit.style.display = '';
    } else if (e.target.value === 'paypal') {
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        credit.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        credit.style.display = 'none';
    }
});

// const nameErrorMessage = () => {
//     const name = document.getElementById('name');
//     const errorMessage = document.createElement('div');
//     errorMessage.innerText = 'Please provide a name';
//     errorMessage.id = 'nameError';
//     errorMessage.style.color = 'red';
// };


var formFinished = true;

const checkNameField = (e) => {
    const name = document.getElementById('name');
    if (name.value.length === 0) {
        formFinished = false;
        name.style.border = 'red solid 2px';
        e.preventDefault();
    } else
    if (name.value.length > 0) {
        name.style.border = '';
    }
};


// regex for form validation
var emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var cardNumRegEx = /^\d{13,15}$/;
var zipRegEx = /^\d{5}$/;
var cvvRegEx = /^\d{3}$/;

const checkEmailField = (e) => {
    const mail = document.getElementById('mail');
    var test = mail.value.length > 0 || emailRegEx.test(mail.value);
    if (!test) {
        mail.style.border = 'red solid 2px';
        e.preventDefault();
    }
};
const checkEvents = (e) => {
    if (totalPrice === 0) {
        e.preventDefault();
    }
};

const checkCCNum = (e) => {
    const creditNum = document.getElementById('cc-num');
    if (creditCard.selected === true) {
        console.log(cardNumRegEx);
        var test = creditNum.value.length > 0 && cardNumRegEx.test(creditNum.value);
        if (!test) {
            creditNum.style.border = 'red solid 2px';
            e.preventDefault();
        } else {
            creditNum.style.border = '';
        }
    }
};

const checkZip = (e) => {
    const zip = document.getElementById('zip');
    if (creditCard.selected === true) {
        console.log(cardNumRegEx);
        var test = zip.value.length > 0 && zipRegEx.test(zip.value);
        if (!test) {
            zip.style.border = 'red solid 2px';
            e.preventDefault();
        } else {
            zip.style.border = '';
        }
    }
};

const checkCvv = (e) => {
    const cvv = document.getElementById('cvv');
    if (creditCard.selected === true) {
        var test = cvv.value.length > 0 && cvvRegEx.test(cvv.value);
        if (!test) {
            cvv.style.border = 'red solid 2px';
            e.preventDefault();
        } else {
            cvv.style.border = '';
        }
    }
};


// check fields before form submit
document.querySelector('form').addEventListener('submit', (e) => {
    checkNameField(e);
    checkEmailField(e);
    checkEvents(e);
    checkCCNum(e);
    checkZip(e);
    checkCvv(e);
});