const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const UserModel = require('./models/User')
const PlayListModel = require('./models/playList')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sachin:sachin@cluster0.fthiy8s.mongodb.net/moview?retryWrites=true&w=majority&appName=Cluster0")

app.get('/',(req,res) => {
    res.json("hello");
}



app.post('/signup', (req, res) => {

    const { name, email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("User already there");
            } else {
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        res.json(err);
                    } else {
                        const newUser = new UserModel({
                            name,
                            email,
                            password: hashedPassword
                        });

                        newUser.save()
                            .then(() => res.json("Success"))
                            .catch(err => res.json(err));
                    }
                });
            }
        })
        .catch(err => res.json(err));
});



app.post('/signin', (req, res) => {

    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        res.json(err);
                    } else if (isMatch) {
                        res.json("Success");
                    } else {
                        res.json("The password is incorrect");
                    }
                });
            } else {
                res.json("User doesn't exist");
            }
        })
        .catch(err => res.json(err));
});



app.post('/playlist', (req,res) => {

    const {id,email} = req.body;
   
    PlayListModel.findOneAndUpdate(
        { email: email },
        { $push: { movies: id } },  
        { new: true, upsert: true, useFindAndModify: false }
    ).then(item => res.json(item))
    .catch(err => res.json(err))
})



app.get("/movies/:email", (req,res) => {

    const email = req.params.email;

    PlayListModel.findOne({email:email})
    .then(movies => res.json(movies))
    .catch(err => console.log(err))
})



app.post('/check',(req,res) => {

    const ids = req.body.ids;
    const email = req.body.email;
    
    PlayListModel.findOne({ email: email, movies: ids })
    .then(movie => {
        if(movie) {
            res.json("available")
        } else {
            res.json("not available")
        }
    })
})



app.post('/remove', (req,res) => {

    const {id,email} = req.body;

    PlayListModel.findOneAndUpdate(
        { email: email },
        { $pull: { movies: id } },
        { new: true, useFindAndModify: false }
    ).then(item => res.json(item))
    .catch(err => res.json(err));
})



app.listen(3001, () => {
    console.log("Server is running");
})
