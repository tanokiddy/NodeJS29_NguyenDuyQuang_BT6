const express = require('express')
const userRouter = require('./userRouter')
const rootRouter = express.Router()

// const foodRouter = require('./foodRouter')

// rootRouter.use("/food", foodRouter)
rootRouter.use("/user", userRouter)

module.exports = rootRouter