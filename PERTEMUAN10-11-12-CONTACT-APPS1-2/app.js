// Pertemuan 11
const yargs = require('yargs');
const contacts = require('./contacts');
// mengambil argumen dari command line
// console.log(process.argv[2]);

// const command = process.argv[2];
// if(command === 'add') {

//  } else if( command === 'remove') {

//  } else if (command === 'list') {

//  }

// console.log(yargs.argv);

// yargs.command(
//     'add',
//     'menambahkan contact baru', 
//     () => {},
//     (argv) => {
//         console.log(argv.nama);
//     }
// );

// yargs.parse();

yargs.command({
    command:'add',
    describe: 'menambahkan contact baru', 
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        },
    },
        handler(argv){
            contacts.simpanContact(argv.nama, argv.email, argv.noHP);
            // const contact = {
            //     nama: argv.nama,
            //     email: argv.email,
            //     noHP: argv.noHP,
        },
        // console.log(contact);
    

}).demandCommand();


// Menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP contact', 
    handler() {
        contacts.listContact();
    },
});



// Menampilkan detail sebuah contact 
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact Berdasarkan nama ', 
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// Menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact Berdasarkan nama ', 
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});


yargs.parse();














// const contacts = require('./contacts');

// Pertemuan 10

// const main = async () => {

//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda :');
//     const noHP = await contacts.tulisPertanyaan('Masukkan no HP anda :');

//     contacts.simpanContact(nama, email, noHP);

// };



// main();




