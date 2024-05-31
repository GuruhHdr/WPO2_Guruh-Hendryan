const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');
const app = express();
const port = 3000


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));


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
    console.log('ini halaman home');
});


app.get('/about', (req, res) => {

    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});

// Contact tanpa params
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact',{
        title: 'Halaman contact',
        layout: 'layouts/main-layout',
        contacts,
    });
});

// Contact Ada Params
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail',{
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});

app.use((req,res) => {
    res.status(404);
    res.send('<h1>404<h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



























