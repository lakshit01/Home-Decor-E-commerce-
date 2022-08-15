const sendData = (path, data) => {
    // console.log(data);
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => processData(data));
}

const processData = (data) => {
    // console.log(data); 
    loader.style.display = 'none';
    if(data.alert) {
        showFormError(data.alert);
    } else if(data.name) {
        sessionStorage.user = JSON.stringify(data);
        location.replace('/')
    } else if (data.seller) {
        let user = JSON.parse(sessionStorage.user);
        user.seller = true;
        sessionStorage.user = JSON.stringify(user);
        location.replace('/dashboard');
    }
}

const showFormError = (err) => {
    let errorFile = document.querySelector('.error');
    errorFile.innerHTML = err;
    errorFile.classList.add('show');
}