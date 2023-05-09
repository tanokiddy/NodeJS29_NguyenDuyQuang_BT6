const { successCode, notFoundCode, failCode } = require("../config/response")
const { likeResAction, getListLikeByRes, getListLikeByUser, rateRes, getListRateByRes, getListRateByUser, postOrder } = require("../services/userService")


const userLikeRes = async (req, res) => { 
    const {id} = req.params
    const data = req.body    
    try {
        const userLiked = await likeResAction(data, id)
        userLiked ? successCode(res) : res.status(200).json({
            statusCode: 200,
            message: "You've disliked this restaurant"
        })
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const getResLike = async (req, res) => { 
    try {
        const ListLike = await getListLikeByRes()
        ListLike ? successCode(res,ListLike) : notFoundCode(res)
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const getUserLike = async (req, res) => { 
    try {
        const ListLike = await getListLikeByUser()
        ListLike ? successCode(res, ListLike) : notFoundCode(res)
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const postRateRes = async (req, res) => { 
    const {id} = req.params   
    const data = req.body
    try {
        const rated = await rateRes(data,id)
        rated ? successCode(res, rated) : notFoundCode(res)
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const getResRate = async (req, res) => { 
    try {
        const ListRate = await getListRateByRes()
        ListRate ? successCode(res,ListRate) : notFoundCode(res)
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const getUserRate = async (req, res) => { 
    try {
        const ListRate = await getListRateByUser()
        ListRate ? successCode(res, ListRate) : notFoundCode(res)
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

const postOrderUser = async (req, res) => { 
    const data = req.body    
    try {
        const order = await postOrder(data)
        order ? successCode(res) : res.status(400).json({
            statusCode: 400,
            message: "You ordered this food"
        })
    } catch(err){
        failCode(res)
        console.log(err)
    }
}

module.exports = {
    userLikeRes,
    getResLike,
    getUserLike,
    postRateRes,
    getResRate,
    getUserRate,
    postOrderUser
}