const express =  require('express');
const { saveMessageToDB } = require('../../databaseScripts/mongooseSchemas');

const router = express.Router();

router.post(
    '/api/database/createMessage',
    (req , res) => {
        let {chatId, messageText, authorId} = req.body
        //need to parse request first
        saveMessageToDB(chatId, messageText, authorId).then((result) => {
            //console.log('data saved, message saving result:', result);
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

module.exports.router = router;