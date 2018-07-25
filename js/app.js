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
                color[0].selected = true;
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
                color[3].selected = true;
            } else {
                options.style.display = 'none';
            }
        }
        colorDiv.style.display = '';
    } else {
        colorDiv.style.display = 'none';
    }
});

// add total field and value to events
var totalPrice = 0;
const totalText = document.createElement('p');
totalText.id = 'eventTotal';
activities.appendChild(totalText);


// generate new total
const printTotal = () => {
    const newTotal = document.getElementById('eventTotal');
    newTotal.textContent = 'Total: $' + totalPrice;
};

// error message for activities field
const eventErrorMessage = document.createElement('span');
eventErrorMessage.innerText = 'Please select at least one event';
eventErrorMessage.style.color = 'red';
eventErrorMessage.style.display = 'none';
eventErrorMessage.id = 'eventError';
document.querySelector('.activities legend').appendChild(eventErrorMessage);

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
    if(totalPrice === 0){
        eventErrorMessage.style.display = '';
    } else {
        eventErrorMessage.style.display = 'none';
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

// variables for form validation
const name = document.getElementById('name');
const mail = document.getElementById('mail');
const creditNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
var nameValid = false;
var emailValid = false;
var eventsValid = false;
var ccNumValid = false;
var zipValid = false;
var cvvValid = false;

// generates and displays error messages for inpu fields
const displayErrorMessage = (element, name) =>{
    const errorMessage = document.createElement('span');
    errorMessage.innerText = 'Please enter a valid ' + element;
    errorMessage.style.color = 'red';
    errorMessage.style.display = '';
    errorMessage.id = element + 'Error';
    name.parentNode.insertBefore(errorMessage, name);
};
displayErrorMessage('name', name);
displayErrorMessage('email', mail);
displayErrorMessage('card number', creditNum);
displayErrorMessage('zip code', zip);
displayErrorMessage('cvv', cvv);

// check name field
const checkNameField = () => {
    const nameError = document.getElementById('nameError');
    if (name.value.length === 0) {
        name.style.border = 'red solid 2px';
        nameValid = false;
        nameError.style.display = '';
    } else
    if (name.value.length > 0) {
        name.style.border = '';
        nameValid = true;
        nameError.style.display = 'none';
    }
};


// regex for form validation
var emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/;
var cardNumRegEx = /^\d{13,15}$/;
var zipRegEx = /^\d{5}$/;
var cvvRegEx = /^\d{3}$/;

// check email field
const checkEmailField = () => {
    const emailError = document.getElementById('emailError');
    var test = mail.value.length > 0 && emailRegEx.test(mail.value);
    if (!test) {
        mail.style.border = 'red solid 2px';
        emailValid = false;
        emailError.style.display = '';
    } else {
        mail.style.border = '';
        emailValid = true;
        emailError.style.display = 'none';
    }
};

// check events
const checkEvents = () => {
    if (totalPrice === 0) {
        eventsValid = false;
        eventErrorMessage.style.display = '';
    } else {
        eventsValid = true;
        eventErrorMessage.style.display = 'none';
    }
};

// check credit card number
const checkCCNum = () => {
    if (creditCard.selected === true) {
        const creditError = document.getElementById('card numberError');
        var test = creditNum.value.length > 0 && cardNumRegEx.test(creditNum.value);
        if (!test) {
            creditNum.style.border = 'red solid 2px';
            ccNumValid = false;
            creditError.style.display = '';
        } else {
            creditNum.style.border = '';
            ccNumValid = true;
            creditError.style.display = 'none';
        }
    } else {
        ccNumValid = true;
    }
};

// check zipcode
const checkZip = () => {
    if (creditCard.selected === true) {
        const zipError = document.getElementById('zip codeError');
        var test = zip.value.length > 0 && zipRegEx.test(zip.value);
        if (!test) {
            zip.style.border = 'red solid 2px';
            zipValid = false;
            zipError.style.display = '';
        } else {
            zip.style.border = '';
            zipValid = true;
            zipError.style.display = 'none';
        }
    } else {
        zipValid = true;
    }
};

// check cvv
const checkCvv = () => {
    if (creditCard.selected === true) {
        const cvvError = document.getElementById('cvvError');
        var test = cvv.value.length > 0 && cvvRegEx.test(cvv.value);
        if (!test) {
            cvv.style.border = 'red solid 2px';
            cvvValid = false;
            cvvError.style.display = '';
        } else {
            cvv.style.border = '';
            cvvValid = true;
            cvvError.style.display = 'none';
        }
    } else {
        cvvValid = true;
    }
};


// check fields for completion before form submit
document.querySelector('form').addEventListener('submit', (e) => {
    checkNameField();
    checkEmailField();
    checkEvents();
    checkCCNum();
    checkZip();
    checkCvv();
    if (nameValid === false || emailValid === false || eventsValid === false || ccNumValid === false || zipValid === false || cvvValid ===false) {
        e.preventDefault();

    }
});


// real-time field monitoring
name.addEventListener('keyup', () => {
    checkNameField();
});

mail.addEventListener('keyup', () => {
    checkEmailField();
});

creditNum.addEventListener('keyup', () => {
    checkCCNum();
});

zip.addEventListener('keyup', () => {
    checkZip();
});

cvv.addEventListener('keyup', () => {
    checkCvv();
});