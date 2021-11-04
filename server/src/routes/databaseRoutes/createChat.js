const express =  require('express');
const { saveChatToDB } = require('../../databaseScripts/mongooseSchemas');
const saveUserToDB = require('../../databaseScripts/mongooseSchemas').saveChatToDB

const router = express.Router();

router.post(
    '/api/database/createChat',
    (req , res) => {
        let {chatName, adminID, isSingleChat, otherAdmins} = req.body
        //need to parse request first
        //console.log("isSingleChat in /api/database/createChat: ", isSingleChat);
        saveChatToDB(chatName, adminID, isSingleChat, otherAdmins).then((result) => {
            //console.log('data saved, chat saving result:', result);
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

module.exports.router = router;