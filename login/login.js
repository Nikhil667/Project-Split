const menu = document.querySelector('.nav--menu')
const close = document.querySelector('.nav--close')
const nav = document.querySelector('nav')

menu.addEventListener('click', () => {
    nav.classList.add('open--nav')
})

close.addEventListener('click', () => {
    nav.classList.remove('open--nav')
})


const usernameEl = document.querySelector('#username'); 
const numberEl = document.querySelector('#number'); 

const form = document.querySelector('#signup');

form.addEventListener('submit', function(e){

    e.preventDefault();

    // validate fields
    let isUserNameValid = checkUsername(),
    isNumberValid = checkNumber();

    const validation =  isUserNameValid && isNumberValid;

    // submit to the server if the form is valid
    if(validation){
        console.log("Logged In Successfully")
        window.alert("Payment Successful \nYour order is on the way");
    }
})


//  Before validating the form, you can develop some reusable  utility functions to check if:
//  A field is required.
//      The length of a field is between min and max.
//      The email is in a valid format.
//      The password is strong.

// return true if input is empty
const isBlank = value => value === '' ? true : false;

//return false if length argument is not between min and max
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isNumber= (length) => length == 10 ? true : false;


const showError = (input, message) => {

    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input) => {

    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = "";
}


const checkUsername = () => {
    
    let valid = false;
    let min = 3, max = 25;
    const username = usernameEl.value.trim();

    if(isBlank(username)){
        showError(usernameEl, "Input cannot be blank")
    } else if(!isBetween(username.length, min, max)){
        showError(usernameEl,  `Input should be in between ${min} and ${max}`)
    } else{
        showSuccess(usernameEl)
        valid = true;
    }
    return valid;
}

const checkNumber = () => {
    
    let valid = false;
    const number = numberEl.value.trim();

    if(isBlank(number)){
        showError(numberEl, "Input cannot be blank")
    } else if(!isNumber(number.length)){
        showError(numberEl, "Number  is not valid")
    } else{
        showSuccess(numberEl)
        valid = true;
    }
    return valid;
}

const debounce = (fn, delay = 500) => {
    
    let timeOut;
    return (...args) => {

        // cancel the previous timer
        if (timeOut) {
            clearTimeout(timeOut);
        }

        // setup a new timer
        timeOut = setTimeout(() => {
            fn.apply(null, args)
            console.log(args);
        })

    }
}

form.addEventListener('input', debounce(function(e){
    switch(e.target.id){
        case 'username' : checkUsername();
                            break;
        case 'email' : checkEmail();
                            break;
        case 'password' : checkPassword();
                            break;                    
        case 'confirm-password' : checkConfirmPassword();
                            break; 
    }
}));

