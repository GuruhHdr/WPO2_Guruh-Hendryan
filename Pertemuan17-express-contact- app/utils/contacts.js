const fs = require('fs');

//Membuat folder Data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambil semua data contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
};

// Cari contact berdasarkan nama
const findContact = (nama) => {
const contacts = loadContact();
const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
return contact;
};

module.exports = { loadContact, findContact};