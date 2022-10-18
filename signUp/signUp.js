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
const mailEl = document.querySelector('#email'); 
const passwordEl = document.querySelector('#password'); 
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

form.addEventListener('submit', function(e){

    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUserNameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(), 
    isConfirmPasswordValid = checkConfirmPassword();

    const validation =  isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    // submit to the server if the form is valid
    if(validation){
        console.log("Form Submitted")
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

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

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

const checkEmail = () => {
    
    let valid = false;
    const email = mailEl.value.trim();

    if(isBlank(email)){
        showError(mailEl, "Input cannot be blank")
    } else if(isEmailValid(email)){
        showError(mailEl, "E-mail is not valid")
    } else{
        showSuccess(mailEl)
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    
    let valid = false;
    const password = passwordEl.value.trim();

    if(isBlank(password)){
        showError(passwordEl, "Input cannot be blank")
    } else if(isPasswordSecure(password)){
        showError(passwordEl,  "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)")
    } else{
        showSuccess(passwordEl)
        valid = true;
    }
    return valid;
}

const checkConfirmPassword = () => {
    
    let valid = false;
    const password = passwordEl.value.trim();
    const confirmPassword = confirmPasswordEl.value.trim();

    if(isBlank(confirmPassword)){
        showError(confirmPasswordEl, "Please enter the password again")
    } else if(password != confirmPassword){
        showError(confirmPasswordEl,  "Password does not match")
    } else{
        showSuccess(confirmPasswordEl)
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

