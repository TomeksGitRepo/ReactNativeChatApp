const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./routes/databaseRoutes/UserDbInteractions').router
const ChatRouter = require('./routes/databaseRoutes/createChat').router
const messageRouter = require('./routes/databaseRoutes/createMessage').router
const userNotificationToken = require('./routes/databaseRoutes/manageUserNotificationTokenUpdates').router

const fs = require('fs');
const multer = require('multer');

const app = express()
const port = 3000

let upload = multer({dest: 'uploads/'});

app.use(cors())
app.use(bodyParser.json())
app.use(userRouter)
app.use(ChatRouter)
app.use(messageRouter)
app.use(userNotificationToken)

app.get('/', (req, res) => res.send('Hello World!!!'))
app.get('/uploadForm', function(req, res) {
    res.sendFile(__dirname + '/uploads/index.html')
})

app.post('/upload', upload.single('avatar'), function(req, res) {
    newFileName =__dirname + '/uploads/' + 'publicationsPasswords.json';
    console.log('req.file.originalname: ', req.file.originalname)

    
    console.log("newFileName after all modifications: ", newFileName);

    fs.rename(req.file.path, newFileName, (err) => {
        if (err) {
           res.send(err)
           console.log(err)
        }
        res.send('Success saving file')
    });
})

app.get('/json/getAllPasswords', function(req, res) {
    fs.readFile('./src/uploads/publicationsPasswords.json', (err, result) => {
        if (err) {
            res.send(err)
        }
        console.log('result in readFile:', result)
        let parsedJSON = JSON.parse(result)
        console.log('parsedJSON:', parsedJSON)
        res.send(parsedJSON)
    })
    

    
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))