const express = require('express')
const { request } = require('http')
const mongoose = require('mongoose')
var app = express()
var Data = require('./EventSchema')

mongoose.connect("mongodb://127.0.0.1:27017/myDB")

mongoose.connection.once("open", () => {

    console.log("Connection to DB successful!! Xd")

}).on("error", (error) => {

    console.log("Connection to DB failed" + error)

})

//Create an event
//POSTING request
app.post("/create", (request, response) => {

    var event = new Data ({
        note: request.get("note"),
        title: request.get("title"),
        date: request.get("date"),

    })

    event.save().then(() => {
        if (event.isNew == false){
            console.log("Data saved!")
            response.send("Data saved!")
        } else{
            console.log("Data IS NOT saved!")
        }
    })
})


//Delete an event
//Posting request

app.post("/delete", (request, response) =>{
    Data.findOneAndRemove({
        id : request.get("id")
    } , (err) => {
        console.log("Failed" + err)
    }
    )
    res.send("Deleted!")
})

//Update an event
//Posting request
app.post('/update',(req,res) =>{
    Data.findOneAndUpdate({
        _id : req.get("id")
    },{
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date"),
        
    }, (err) => {
        console.log("Failed to update" + err)
    })

    res.send("Updated!")
} )


//Fetch all events
//Get request
app.get('/fetch' , (request, response) => {
    //Find everything in database
    Data.find({}).then( (DBitems) =>{
        response.send(DBitems)
        console.log("all data are fecthed from DB!")
    })
})

//TESTING
app.get('/', (req, res) => res.send('Hello World!'));

app.post("/fetch", (request, response) =>{
    Data.findOneAndRemove({
        id : request.get("id")
    } , (err) => {
        console.log("Failed" + err)
    }
    )
    res.send("Deleted!")
})


//TO START MONGODB
//brew services start mongodb-community@4.2

// http://10.0.0.203:8081/create
var server = app.listen(8081, "10.0.0.203" , () => {
    console.log("Server is running!")
})