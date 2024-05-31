const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 3000

// Gunakan EJS
app.set('view engine', 'ejs');

// Third-party middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// BUilt-in Middleware 
app.use(express.static('public'));

// Application Middleware
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Guruh Hendryan',
            email: 'Guruhhendryan@gmail.com',
        },
        {
            nama: 'Bunoko Andilaw',
            email: 'Bunandilaw@gmail.com',
        },
        {
            nama: 'Slamet Wiluyo',
            email: 'Wiluyoslamet@gmail.com',
        },
    ];
    res.render('index', { 
        nama: 'Guruh Hendryan', 
        title: 'Halaman Home',
        mahasiswa,
        layout: 'layouts/main-layout',
    });
});


app.get('/about', (req, res) => {

    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});


app.get('/contact', (req, res) => {

    res.render('contact',{
        layout: 'layouts/main-layout',
        title: 'Halaman contact',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : 
    ${req.query.category}`);
});


app.use((req,res) => {
    res.status(404);
    res.send('<h1>404<h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



























