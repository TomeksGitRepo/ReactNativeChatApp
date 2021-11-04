const express =  require('express');
const { updateUserTokenList } = require('../../databaseScripts/mongooseSchemas');

const router = express.Router();

router.post(
    '/api/database/updateUserNotificationToken',
    (req , res) => {
        let {userId, userNotificationToken} = req.body
        updateUserTokenList(userId, userNotificationToken).then((result) => {
            //console.log('data saved, chat saving result:', result);
            res.send("Token updated on server")
        } ).catch(error => console.log(error))
    }
)

module.exports.router = router;