const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const Product = require('../models/product.model');
const User = require('../models/user.model')

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [{
        item: {type: Schema.Types.ObjectId, ref: 'Product'},
        qty: { type: Number },
        price: { type: Number }
    }],
    totalPrice: {
        type: Number,
        auto: 0
    },
    createdAt: {
        type: Date,
        required: true
    },
    status: {
        type: Number, 
        required: true, 
        default: 0
    },
});

orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model('Order', orderSchema);
module.exports  = {
    async loadPerPage(options) {
        return await Order.paginate(options)
    },  

    async getSaleAmount() {
        return await Order.count({status: 2})
    },
    
    async getIncome() {
        return await Order.aggregate( [
            { $group: { _id: null, sumPrice: { $sum: "$totalPrice" } } }
         ] )
    },

    async getTopSaleProductAllTime() {
        return await Order.aggregate([
            {$unwind:"$products"},
            {
                $group: {
                  "_id": "$products.type",
                  "count":{$sum: "$products.qty"} 
                }
            }
        ]).sort({_id: -1}).limit(10)
    },

    async getTopSaleProductByYear(input) {
        return await Order.aggregate([
            {$unwind:"$products"},
            {
                $addFields: {
                    yearFromDate: {$year: '$createAt'}
                },
            },
            {$match: {yearFromDate: input}}, 
            {
                $group: {
                  "_id": "$products.type",
                  "count":{$sum: "$products.qty"} ,
                }
            },
        ]).sort({_id: -1}).limit(10)
    },

    async getTopSaleProductByMonth(input) {
        return await Order.aggregate([
            {$unwind:"$products"},
            {
                $addFields: {
                    monthFromDate: {$month: '$createAt'}
                },
            },
            {$match: {monthFromDate: input}}, 
            {
                $group: {
                  "_id": "$products.type",
                  "count":{$sum: "$products.qty"} ,
                }
            },
        ]).sort({_id: -1}).limit(10)
    },

    async getTopSaleProductByWeek(input) {
        return await Order.aggregate([
            {$unwind:"$products"},
            {
                $addFields: {
                    weekFromDate: {$week: '$createAt'}
                },
            },
            {$match: {weekFromDate: input}}, 
            {
                $group: {
                  "_id": "$products.type",
                  "count":{$sum: "$products.qty"} ,
                }
            },
        ]).sort({_id: -1}).limit(10)
    },

    async getTopSaleProductByDay(day, month) {
        return await Order.aggregate([
            {$unwind:"$products"},
            {
                $addFields: {
                    dayFromDate: {$dayOfMonth : '$createAt'},
                    monthFromDate: {$month: '$createAt'}
                },
            },
            {$match: {$and: [{dayFromDate: day}, {monthFromDate: month}]}}, 

            {
                $group: {
                  "_id": "$products.type",
                  "count":{$sum: "$products.qty"} ,
                }
            },
        ]).sort({_id: -1}).limit(10)
    },

    async loadPerPage(filter, options) {
        return await Order.paginate(filter, options)
    },

    async updateOrderById(id, update) {
        return await Order.findOneAndUpdate(id, update, {
            new: true
        });
    },

    async getMostRecentOrderOfUser(userId) {
        return await Order.find(userId).sort({createAt: -1}).limit(5).populate('products.item')
    }

}