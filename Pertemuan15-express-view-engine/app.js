const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);



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


app.use('/', (req,res) => {
    res.status(404);
    res.send('<h1>404<h1>');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});




























// const http = require('http');
// const port = 3000;
// const fs = require('fs');

// const renderHTML = (path, res) => {
//         fs.readFile(path, (err, data) => {
//             if(err) {
//                 res.writeHead(404);
//                 res.write('Error: file not found');
        
//             } else {
//                 res.write(data);
//             }
//             res.end();
// });
// };

// http  
//     .createServer((req, res) => {
    
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });

//     const url = req.url;

//     switch(url) {
//         case '/about':
//                 renderHTML('./about.html', res);
//                 break;
        
//         case '/contact':
//                 renderHTML('./contact.html', res);
//                 break;
//         default:
//             renderHTML('./index.html', res);
//                 break;
        
//     }


// })
//     .listen(port, () => {
//         console.log(`Server is listening on port ${port}..`);
// });

