const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require ('cookie-parser');
const flash = require('connect-flash');

const { body, validationResult, check, } = require('express-validator');
const methodOverride = require('method-override');


require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;


// Setup Method Override
app.use(methodOverride('_method'));

// Setup EJS
app.set('view engine', 'ejs');
app.use(expressLayouts); 
app.use(express.static('public'));
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



// Halaman Home
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

// Halaman About
app.get('/about', (req, res) => {

    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});

// Halaman COntact
app.get('/contact', async (req, res) => {
    
    // Contact.find().then((contact) => {
    //     res.send(contact);
    // });

    const contacts = await Contact.find();
    
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

// Proses tambah data contact
app.post('/contact',
[
    body('nama').custom(async (value ) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (duplikat) {
            throw new Error('Nama Contact Sudah Terdaftar');
        }
        return true;
    }),
    check('email', 'Email Tidak Valid Kak').isEmail(),
    check('nohp', 'Maaf Nomor HP Tidak Valid ya').isMobilePhone('id-ID'),
],

(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
        res.render('add-contact', {
            title: 'Form Tambah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
        });
      } else {
        Contact.insertMany(req.body, (error, result) => {

            // Kirimkan Flash Message
            req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
            res.redirect('/contact');

        });
      } 
    }
);

// Proses Delete Contact
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({ nama: req.params.nama });

//     // Delete JIka Contact tidak ada
//     if(!contact) {
//         res.status(404);
//         res.send('<h1>404<h1>');

//     } else {
//         Contact.deleteOne({ _id: contact._id }).then((result) => {
//             req.flash('msg', 'Data Contact Berhasil Dihapus!');
//               res.redirect('/contact');

//         });
//     }
// });


app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash('msg', 'Data Contact Berhasil Dihapus!');
    res.redirect('/contact');
        
    });
});

// Halaman ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout : 'layouts/main-layout',
        contact,
    });
});


// Proses Ubah data
app.put('/contact',
[
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({nama : value});
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama Contact Sudah Terdaftar');
        }
        return true;
    }),
    check('email', 'Email Tidak Valid Kak').isEmail(),
    check('nohp', 'Maaf Nomor HP Tidak Valid ya').isMobilePhone('id-ID'),
    
],

(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
        res.render('edit-contact', {
            title: 'Form Ubah Data Contact',
            layout: 'layouts/main-layout',
            errors: errors.array(),
            contact: req.body,
        });
      } else {
       
        Contact.updateOne(
            {_id: req.body._id},
            {
                $set : {
                    nama: req.body.nama,
                    email: req.body.email,
                    nohp: req.body.nohp,
                },
            
            }).then((result) => {
                // Kirimkan Flash Message
                req.flash('msg', 'Data Contact Berhasil Diubah!');
                res.redirect('/contact');
                
            });
      } 
    }
);

// Halaman Detail COntact
app.get('/contact/:nama', async (req, res) => {

    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('detail',{
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layout',
        contact,
    });
});




app.listen(port, () => {
    console.log(`Mongo Contact APP | Listening att http://localhost:${port}`);
});
