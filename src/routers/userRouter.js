const express = require('express')
const { userLikeRes, getResLike, getUserLike, postRateRes, getResRate, getUserRate, postOrderUser } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/likeRes/:id', userLikeRes)

userRouter.get('/getListLikeByRes', getResLike)

userRouter.get('/getListLikeByUser', getUserLike)

userRouter.post('/rateRes/:id', postRateRes)

userRouter.get('/getListRateByRes', getResRate)

userRouter.get('/getListRateByUser', getUserRate)

userRouter.post('/orderFood', postOrderUser)

module.exports = userRouter