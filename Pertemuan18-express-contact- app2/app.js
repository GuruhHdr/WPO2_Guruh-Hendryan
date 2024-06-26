const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact,  cekDuplikat} = require('./utils/contacts');
const { body, validationResult, check, } = require('express-validator');
const session = require('express-session');
const cookieParser = require ('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000


app.set('view engine', 'ejs');
app.use(expressLayouts); // Third party middleware
app.use(express.static('public')); // Built-in Middleware
app.use(express.urlencoded({extended: true}));

// KOnfigurasi Flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })

);
app.use(flash());



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
        msg: req.flash('msg'),
    });
});

// Halaman Form Tambah data contact
app.get('/contact/add', (req, res) => {

    res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout : 'layouts/main-layout',
    });
});

// Proses data contact
app.post('/contact',
[
    body('nama').custom((value ) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama Contact Sudah Terdaftar');
        }
        return true;
    }),
    check('email', 'Email Tidak Valid Kak').isEmail(),
    check('nohp', 'Maaf Nomor HP Tidak Valid ya').isMobilePhone('id-ID'),
    // body('email').isEmail(),

],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
      } else {

          addContact(req.body);
            // Kirimkan Flash Message
          req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
          res.redirect('/contact');
          
      }
      
    
});

// Halaman Detail COntact
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



























