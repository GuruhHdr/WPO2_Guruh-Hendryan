// console.log('Hello Word!');
function cetakNama(nama) {
    return `Halo nama saya ${nama};`

}

const PI = 3.14;


const mahasiswa = {

    nama : 'Doddo Ferdinansinaga',
    umuur : 21,
    cetakMhs() {
        return `Halo, nama saya ${this.nama} dan ${this.umur} tahun. `;
    },

};


class Orang {
    constructor() {
        console.log('objek orang telah dibuat!!');
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang,
// }

module.exports = { cetakNama, PI, mahasiswa, Orang};