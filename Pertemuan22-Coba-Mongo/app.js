const { error } = require('console');
const { MongoClient, ObjectID } = require('mongodb');
const { resourceUsage } = require('process');
const { getSystemErrorMap } = require('util');
const { resourceLimits } = require('worker_threads');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if(error) {
        return console.log('Koneksi Gagal!');
    }
    // Pilih Database
    const db = client.db(dbName);
    
    // Menambahkan 1 Data ke Collection mahasiswa

//     db.collection('mahasiswa').insertOne(
//     {
//         nama: 'Erik',
//         email: 'Erik@gmail.com',
//     },
//     (error, result) => {
//         if(error) {
//             return console.log('gagal menambahkan data!');
//         }
//         console.log(result);
//     }

// );

    // Menambahkan lebih dari 1 Data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Erik',
    //             email: 'Erik@yahoo.com'    
    //         },
    //         {
    //             nama: 'Joko',
    //             email: 'joko@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if(error){
    //             return console.log('data gagal ditambahkan!');
    //         }
    //         console.log(result);
    //     }
    // );

    // Menampilkan semua data yang ada di collection 'mahasiswa'
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find()
    //     .toArray((error, result) => {
    //         console.log(result);
    //     })
    // );

    // Menampilkan data berdasarkan kriteria yang ada di collection 'mahasiswa'
    // console.log(
    //     db
    //     .collection('mahasiswa')
    //     .find({ _id: ObjectID('6659d014a55bc548c0185cb0') }).toArray((error, result) => {
    //         console.log(result);
    //     })
    // );
    
    // Mengubah data berdasarkan ID
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectID('6659d014a55bc548c0185cb0'),
    //     },
    //     {
    //         $set: {
    //             email : 'JokoMahmudin@yahoo.com',
    //         },
    //     }
    // );

    // updatePromise.then((result) => { 
    //     console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

    // Mengubah data lebih dari 1, berdasarakan kriteria
    // db.collection('mahasiswa').updateMany({
    //     nama : 'Erik',
    // },
    // {
    //     $set: {
    //         nama : 'Erik Doank',
    //     },
    // }
    // );

    // Menghapus 1 Data 
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectID('6659d014a55bc548c0185cb0'),
    //     }
    // ).then((result) => {
    //     console.log(result);

    // })
    // .catch((error) =>{
    //     console.log(error);
    // })

    
    // Menghapus lebih dari 1 Data 
    db.collection('mahasiswa').deleteMany(
        {
            nama: 'Erik Doank',
        }
    ).then((result) => {
        console.log(result);

    })
    .catch((error) =>{
        console.log(error);
    })

});