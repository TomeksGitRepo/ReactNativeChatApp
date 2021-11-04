const express =  require('express')
const saveUserToDB = require('../../databaseScripts/mongooseSchemas').saveUserToDB
const {getAllChatsByUserId, getUserId, getAllUsers }  = require('../../databaseScripts/mongooseSchemas')

const router = express.Router();

router.post(
    '/api/database/createUser',
    (req , res) => {
        let {userName, password, avatarImageURL} = req.body
        //need to parse request first
        saveUserToDB(userName, password, avatarImageURL).then((result) => {
            //console.log('data saved result:', result);
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

router.post(
    '/api/database/user/getAllChats',
    (req , res) => {
        let {userId} = req.body
        //need to parse request first
        getAllChatsByUserId(userId).then((result) => {
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

router.get(
    '/api/database/user/getAllUsers',
    (req , res) => {
        getAllUsers().then((result) => {
            //console.log('result in /api/database/user/getUserId : ', result)
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

router.post(
    '/api/database/user/getUserId',
    (req , res) => {
        let {login, password} = req.body
        //need to parse request first
        getUserId(login, password).then((result) => {
            //console.log('result in /api/database/user/getUserId : ', result)
            res.send(result)
        } ).catch(error => console.log(error))
    }
)

module.exports.router = router;