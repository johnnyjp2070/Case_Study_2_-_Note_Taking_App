const express = require('express')
let mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const todos = require('./notes.model.js')

var db = 'mongodb://localhost:27017/todos' 
mongoose.connect(db)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('index.ejs')
})

app.get('/notes', function(req, res){
    todos.find().exec(function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(data)
        }
    })
})

app.get('/notes/:id', function(req, res){
    todos.findById({_id: req.params.id}).exec(function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(data)
        }
    })
})

app.delete('/notes/:id', function(req, res){
    var msg = {
        message: 'Note Deleted Sucessfully'
    }
    todos.findOneAndRemove({_id: req.params.id}, function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(msg)
        }
    })
})
app.put('/notes/:id', function(req, res){
    var date = new Date()
    todos.findOneAndUpdate({_id: req.params.id},{$set: {"title": req.body.title, "message": req.body.message, "updatedAt": date}},{upsert: true}, function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            todos.findById({_id: req.params.id}).exec(function(err, dat){
                if(err){
                    console.log('There was an error')
                } else {
                    res.json(dat)
                }
            })
        }
    })
    
})

app.post('/notes', function(req, res){
    newTodo = new todos()
    var date = new Date()
    newTodo.title = req.body.title
    newTodo.message = req.body.message
    newTodo.createdAt = date
    newTodo.updatedAt = date
    newTodo.save(function(err, data){
         if(err){
             console.log('There was an error')
             console.log(err)
         } else {
             res.json(data)
         }
     })
})


app.listen(3000)
console.log('Server Listening at port 3000')
