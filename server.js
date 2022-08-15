import express from "express";
import bcrypt from "bcrypt";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuzT5H2Byf68X5fd3KC35NtAuUwTGSgZM",
  authDomain: "home-decor-e-commerce.firebaseapp.com",
  projectId: "home-decor-e-commerce",
  storageBucket: "home-decor-e-commerce.appspot.com",
  messagingSenderId: "1001275504156",
  appId: "1:1001275504156:web:82b970ef292bc5871bd1d9",
  measurementId: "G-S1G2SM86MY"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
const db = getFirestore();

// making server
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json()); // enables form sharing

// route to pages
// home
app.get('/', (req, res) => {
    res.sendFile('index.html', {root : "public"});
});

// signup
app.get('/signup', (req, res) => {
    res.sendFile('signup.html', {root : "public"});
});

app.post('/signup', (req, res) => {
    const { name, email, password, number, tc} = req.body;

    //form validations
    if(name.length < 3) {
        res.json({ 'alert': 'Name must be 3 letters long.'});
    } else if(!email.length) {
        res.json({ 'alert': 'Enter your email'});
    } else if(password.length < 8) {
        res.json({ 'alert': 'Password must be 8 letters long'});
    } else if(!Number(number) || number.length < 10) {
        res.json({ 'alert': 'Please enter correct phone number'});
    } else if(!tc) {
        res.json({ 'alert': 'You must agree to our terms and condition'})
    } else {
        // store the data in db
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()) {
                return res.json({ 'alert': 'email already registered'})
            } else{
                // encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
      
                            })
                        })
                    })
                })
            }
        })
    }
});

// login
app.get('/login', (req, res) => {
    res.sendFile('login.html', { root : "public"});
})

app.post('/login', (req, res) => {
    let { email, password} = req.body;

    if(!email.length || !password.length) {
        res.json({ 'alert' : 'Please fill details to login'});
    }

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()) {
            return res.json({'alert': 'email does not exits'})
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else {
                    return res.json({'alert' : 'password does not match'});
                }
            })
        }
    })

});

// seller

app.get('/seller', (req, res) => {
    res.sendFile('seller.html', {root : "public"});
})

app.post('/seller', (req, res) => {
    let { name, address, about, number, email} = req.body;

    if(!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
       return res.json({ 'alert' : 'Please fill all information correctly to proceed'})
    } else {
        // update the seller status
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers, email), req.body)
        .then(data => {
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json({ 'seller': true })
            })
        })
    }
});

// dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile('dashboard.html', { root : "public"});
});

// add product
app.get('/add-product', (req, res) => {
    res.sendFile('add-product.html', { root : "public"});
});

// place order
app.get('/order-placed', (req, res) => {
    res.sendFile('order.html', {root : "public"});
}); 

//404
app.get('/404', (req, res) => {
    res.sendFile('404.html', {root : "public"});
});

app.use((req,res) => {
    res.redirect('/404');
})

app.listen(8000, () => {
    console.log('listening to port no 8000');
});