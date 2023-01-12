const mongoose = require('mongoose')

const URL = 'mongodb+srv://abd:abd@cluster0.l4lnvmf.mongodb.net/abdpos';

mongoose.connect(URL)

let connectionObj = mongoose.connection;

connectionObj.on('connected', () => {
    console.log('Mongo DB Connection Successfull');
})

connectionObj.on('error', () => {
    console.log('Mongo DB Connection Failed')
})
