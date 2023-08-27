const mongoose = require('mongoose');
const Item = require("./Database/Schemas/Item");

const items = [
    { name: 'Njega lica', price: 27, originalPrice: 27 },
        { name: 'Anti-age njega lica', price: 34, originalPrice:34},
        { name: 'Dubinsko čišćenje lica', price: 34, originalPrice:34},
        { name: 'Anti-age dubinsko čišćenje lica', price: 47,originalPrice:47},
        { name: 'Brow lift', price: 30, originalPrice:30 },
        { name: 'Šminkanje', price: 27 , originalPrice:27},
        { name: 'Šminkanje + trepavice', price: 34 , originalPrice:34}, ];

const items2 = [
    { name: 'Manikura', price: 11, originalPrice:11},
    { name: 'Lakiranje', price: 4, originalPrice:4 },
    { name: 'Dipping na prirodne nokte', price: 20, originalPrice:20 },
    { name: 'Dipping na produžene nokte', price: 27, originalPrice:27 },
    { name: 'Skidanje gela / akrila / trajnog laka', price: 7, originalPrice:7 },
    { name: 'Popravak jednog nokta', price: 4, originalPrice:4 }, ];

 const items3 = [
    { name: 'Estetska pedikura', price: 16, originalPrice:16 },
        { name: 'Trajni lak', price: 16 , originalPrice:16},
        { name: 'Pedikura + trajni lak', price: 27, originalPrice:27 },
        { name: 'Lakiranje', price: 6, originalPrice:6 },
        { name: 'Rekonstrukcija nokta', price: 7, originalPrice:7 }, ];

const items4 = [
    { name: 'Depilacija naušnica', price: 4, originalPrice:4 },
    { name: 'Depilacija brade', price: 4, originalPrice:4 },
    { name: 'Korekcija obrva', price: 5, originalPrice:5 },
    { name: 'Korekcija + bojanje obrva', price: 10, originalPrice:10 },
    { name: 'Depilacija cijelih nogu', price: 15, originalPrice:15 },
    { name: 'Parcijalna depilacija', price: 9, originalPrice:9 },
    { name: 'Bikini', price: 6, originalPrice:6 },
    { name: 'Brazilka', price: 8, originalPrice:8 },
    { name: 'Brazilka šećernom pastom', price: 14, originalPrice:14 },
    { name: 'Depilacija ruku', price: 8, originalPrice:8 },
    { name: 'Depilacija pazuha', price: 5, originalPrice:5 },
    { name: 'Depilacija leđa', price: 10, originalPrice:10 },   
];

const items5 = [
    { name: 'Masaža lica', price: 11, originalPrice:11 },
    { name: 'Masaža lica i glave', price: 14, originalPrice:14 },
    { name: 'Parcijalna masaža', price: 14 , originalPrice:14},
    { name: 'Aroma masaža cijelog tijela', price: 26, originalPrice:26 },
    { name: 'Anticelulitna parcijalna masaža', price: 20 , originalPrice:20},
    { name: 'Aparativna limfna drenaža', price: 11, originalPrice:11 },
    { name: 'Total relax', price: 34, originalPrice:34 },  
];

const items6 = [
    { name: 'Delux shape noge', price: 34, originalPrice:34 },
        { name: 'Delux shape trbuh', price: 20, originalPrice:20 },
        { name: 'Delux shape paket 10 tretmana noge', price: 279, originalPrice:279 },
        { name: 'Delux shape paket 10 tretmana trbuh', price: 146, originalPrice:146 },
        { name: 'Delux shape full body 10 tretmana', price: 340, originalPrice:340 }, 
];

const allItems = [
    ...items,
    ...items2,
    ...items3,
    ...items4,
    ...items5,
    ...items6
];

mongoose.connect('mongodb+srv://anamanev:admin123@cluster0.mcjyxx5.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    dbName: 'BeautyByAna'
}).then(() => {
    return Item.insertMany(allItems);
}).then((docs) => {
    console.log('Items inserted:', docs);
    mongoose.connection.close();
}).catch((error) => {
    console.error('Error:', error);
    mongoose.connection.close();
});
