const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('Guruh@bar.com')); 
// console.log(validator.isMobilePhone('0889345678', 'id-ID')); 
// console.log(validator.isNumeric('08a9345678')); 

// console.log(chalk.italic.bgBlue.black('Hello WOrld!'));
const nama = 'Guruh';
const pesan = chalk`Lorem, ipsum {bgBlue.black sit dolor amethyst} amet {bgYellow.italic.black.bold consectur bin} adipcipsil elit. ab, rem. Nama saya : ${nama}.`;
// console.log(chalk.bgRed.black(pesan));
console.log(pesan);
