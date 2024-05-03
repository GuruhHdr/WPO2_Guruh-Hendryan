// Core module
// File System

const fs = require('node:fs');


// Menuliskan string ke file (synchronus)
// try {
// fs.writeFileSync('data/test.txt', 'Hello World secara synchronus!');
// } catch(e) {
//     console.log(e);
// }

// Menuliskan string ke file (Asynchronus)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronus!', (e) => {
//     console.log(e);    
// });

// Membaca isi file (synchronus)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// challenge = // const data = fs.readFileSync('data/contacts.json', 'utf-8');
// console.log(data);

// Membaca isi ke file (Asynchronus)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);    
// });

const readline = require('readline');
const { json } = require('stream/consumers');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda: ', (nama) => {
    rl.question('Masukkan Nomor HP anda : ', (noHP) => {
    console.log(`Terimakasih ${nama}, sudah menginputkan ${noHP}`);
        const contact = {nama, noHP};
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);
        console.log(contacts);

        contacts.push(contact);

        console.log(contact);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log('Terimakasih sudah mamsukkan data. ');


    rl.close();
    });
});


