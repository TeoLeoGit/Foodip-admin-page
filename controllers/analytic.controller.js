const Order = require('../models/order.model');
const Product = require('../models/product.model');
const mongoose = require('mongoose');
const { multipleMongooseToObject, mongooseToObject} = require('../utils/mongooseUtil');

class AnalyticController {
    async getAnalytics(req, res, next) {
        if(req.isAuthenticated()) { 
            console.log(req.query)

            //assign values
            let saleAmount = 0
            let numberOfProduct = 0
            let income = 0
            
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let quarter = Math.floor(date_ob.getMonth() / 3) + 2
            quarter > 4? quarter - 4 : quarter;
            let year = date_ob.getFullYear();

            await Order.getSaleAmount()
                .then(result => {
                    saleAmount = result
                })
                .catch(next);  
                
            await Product.getNumberOfProduct()
                .then(result => {
                    numberOfProduct = result
                })
                .catch(next);
            
            await Order.getIncome()
                .then(result => {
                    income = result[0].sumPrice
                })
                .catch(next);
            
            //render char
            
            await Order.getTopSaleProductByMonth(12)
                .then(result => {
                    console.log(result)
                })
                .catch(next);

            res.render('analytics/analytics', {
                saleAmount: saleAmount,
                numberOfProduct: numberOfProduct,
                income: (Math.round(income * 100) / 100).toFixed(2)
            })
        }
        else   
            res.redirect('/login')
    }
}

module.exports = new AnalyticController();