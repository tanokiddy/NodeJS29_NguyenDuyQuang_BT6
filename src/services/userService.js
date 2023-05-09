const initModels = require('../models/init-models')
const sequelize = require('../models')
const model = initModels(sequelize)

const likeResAction = async (data, resId) => { 
    const checkRes = await model.like_res.findOne({
        where: {
            res_id: resId,
            user_id: data.user_id //will get from accesstoken in headers
        }
    })
    if(checkRes) {
        await model.like_res.destroy({
            where:{
                res_id: resId,
                user_id: data.user_id //will get from accesstoken in headers
            }
        })
        return false
    } else {
        const dateNow = new Date().toISOString().slice(0,19).replace("T"," ")
        const newData = {
            ...data,
            res_id: Number(resId), 
            date_like: dateNow
        }
        const liked = await model.like_res.create(newData)
        return liked
    }
}

const getListLikeByRes = async () => { 
    const likeResList = await model.restaurant.findAll({
        include: {
            model: model.like_res,
            as: "like_res",
            include: {
                model: model.user,
                as: "user"
            }
        }
    })    
    return likeResList
}

const getListLikeByUser = async () => { 
    const likeUserList = await model.user.findAll({
        include: {
            model: model.like_res,
            as: "like_res",
            include: {
                model: model.restaurant,
                as: "re"
            }
        }
    })    
    return likeUserList
}

const rateRes = async (data, resId) => { 
    const checkRes = await model.rate_res.findOne({
        where: {
            res_id: resId,
            user_id: data.user_id //will get from accesstoken in headers
        }
    })
    const dateNow = new Date().toISOString().slice(0,19).replace("T"," ")
    const newData = {
        ...data,
        res_id: resId,
        date_rate: dateNow
    }
    if(checkRes) {
        await model.rate_res.update(
            newData,
            {
                where: {
                    res_id: resId,
                    user_id: data.user_id //will get from accesstoken in headers
                }
            }
        )
        return newData
    } else {
        await model.rate_res.create(newData)
        return newData

    }
}

const getListRateByRes = async () => { 
    const rateResList = await model.restaurant.findAll({
        include: {
            model: model.rate_res,
            as: "rate_res",
            include: {
                model: model.user,
                as: "user"
            }
        }
    })    
    return rateResList
}

const getListRateByUser = async () => { 
    const rateUserList = await model.user.findAll({
        include: {
            model: model.rate_res,
            as: "rate_res",
            include: {
                model: model.restaurant,
                as: "re"
            }
        }
    })    
    return rateUserList
}

const postOrder = async (data) => { 
    checkFood = await model.order.findOne({
        where: {
            food_id: data.food_id,
            user_id: data.user_id //will get from accesstoken in headers
        }
    })
    if(checkFood) {
        return false
    } else {
        const order = await model.order.create(data)
        return order
    }
}

module.exports = {
    likeResAction,
    getListLikeByRes,
    getListLikeByUser,
    rateRes,
    getListRateByRes,
    getListRateByUser,
    postOrder

}