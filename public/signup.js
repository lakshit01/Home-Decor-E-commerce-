window.onload = () => {
    if(sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}

let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () => {
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let number = document.querySelector('#number') || null;
    let tc = document.querySelector('#tc') || null;

    if(fullname != null) { // sign up
        // form validation
        if(fullname.value.length < 3) {
            showFormError('Name must be 3 letters long.');
        } else if(!email.value.length) {
            showFormError('Enter your email');
        } else if(password.value.length < 8) {
            showFormError('Password must be 8 letters long');
        } else if(Number(number) || number.value.length < 10) {
            showFormError('Please enter correct phone number');
        } else if(!tc.checked) {
            showFormError('You must agree to our terms and condition')
        } else {
            // submit form
            loader.style.display = 'block';
            sendData('/signup', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tc: tc.checked,
            })
        }         
    } else { // login
        if(!email.value.length || !password.value.length) {
            showFormError('Please fill details to login')
        } else {
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })
        }
    }
})