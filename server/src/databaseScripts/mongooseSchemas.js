const mongoose =  require('mongoose')

const Document = require('mongoose').Document

const databaseAddress =  require('./databaseAddress');

const axios = require('axios')

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    //console.log('Connection to ' + databaseAddress + ' established')
})

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true },
    avatarImageURL: String
})

const User = mongoose.model('User', userSchema)

async function saveUserToDB(userName, password, avatarImageURL = "") {
    let UserModel = new User({
        userName,
        password,
        avatarImageURL
    })

    let result = await UserModel.save();

    return result
}

async function getAllUsers() {
    let result = await User.find().exec();

    console.log('result user found in getAllUsers:', result )
    return result
}

async function getAllChatsByUserId(userId) {
    let userObject = await User.findById(userId).exec()
    let usersChats = await chatModel.find({usersInvolved: userObject}).populate('usersInvolved messages').exec()

    return usersChats

}

async function getUserId(userName, password) {
    let userObject = await User.findOne({userName, password}).exec()
    let id  = userObject ? userObject._id : null

    return id
}

const chatSchema = new mongoose.Schema({
    chatName: {type: String, required: true, unique: true},
    admins: {
        type: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ], 
        validate: v => v.length > 0
},
    usersInvolved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    isSingleChat: {
        type: Boolean,
        default: true
    }
})

const chatModel = mongoose.model('Chat', chatSchema);

async function saveChatToDB(chatName, adminID, isSingleChat, otherAdmins = [] ) {
    let admin = await User.findById(adminID).exec()
    console.log('otherAdmins in saveChatToDB:', otherAdmins)
    let otherAdminsObjects = await Promise.all(otherAdmins.map(async (item) => await User.findById(item).exec()))

    let ChatObject = new chatModel({
        chatName,
        admins: [...otherAdminsObjects, admin],
        usersInvolved: [admin],
        isSingleChat
    })
    if(otherAdmins.length > 0) { //only deconstruct when otherAdmins is not empty
       ChatObject = new chatModel({
            chatName,
            admins: [...otherAdminsObjects, admin],
            usersInvolved: [...otherAdminsObjects, admin],
            isSingleChat
        })
    }
    

    let result = await ChatObject.save();

    return result
}

const messageSchema = new mongoose.Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sendTime: {type: Date, default: Date.now},
    messageText: String,
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ]
})

const messageModel = mongoose.model('Message', messageSchema)

async function saveMessageToDB(chatId, messageText, authorId ) {
    let chatID = await chatModel.findById(chatId).exec()
    let authorID = await User.findById(authorId).exec()
    
    let MessageObject = new messageModel({
        chatID,
        messageText,
        authorID,
        readBy: [
            authorID
        ]
    })

    

    let result = await MessageObject.save();
    chatID.messages.push(result)
    chatID.save()


    let getUsersIdToNotify = await getUsersToSendNotification(chatId, authorId)
    let usersTokensToNotify = await translateFromUserIdToUserToken(getUsersIdToNotify)
    console.log('usersTokensToNotify in saveMessageToDB ', usersTokensToNotify)
    let resultPostServerNotification = axios.post('http://localhost:3001/users/sendNotifications', {"usersToNotify": usersTokensToNotify, "messageText": messageText}, (result) => console.log('result in axios.post(http://localhost:3001/users/sendNotifications)', result),(error) => console.log('error in axios.post(http://localhost:3001/users/sendNotifications)', error ))
    console.log('resultPostServerNotification in saveMessageToDB:', resultPostServerNotification)
    return result
}

async function getUsersToSendNotification(chatId, authorId) {
    let chatID = await chatModel.findById(chatId).exec()
    let usersInvolved = chatID.usersInvolved;
    let usersToSendNotifications = usersInvolved.filter((item) => item != authorId)

    //console.log('chatID in getUsersToSendNotification', chatID)
    console.log('usersInvolved in getUsersToSendNotification', usersInvolved)
    console.log('usersToSendNotifications in getUsersToSendNotification', usersToSendNotifications)
    return usersToSendNotifications
}

async function translateFromUserIdToUserToken(usersIds) {
    console.log('usersIds in translateFromUserIdToUserToken:', usersIds)
    //console.log('usersIds.isArray() in translateFromUserIdToUserToken:', usersIds.isArray())
    let usersTokens = await Promise.all(usersIds.map( async (item) => await getUserToken(item)))

    console.log('usersTokens in translateFromUserIdToUserToken:', usersTokens)
    return usersTokens
}




const memberSchema = new mongoose.Schema({
    domains: [String],
    companyName: String
})

const userTokenSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userNotificationToken: {
        type: String,
        required: true
    }
})

const userTokenModel = mongoose.model('UserToken', userTokenSchema)

async function updateUserTokenList(authorId, userNotificationToken) {
    let authorID = await User.findById(authorId).exec()
    console.log('authorID in updateUserTokenList:', authorID)

    let result = await userTokenModel.findOneAndUpdate({"userID" : authorID._id}, {userNotificationToken}, {upsert: true}, function (err) {
        console.log('error updating newUserTokenObject:', err)
    } )

    return result
}

async function getUserToken(authorId) {
    let authorID = await User.findById(authorId).exec()
    console.log('authorID in getUserToken:', authorID)
    let result = await userTokenModel.findOne({ 'userID': authorID._id}, function (err) {
       if (err) {
        console.log('error updating newUserTokenObject:', err)
       }
    })

    console.log('result["userNotificationToken"] in getUserToken:', result['userNotificationToken'])

    return result['userNotificationToken']
}

module.exports = {
    User,
    saveUserToDB,
    saveChatToDB,
    saveMessageToDB,
    getAllChatsByUserId,
    getUserId,
    getAllUsers,
    updateUserTokenList
}