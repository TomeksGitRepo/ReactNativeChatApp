const mongoose =  require('mongoose');
const databaseAddress = 'mongodb://127.0.0.1:27017/xxxx';
module.exports =  databaseAddress;

mongoose.connect(databaseAddress, {useNewUrlParser: true, useFindAndModify: false });