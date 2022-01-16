const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
require('dotenv').config();
//cors används så att min front och back end får en anslutning.
app.use(cors());
app.use(express.json());

// database connection
mongoose.connect("mongodb+srv://hosein:sultan.1@mern.dplbs.mongodb.net/myFirstDatabase?////retryWrites=true&w=majority", {useNewUrlParser: true,
useUnifiedTopology: true});



//lägga till en ny vän med namn och ålder
app.post("/addfriend", async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

const friend = new FriendModel({name: name, age: age});
await friend.save();
res.send(friend);
});

//Hämtar min data, och finns det något fel så visas den mha min error annarsn visas resultatet,
app.get("/read", async (req, res) => {
   FriendModel.find({}, (err, result) => {
    if (err) {
        res.send(err)
    } else {res.send(result);
    }


   });
   
    });

//uppdaterar åldern från listan 
app.put('/update', async(req, res, next) => {
const newAge = req.body.newAge;
const id = req.body.id;

try {
await FriendModel.findById(id, (err, friendToUpdate) => {
friendToUpdate.age = Number(newAge);
friendToUpdate.save();
});
} catch (err) {
    console.log(err);
}
res.send("updated data successfully");
})
//Tar bort vänner från min lista och databas
app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()
    res.send("raderad");
})
//lyssnar på port 3001 men kan även använda den live via process.env.Port med mitt projekt.
app.listen(process.env.PORT || 3001,() => {console.log('du är ansluten'); 
});