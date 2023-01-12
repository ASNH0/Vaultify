const mongoose = require('mongoose')

const URL = 'mongodb+srv://dodo:gaga@cluster0.ndsb8s2.mongodb.net/vaultify';

mongoose.connect(URL)

let connectionObj = mongoose.connection;

connectionObj.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
})

connectionObj.on('error', () => {
    console.log('Mongo DB Connection Failed')
})
