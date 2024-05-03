// const nama = 'Guruh';
// const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama(nama));
// console.log(window);

// const fs = require('fs'); //core module
// const cetakNama = require('./coba'); //Local module
// const moment = require('moment'); //third party module / npm module / npm_modules

// console.log('Hello STT!');

// const cetakNama = require('./coba');

const coba = require(`./coba`);

console.log (
    coba.cetakNama('Guruh'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(),
    new coba.Orang()
);


