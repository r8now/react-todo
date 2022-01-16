const mongoose = require( "mongoose");

/*Här sätter jag min information om min databas och vilka värden jag vill spara och representerar min data som ska sparas*/
const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },



});

// Skapar en instans av min tabell databas som heter friends/collections
const FriendModel = mongoose.model('friends', FriendSchema);

//Detta exporteras när jag gör en request till min databas.
module.exports =FriendModel;

