const sendNotificationsToUsers = require('./indexExpoServer').sendNotificationsToUsers

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

app.post('/users/sendNotifications',  function(req, res) {
    let {usersToNotify, messageText} = req.body
    //TODO implement this

    console.log('usersToNotify in /users/sendNotifications:', usersToNotify)
    console.log('usersToNotify in /users/sendNotifications:', messageText)
    sendNotificationsToUsers(usersToNotify, messageText).then(() => console.log('Notifications messages send.'))

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
