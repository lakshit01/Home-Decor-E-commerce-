window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);

    if (user == null) {
        location.replace('login');
    } else if(user.seller) {
        location.replace('/dashboard');
    }
}

let loader = document.querySelector('.loader');
let applyBtn = document.querySelector('.apply-btn');

applyBtn.addEventListener('click', () => {
    let businessName = document.querySelector('#name').value;
    let address = document.querySelector('#address').value;
    let about = document.querySelector('#about').value;
    let mobile = document.querySelector('#number').value;

    if(!businessName.length || !address.length || !about.length || mobile.length < 10 || !Number(mobile)) {
        showFormError('Please fill all information correctly to proceed')
    } else {
        // send data
        loader.style.display = 'block';
        sendData('/seller', {
            name: businessName,
            address: address,
            about: about,
            number: mobile,
            email: JSON.parse(sessionStorage.user).email           
        })
    }
})